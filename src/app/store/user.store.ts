import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { UserData } from '../models/userData';
import { Prodotto } from '../models/prodotto';

const initialState: UserData = {
  nome: '',
  codDipendente: '',
  prodotti: [],
};

export const UserStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    login(userData: UserData): void {
      patchState(store, () => userData);
    },
    aggiungiProdotto(prodotto: Prodotto): void {
      patchState(store, (state) => ({
        prodotti: { ...state.prodotti, prodotto },
      }));
    },
  }))
);
