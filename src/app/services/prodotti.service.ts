import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Prodotto } from '../models/prodotto';
import { environment } from '../../environments/environment';
import { GlobalStore } from '../store/global.store';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ProdottoService {
  protected supabase = inject(SupabaseService).supabase;
  protected store = inject(GlobalStore);

  async getPaginatedProdotti(
    page: number,
    pageSize: number,
    searchTerm?: string
  ): Promise<{ data: Prodotto[]; total: number }> {
    const start = page * pageSize;
    let query = this.supabase
      .from('prodotti')
      .select('*', { count: 'exact' })
      .eq('utente', this.store.codDipendente())
      .order('id', {
        ascending: false,
      })
      .range(start, start + pageSize);

    // filtrando case insensitive
    if (searchTerm) {
      query = query.or(
        `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
      );
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Errore durante ottenimento dei prodotti:', error.message);
      throw error;
    }

    return { data: data || [], total: count || 0 };
  }

  async addProdotto(prodotto: Partial<Prodotto>): Promise<Prodotto> {
    const { data, error } = await this.supabase
      .from('prodotti')
      .insert([prodotto])
      .select()
      .single();
    if (error) {
      console.error('Errore aggiungendo prodotto:', error.message);
      throw error;
    }
    return data;
  }

  async updateProdotto(
    id: string,
    updates: Partial<Prodotto>
  ): Promise<Prodotto> {
    const { data, error } = await this.supabase
      .from('prodotti')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Errore aggiornando prodotto:', error.message);
      throw error;
    }
    return data;
  }

  async deleteProdotto(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('prodotti')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Errore eliminando prodotto:', error.message);
      throw error;
    }
  }
}
