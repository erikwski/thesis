import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { withLogger } from "./logger.feature";
import { setFulfilled, setPending, withRequestStatus } from "./request-status.feature";
import { GlobalStore } from "./global.store";
import { Storico } from "../models/storico";
import { inject } from "@angular/core";
import { StoricoService } from "../services/storico.service";

type StoricoState = {
  storiciCalcolati: Record<number, Storico[]>;
};

const initialState: StoricoState = {
  storiciCalcolati: [],
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
      async calcolaPerAnno(anno: number): Promise<void> {},
      async getStoricoProdotto(prodottoId: string): Promise<Storico[]> {
        patchState(store, setPending());
        try {
          const res = await service.ottieniStorico(prodottoId)
          patchState(store, setFulfilled());
          return res.data;
        } catch (error: any) {
          global.setError(
            `Errore durante il recupero dello storico, ${
              error?.message ?? "riprovare piú tardi o contattare l'assistenza"
            }`
          );
          return [];
        }
      },
    })
  )
);
