import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DEFAULT_PRODOTTO, Prodotto } from '../../models/prodotto';
import { FormProdottoComponent } from "../../components/form-prodotto.component";
import { ProdottiStore } from '../../store/prodotti..store';

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
  public prodotto = DEFAULT_PRODOTTO;

  creaProdotto(prodotto : Prodotto){
    // this.prodottoStore
  }
}
