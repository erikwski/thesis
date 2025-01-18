import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { UserData } from '../models/userData';
import { Prodotto } from '../models/prodotto';
import { computed, inject } from '@angular/core';
import { SupabaseService } from '../services/database.service';
import { setError, setFulfilled, setPending, withRequestStatus } from './request-status.feature';
import { withLogger } from './logger.feature';

const initialState: UserData = {
  nome: '',
  codDipendente: '',
  prodotti: [],
};

export const UserStore = signalStore(
  withState(initialState),
  withLogger("User"),
  withRequestStatus(),
  withMethods((store, service = inject(SupabaseService)) => ({
    async login(codDip: string): Promise<void> {
      patchState(store, setPending());
      try {
        const exist = await service.esisteUtente(codDip);
        if (exist) {
          // se esiste recupero il nome
          const userData = await service.datiUtente(codDip);
          patchState(
            store,
            (state) => ({
              ...state,
              nome: userData.nome,
              codDipendente: codDip,
            }),
            setFulfilled()
          );
        }else{
          // se non esiste (primo login dipendente), gli richiedo il nome
          patchState(
            store,
            (state) => ({ ...state, codDipendente: codDip }),
            setFulfilled()
          );
        }
      } catch (error) {
        patchState(
          store,
          () => initialState,
          setError("C'é stato un problema nel login, riprovare piú tardi o contattare l'assistenza")
        );
      }
    },
    async aggiornaNome(nome: string) {
      patchState(store, setPending());
      try {
        await service.creaUtente(store.codDipendente(), nome);
        patchState(store, (state) => ({ ...state, nome: nome }), setFulfilled());
      } catch (error) {
         patchState(
           store,
           setError(
             "C'é stato un problema nella creazione del nuovo utente, riprovare piú tardi o contattare l'assistenza"
           )
         );
      }
    },
  })),
  withComputed((store) => ({
    loggato: computed(() => {
      return store.codDipendente().length > 0 && store.nome().length > 0;
    }),
  }))
);
