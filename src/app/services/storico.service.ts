import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Storico } from '../models/storico';
import { WasmLoaderService } from './webAssembly.service';
import { EoqService } from './eoq.service';

@Injectable({
  providedIn: 'root',
})
export class StoricoService {
  protected supabase = inject(SupabaseService).supabase;
  protected wasmService = inject(EoqService);

  async anniConStoricoCalcolato(utente: number) {
    try {
      const { data: prodotti, error: erroreProdotto } = await this.supabase
        .from('prodotti')
        .select('*')
        .eq('utente', utente);

      if (erroreProdotto) {
        throw new Error(
          `Errore ottenendo i prodotti: ${erroreProdotto.message}`
        );
      }

      if (!prodotti || prodotti.length === 0) {
        throw new Error('Non sono stati trovati prodotti');
      }

      const productIds = prodotti.map((product) => product.id);
      
      const { data, error } = await this.supabase
        .from('storico')
        .select('year', { count: 'exact' })
        .in('prodotto', productIds);;

      if (error) {
        throw new Error(
          `Errore ottenendo i dati degli ultimi anni: ${error.message}`
        );
      }

      if (!data || data.length === 0) {
        return [];
      }

      const years = Array.from(new Set(data.map((entry) => entry.year))).sort(
        (a, b) => b - a
      );
      return years;
    } catch (error) {
      console.error('Errore ottenendo i dati degli ultimi anni:', error);
      return [];
    }
  }

  async ottieniStoricoProdotto(
    prodottoId: string
  ): Promise<{ data: Storico[] }> {
    let query = this.supabase
      .from('storico')
      .select('*')
      .eq('prodotto', prodottoId)
      .order('year', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('Errore ottenendo lo storico:', error.message);
      throw error;
    }

    return { data: data || [] };
  }

  async calcolaStoricoWasm(
    annoCorrente: number, utente: number
  ): Promise<void> {
    await this.wasmService.loadWasm();

    // Ottengo tutti i prodotti
    const { data: prodotti, error: erroreProdotto } = await this.supabase
      .from('prodotti')
      .select('*')
      .eq('utente', utente);

    if (erroreProdotto) {
      throw new Error(
        `Errore ottenendo i prodotti: ${erroreProdotto.message}`
      );
    }

    if (!prodotti || prodotti.length === 0) {
      throw new Error('Non sono stati trovati prodotti');
    }

    const productIds = prodotti.map((product) => product.id);

    // Elimino lo storico corrente 
    const { error: deleteError } = await this.supabase
      .from('storico')
      .delete()
      .eq('year', annoCorrente)
      .in('prodotto', productIds);

    if (deleteError) {
      throw new Error(
        `Error deleting storico data for current year: ${deleteError.message}`
      );
    }

    // Calcolo storico per ogni prodotto
    const storicoData : Storico[] = prodotti.map((prodotto) => {
      const eoq = this.wasmService.calculateEOQ(
        prodotto.annual_demand,
        prodotto.setup_cost,
        prodotto.holding_cost_per_unit
      );
      const reorderPoint = this.wasmService.calculateReorderPoint(
        prodotto.lead_time,
        prodotto.annual_demand
      );
      const totalCost = this.wasmService.calculateTotalCost(
        prodotto.annual_demand,
        prodotto.setup_cost, 
        prodotto.holding_cost_per_unit, 
        prodotto.unit_cost, 
        eoq
      );

      return {
        prodotto: prodotto.id as number,
        year: annoCorrente,
        eoq,
        reorderPoint,
        totalCost,
      };
    });

    const { error: storicoError } = await this.supabase
      .from('storico')
      .insert(storicoData);

    if (storicoError) {
      throw new Error(
        `Errore inserendo lo storico: ${storicoError.message}`
      );
    }
  }
}
