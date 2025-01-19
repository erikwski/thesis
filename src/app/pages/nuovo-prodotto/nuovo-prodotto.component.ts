import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nuovo-prodotto',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './nuovo-prodotto.component.html',
  styleUrl: './nuovo-prodotto.component.scss'
})
export class NuovoProdottoComponent {

}
