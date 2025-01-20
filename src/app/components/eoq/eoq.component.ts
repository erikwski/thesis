import { Component, ChangeDetectionStrategy, inject, OnInit, input, output, computed } from '@angular/core';
import { EoqService } from '../../services/eoq.service';
import { Prodotto } from '../../models/prodotto';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'prodotto-eoq',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputTextModule, ButtonModule],
  templateUrl: './eoq.component.html',
})
export class EoqComponent implements OnInit {
  public readonly prodotto = input.required<Prodotto>();
  protected eoqService = inject(EoqService);
  public readonly calculatedValueUpdate = output<Prodotto>();

  ngOnInit(): void {
    // carico webAssembly in maniera lazy cosí da prepararlo per quando l'utente dovrá utilizzare i suoi calcoli
    this.eoqService.loadedWasm();
  }

  calcolateReady = computed(() => this.eoqService.isLoaded());

  valoriCalcolati = computed(()=> this.prodotto().eoq === undefined && this.prodotto().reorderPoint === undefined && this.prodotto().totalCost === undefined)
}
