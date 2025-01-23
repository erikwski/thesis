import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { withLogger } from "./logger.feature";
import { setFulfilled, setPending, withRequestStatus } from "./request-status.feature";
import { GlobalStore } from "./global.store";
import { Storico } from "../models/storico";
import { inject } from "@angular/core";
import { StoricoService } from "../services/storico.service";

type StoricoState = {
  anniConStorico: number[]
};

const initialState: StoricoState = {
  anniConStorico: []
};

export const StoricoStore = signalStore(
  withState(initialState),
  withLogger('Storico'),
  withRequestStatus(),
  withMethods(
    (
      store,
      service = inject(StoricoService),
      global = inject(GlobalStore)
    ) => ({
      async anniConStoricoCalcolato(): Promise<void> {
        patchState(store, setPending());
        try {
          const data = await service.anniConStoricoCalcolato(
            global.codDipendente()
          );
          patchState(
            store,
            (state) => ({
              ...state,
              anniConStorico: data,
            }),
            setFulfilled()
          );
        } catch (error: any) {
          global.setError(
            `Impossibile caricare lo storico, ${
              error?.message ?? "riprovare piú tardi o contattare l'assistenza"
            }`
          );
          patchState(store, () => initialState, setFulfilled());
        }
      },
      async getStoricoProdotto(prodottoId: string): Promise<Storico[]> {
        patchState(store, setPending());
        try {
          const res = await service.ottieniStoricoProdotto(prodottoId);
          patchState(store, setFulfilled());
          return res.data;
        } catch (error: any) {
          global.setError(
            `Errore durante il recupero dello storico, ${
              error?.message ?? "riprovare piú tardi o contattare l'assistenza"
            }`
          );
          patchState(store, setFulfilled());
          return [];
        }
      },
      async calcolaStoricoWasm(annoCorrente: number): Promise<void> {
        patchState(store, setPending());
        try {
          await service.calcolaStoricoWasm(
            annoCorrente,
            global.codDipendente()
          );
          patchState(
            store,
            (state) => ({
              ...state,
              anniConStorico: [annoCorrente, ...state.anniConStorico]
            }),
            setFulfilled()
          );
          global.showMessage(`Calcolato storico ${annoCorrente}`, 'success');
        } catch (error: any) {
          global.setError(
            `Impossibile calcolare storico, ${
              error?.message ?? "riprovare piú tardi o contattare l'assistenza"
            }`
          );
          patchState(store, setFulfilled());
        }
      },
    })
  )
);
