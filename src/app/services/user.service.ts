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
    const { error } = await this.supabase.from('utenti').insert([
      {
        id: codDip,
        nome: name,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }
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
}
