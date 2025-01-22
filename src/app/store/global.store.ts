import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { UserData } from '../models/userData';
import { computed, effect, inject } from '@angular/core';
import { setFulfilled, setPending, withRequestStatus } from './request-status.feature';
import { withLogger } from './logger.feature';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

const initialState: UserData = {
  nome: '',
  codDipendente: 0,
};

export const GlobalStore = signalStore(
  withState(initialState),
  withLogger('User'),
  withRequestStatus(),
  withMethods((store, service = inject(UserService)) => ({
    async login(codDip: number, showSuccess: boolean = false): Promise<void> {
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
          if (showSuccess)
            store.showMessage(`Login avvenuto con successo`, 'success');
        } else {
          // se non esiste (primo login dipendente), gli richiedo il nome
          patchState(
            store,
            (state) => ({ ...state, codDipendente: codDip, nome: '' }),
            setFulfilled()
          );
          store.showMessage(
            `É il tuo primo login in piattaforma, come ti chiami?`,
            'info',
            5000
          );
        }
      } catch (error) {
        store.setError(
          "C'é stato un problema nel login, riprovare piú tardi o contattare l'assistenza"
        );
        patchState(store, () => initialState);
      }
    },
    logout() {
      localStorage.removeItem('codDip');
      patchState(store, () => initialState);
    },
    async aggiornaNome(nome: string) {
      patchState(store, setPending());
      try {
        await service.creaUtente(store.codDipendente(), nome);
        patchState(
          store,
          (state) => ({ ...state, nome: nome }),
          setFulfilled()
        );
        store.showMessage(
          `Benvenuto ${nome}, la registrazione é andata a buon fine`,
          'success'
        );
      } catch (error) {
        store.setError(
          "C'é stato un problema nella creazione del nuovo utente, riprovare piú tardi o contattare l'assistenza"
        );
      }
    },
  })),
  withComputed((store) => ({
    loggato: computed(() => {
      return store.codDipendente() > 0 && store.nome().length > 0;
    }),
  })),
  withHooks((store) => {
    const router = inject(Router);

    return {
      onInit() {
        effect(()=> store.loggato() && router.navigate(['dashboard']))
      },
    };
  }),
);
