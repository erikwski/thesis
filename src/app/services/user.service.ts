import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected supabase = inject(SupabaseService).supabase;

  /** Controlla se esiste già un utente */
  async esisteUtente(codDip: number): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('utenti')
      .select('id')
      .eq('id', codDip);

    if (error) {
      throw new Error(error.message);
    }

    return data?.length ? true : false;
  }

  /** Inizializza un nuovo utente */
  async creaUtente(codDip: number, name: string): Promise<void> {
    let { error } = await this.supabase.from('utenti').insert([
      {
        id: codDip,
        nome: name,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }
    
    await this.inserisciMockData(codDip);
  }

  /** Ottieni i dati dell'utente loggato */
  async datiUtente(codDip: number): Promise<any> {
    const { data, error } = await this.supabase
      .from('utenti')
      .select('*')
      .eq('id', codDip)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // crea dati fake al login di un nuovo utente
  async inserisciMockData(utente: number): Promise<void> {
    const products = [];
    const storicoData = [];

    for (let i = 99; i >= 0; i--) {
      const name = `Prodotto ${i + 1}`;
      const description = `Descrizione prodotto ${i + 1}`;
      const annual_demand = this.getRandomInt(500, 5000);
      const setup_cost = this.getRandomFloat(100, 1000);
      const holding_cost_per_unit = this.getRandomFloat(10, 50);
      const unit_cost = this.getRandomFloat(20, 200);
      const lead_time = this.getRandomInt(1, 10);

      products.push({
        name,
        description,
        annual_demand,
        setup_cost,
        holding_cost_per_unit,
        unit_cost,
        lead_time,
        utente,
      });
    }

    const { data: insertedProducts, error: productError } =
      await this.supabase.from('prodotti').insert(products).select('id');

    if (productError) {
      throw new Error(
        `Error inserimento dei prodotti: ${productError.message}`
      );
    }

    //Creo storico per 2024, 2023 e 2022
    for (const product of insertedProducts) {
      for (const year of [2024, 2023, 2022]) {
        const eoq = this.getRandomFloat(50, 500);
        const reorderPoint = this.getRandomFloat(20, 200);
        const totalCost = this.getRandomFloat(1000, 50000);

        storicoData.push({
          prodotto: product.id,
          year,
          eoq,
          reorderPoint,
          totalCost,
        });
      }
    }

    // Insert storico data into the database
    const { error: storicoError } = await this.supabase
      .from('storico')
      .insert(storicoData);

    if (storicoError) {
      throw new Error(
        `Errore nell'inserimento dello storico: ${storicoError.message}`
      );
    }
  }

  protected getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  protected getRandomFloat(min: number, max: number): number {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  }
}
