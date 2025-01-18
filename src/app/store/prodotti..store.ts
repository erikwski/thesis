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
        const data = await service.getPaginatedProdotti(page, store.pageSize(), searchTerm);
        patchState(
          store,
          (state) => ({ 
            ...state, 
            prodotti: data.data.map(prodotto=> ProdottoDto.fromAPIResponse(prodotto)),
            total: data.total,
            page,
            searchTerm
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
    changePageSize(pageSize: number): void {
      patchState(store, (state) => ({
        ...state,
        pageSize
      }));
    }
  })),
  withHooks({
    async onInit(store) {
      // Alla prima instanza dello store, carico i primi dati
      store.search(0, "");
    },
  })
);
