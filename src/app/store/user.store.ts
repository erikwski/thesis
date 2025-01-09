import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { UserData } from '../models/userData';
import { Prodotto } from '../models/prodotto';
import { computed, inject } from '@angular/core';
import { SupabaseService } from '../services/database.service';

const initialState: UserData = {
  nome: '',
  codDipendente: '',
  prodotti: [],
};

export const UserStore = signalStore(
  withState(initialState),
  withMethods((store, service = inject(SupabaseService)) => ({
    async login(codDip: string): Promise<void> {
      const exist = await service.esisteUtente(codDip);
      patchState(store, (state) => ({ ...state, codDipendente: codDip }));
      if (exist) {
        const userData = await service.datiUtente(codDip);
        patchState(store, (state) => ({ ...state, nome: userData.nome }));
      }
    },
    async aggiornaNome(nome: string) {
      await service.creaUtente(store.codDipendente(), nome);
       patchState(store, (state) => ({ ...state, nome: nome }));
    },
  })),
  withComputed((store) => ({
    loggato: computed(() => {
      return store.codDipendente().length > 0 && store.nome().length > 0;
      
    }),
  }))
);
