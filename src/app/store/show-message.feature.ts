import { inject } from '@angular/core';
import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { MessageService } from 'primeng/api';

export type MessageSeverity =
  | 'success'
  | 'info'
  | 'warn'
  | 'error';  
  
export type MessageState = {
  message: { id: number, severity: MessageSeverity; title: string; content: string, time: number };
};

const titleMap: Record<MessageSeverity, string> = {
  success: 'Successo',
  info: 'Info',
  warn: 'Attenzione',
  error: 'Errore',
};

export function withShowMessages() {
  return signalStoreFeature(
    withState<MessageState>({
      message: {
        id: 0,
        severity: 'success',
        title: '',
        content: '',
        time: 0
      },
    }),
    withMethods((store) => ({
      showMessage(content: string, severity: MessageSeverity, time: number = 3000) {
        time = 999999999
        patchState(store, () => ({
          message: {
            id: store.message.id() + 1,
            title: titleMap[severity],
            content,
            severity,
            time
          },
        }));
      },
    }))
  );
}