import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  protected _supabase: SupabaseClient;

  constructor() {
    this._supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get supabase(){
    return this._supabase;
  }
}
