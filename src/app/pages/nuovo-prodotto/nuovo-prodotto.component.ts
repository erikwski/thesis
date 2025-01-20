import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DEFAULT_PRODOTTO, Prodotto } from '../../models/prodotto';
import { FormProdottoComponent } from '../../components/form-prodotto/form-prodotto.component';
import { ProdottiStore } from '../../store/prodotti..store';
import { GlobalStore } from '../../store/global.store';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuovo-prodotto',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormProdottoComponent, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './nuovo-prodotto.component.html',
})
export class NuovoProdottoComponent {
  public prodottoStore = inject(ProdottiStore);
  public store = inject(GlobalStore);
  protected dialogService = inject(ConfirmationService);
  protected router = inject(Router);
  public prodotto = signal(DEFAULT_PRODOTTO);

  protected showDialog = effect(() => {
    if (this.prodotto().id) {
      this.dialogService.confirm({
        message: 'Prodotto creato correttamente, cosa vuoi fare?',
        header: 'Successo',
        closable: false,
        closeOnEscape: true,
        icon: 'pi pi-check-circle',
        rejectButtonProps: {
          label: 'Crea un altro prodotto',
          severity: 'secondary',
          outlined: true,
        },
        acceptButtonProps: {
          label: 'Vai a lista prodotti',
        },
        accept: async () => {
          // pusho il prodotto all'inizio dei prodotti da mostrare nella tabella
          await this.prodottoStore.search(0, '');
          this.router.navigate(['/dashboard/prodotti']);
        },
        reject: () => {
          this.prodotto.set(DEFAULT_PRODOTTO);
        },
      });
    }
  });

  public async creaProdotto(prodotto: Prodotto) {
    const res = await this.prodottoStore.creaProdotto(
      prodotto,
      this.store.codDipendente()
    );
    if(res != null){
      this.prodotto.set(res);
    }

  }
}
