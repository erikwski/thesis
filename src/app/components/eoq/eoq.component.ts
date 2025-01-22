import { Component, ChangeDetectionStrategy, inject, OnInit, input, output, computed } from '@angular/core';
import { EoqService } from '../../services/eoq.service';
import { Prodotto } from '../../models/prodotto';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'prodotto-eoq',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputTextModule, ProgressSpinner],
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

  public readonly calcolateReady = computed(() =>
    this.eoqService.calcolateReady()
  );

  public readonly puntoRiordino = computed(() => {
    const { leadTime, annualDemand } = this.prodotto();
    return this.calcolateReady()
      ? this.eoqService.calculateReorderPoint(leadTime, annualDemand)
      : null;
  });

  public readonly eoq = computed(() => {
    const { annualDemand, setupCost, holdingCostPerUnit } = this.prodotto();
    return this.calcolateReady()
      ? this.eoqService.calculateEOQ(
          annualDemand,
          setupCost,
          holdingCostPerUnit
        )
      : null;
  });

  public readonly costoTotale = computed(() => {
    const { annualDemand, setupCost, holdingCostPerUnit, unitCost } =
      this.prodotto();
    return this.calcolateReady() && this.eoq()
      ? this.eoqService.calculateTotalCost(
          annualDemand,
          setupCost,
          holdingCostPerUnit,
          unitCost,
          this.eoq()!
        )
      : null;
  });
}
