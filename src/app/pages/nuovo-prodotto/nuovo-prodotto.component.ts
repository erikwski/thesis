import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DEFAULT_PRODOTTO, Prodotto } from '../../models/prodotto';
import { FormProdottoComponent } from "../../components/form-prodotto.component";
import { ProdottiStore } from '../../store/prodotti..store';
import { GlobalStore } from '../../store/global.store';

@Component({
  selector: 'app-nuovo-prodotto',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormProdottoComponent],
  templateUrl: './nuovo-prodotto.component.html',
  styleUrl: './nuovo-prodotto.component.scss',
})
export class NuovoProdottoComponent {
  public prodottoStore = inject(ProdottiStore);
  public store = inject(GlobalStore);
  public prodotto = DEFAULT_PRODOTTO;

  creaProdotto(prodotto: Prodotto) {
    this.prodottoStore.creaProdotto(prodotto, this.store.codDipendente())
  }
}
