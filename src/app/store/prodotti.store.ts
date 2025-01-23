import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { setFulfilled, setPending, withRequestStatus } from './request-status.feature';
import { withLogger } from './logger.feature';
import { Prodotto, ProdottoApiCasting } from '../models/prodotto';
import { ProdottoService } from '../services/prodotti.service';
import { GlobalStore } from './global.store';

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
  withMethods(
    (
      store,
      service = inject(ProdottoService),
      global = inject(GlobalStore)
    ) => ({
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
                ProdottoApiCasting.fromAPIResponse(prodotto)
              ),
              total: data.total,
              page,
              searchTerm,
            }),
            setFulfilled()
          );
        } catch (error: any) {
          global.setError(
            `Impossibile caricare i prodotti, ${
              error?.message ?? "riprovare piú tardi o contattare l'assistenza"
            }`
          );
          patchState(store, () => initialState, setFulfilled());
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
          global.showMessage(`Prodotto eliminato correttamente`, 'success');
        } catch (error: any) {
          global.setError(
            `Impossibile eliminare il prodotto, ${
              error?.message ?? "riprovare piú tardi o contattare l'assistenza"
            }`
          );
          patchState(store, () => initialState, setFulfilled());
        }
      },
      async aggiornaProdotto(prodotto: Prodotto): Promise<void> {
        patchState(store, setPending());
        try {
          await service.updateProdotto(
            prodotto.id,
            ProdottoApiCasting.toAPIResponse(prodotto)
          );
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
          global.showMessage(`Prodotto aggiornato correttamente`, 'success');
        } catch (error: any) {
          global.setError(
            `Impossibile aggiornare il prodotto, ${
              error?.message ?? "riprovare piú tardi o contattare l'assistenza"
            }`
          );
          patchState(store, () => initialState, setFulfilled());
        }
      },
      async creaProdotto(
        prodotto: Prodotto,
        codDip: number
      ): Promise<Prodotto | null> {
        patchState(store, setPending());
        const newProd = ProdottoApiCasting.toAPIResponse(prodotto);
        delete newProd.id;
        newProd.utente = codDip;
        try {
          const res = await service.addProdotto(newProd);
          setFulfilled();
          global.showMessage(`Prodotto creato correttamente`, 'success');
          return res;
        } catch (error: any) {
          global.setError(
            `Impossibile creare il prodotto, ${
              error?.message ?? "riprovare piú tardi o contattare l'assistenza"
            }`
          );
          patchState(store, () => initialState, setFulfilled());
          return null;
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
    })
  )
);
