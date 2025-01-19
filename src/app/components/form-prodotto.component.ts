import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Prodotto } from '../models/prodotto';


@Component({
  selector: 'form-prodotto',
  templateUrl: './form-prodotto.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class FormProdottoComponent {
  public readonly prodotto = input.required<Prodotto>();
}
