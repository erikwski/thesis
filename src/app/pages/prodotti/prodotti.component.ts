import { Component, computed, inject } from '@angular/core';
import { ProdottiStore } from '../../store/prodotti..store';

@Component({
  selector: 'app-prodotti',
  standalone: true,
  imports: [],
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.scss'
})
export class ProdottiComponent {
  protected store = inject(ProdottiStore);

  public tableData = computed(()=> this.store.prodottiPaginated());
}
