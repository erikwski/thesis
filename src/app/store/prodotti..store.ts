import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { UserData } from '../models/userData';
import { computed, inject } from '@angular/core';
import { setFulfilled, setPending, withRequestStatus } from './request-status.feature';
import { withLogger } from './logger.feature';
import { UserService } from '../services/user.service';
import { Prodotto, ProdottoDto } from '../models/prodotto';
import { ProdottoService } from '../services/prodotti.service';

type ProdottoState = {
  prodotti: Prodotto[],
  page: number,
  pageSize: number,
  total: number,
  searchTerm: string
}

const initialState: ProdottoState = {
  prodotti: [],
  page: 0,
  pageSize: 10,
  total: 0,
  searchTerm: "",
};

export const ProdottiStore = signalStore(
  withState(initialState),
  withLogger('Prodotti'),
  withRequestStatus(),
  withMethods((store, service = inject(ProdottoService)) => ({
    async search(page: number, searchTerm: string): Promise<void> {
      patchState(store, setPending());
      try {
        const data = await service.getPaginatedProdotti(
          page,
          store.pageSize(),
          searchTerm
        );
        patchState(
          store,
          (state) => ({
            ...state,
            prodotti: data.data.map((prodotto) =>
              ProdottoDto.fromAPIResponse(prodotto)
            ),
            total: data.total,
            page,
            searchTerm,
          }),
          setFulfilled()
        );
      } catch (error) {
        store.setError(
          "C'é stato un problema nel caricare i prodotti, riprovare piú tardi o contattare l'assistenza"
        );
        patchState(store, () => initialState);
      }
    },
    async eliminaProdotto(prodottoId: string): Promise<void> {
      patchState(store, setPending());
      try {
        await service.deleteProdotto(prodottoId);
        //se andata a buon fine, elimino il prodotto dalla lista
        patchState(
          store,
          (state) => ({
            ...state,
            prodotti: store.prodotti().filter((el) => el.id !== prodottoId),
            total: store.total() - 1,
          }),
          setFulfilled()
        );
      } catch (error) {
        store.setError(
          "Impossibile eliminare il prodotto, riprovare piú tardi o contattare l'assistenza"
        );
        patchState(store, () => initialState, setFulfilled());
      }
    },
    async aggiornaProdotto(prodotto: Prodotto): Promise<void> {
      patchState(store, setPending());
      try {
        await service.updateProdotto(prodotto.id, ProdottoDto.toAPIResponse(prodotto));
        //se andata a buon fine, elimino il prodotto dalla lista
        patchState(
          store,
          (state) => ({
            ...state,
            prodotti: store
              .prodotti()
              .map((el) => (el.id === prodotto.id ? prodotto : el)),
          }),
          setFulfilled()
        );
      } catch (error) {
        store.setError(
          "Impossibile aggiornare il prodotto, riprovare piú tardi o contattare l'assistenza"
        );
        patchState(store, () => initialState, setFulfilled());
      }
    },
    async creaProdotto(prodotto: Prodotto, codDip: number): Promise<void> {
      patchState(store, setPending());
      const newProd = ProdottoDto.toAPIResponse(prodotto);
      if(newProd.id) delete newProd.id;
      newProd.utente = codDip;
      try {
        await service.addProdotto(newProd);
        setFulfilled();
      } catch (error) {
        store.setError(
          "Impossibile creare il prodotto, riprovare piú tardi o contattare l'assistenza"
        );
        patchState(store, () => initialState, setFulfilled());
      }
    },
    changePageSize(pageSize: number): void {
      patchState(store, (state) => ({
        ...state,
        pageSize,
      }));
    },
    logout(): void {
      patchState(store, () => initialState);
    },
  }))
);
