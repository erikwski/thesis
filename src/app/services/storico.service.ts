import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Storico } from '../models/storico';

@Injectable({
  providedIn: 'root',
})
export class StoricoService {
  protected supabase = inject(SupabaseService).supabase;

  async ottieniStorico(prodottoId: string): Promise<{ data: Storico[] }> {
    let query = this.supabase
      .from('storico')
      .select('*')
      .eq('prodotto', prodottoId)
      .order('year',{ ascending: false});

    const { data, error } = await query;

    if (error) {
      console.error('Errore ottenendo lo storico:', error.message);
      throw error;
    }

    return { data: data || [] };
  }

  async salvaStoricoCalcolato(anno: number, storico: Storico[]): Promise<boolean> {
    return true;
  }
}
