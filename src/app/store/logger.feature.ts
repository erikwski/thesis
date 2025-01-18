import { effect } from '@angular/core';
import { getState, signalStoreFeature, withHooks } from '@ngrx/signals';

// Used for develop purpose of debugging state of the component
export function withLogger(name: string) {
  return signalStoreFeature(
    withHooks({
      onInit(store) {
        effect(() => {
          const state = getState(store);
          console.log(`${name} state changed`, state);
        });
      },
    })
  );
}
