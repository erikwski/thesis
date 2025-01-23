import { Component, ChangeDetectionStrategy, inject, OnInit, computed } from '@angular/core';
import { StoricoService } from '../../services/storico.service';
import { StoricoStore } from '../../store/storico.store';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-storico',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableModule,
    ProgressSpinnerModule,
    BadgeModule,
    ButtonModule,
    Message,
  ],
  providers: [StoricoService],
  templateUrl: './storico.component.html',
})
export class StoricoComponent implements OnInit {
  public store = inject(StoricoStore);

  public annoCorrente = new Date().getFullYear();
  public anniDaMostrare = Array.from(
    { length: 5 },
    (_, i) => this.annoCorrente - i
  );

  public loading = computed(() => this.store.isPending());

  ngOnInit(): void {
    this.store.anniConStoricoCalcolato();
  }

  isCalcolato(anno: number) {
    return this.store.anniConStorico().some((annoCalc) => annoCalc == anno);
  }

  calcolaStorico(){
    this.store.calcolaStoricoWasm(this.annoCorrente);
  }
}
