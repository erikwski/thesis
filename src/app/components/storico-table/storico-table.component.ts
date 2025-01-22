import { Component, ChangeDetectionStrategy, input, inject, signal, computed, OnInit } from '@angular/core';
import { Prodotto } from '../../models/prodotto';
import { StoricoStore } from '../../store/storico.store';
import { Storico } from '../../models/storico';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'storico-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableModule, ProgressSpinnerModule, MessageModule],
  templateUrl: './storico-table.component.html',
})
export class StoricoTableComponent implements OnInit {
  public readonly prodotto = input.required<Prodotto>();
  protected store = inject(StoricoStore);

  public storicoProdotto = signal<Storico[]>([]);
  
  public loading = computed(() => this.store.isPending());

  ngOnInit(): void {
    this.getStorico();
  }

  protected async getStorico(){
    const res = await this.store.getStoricoProdotto(this.prodotto().id);
    console.log(res)
    
    this.storicoProdotto.set(res);
  }
}
