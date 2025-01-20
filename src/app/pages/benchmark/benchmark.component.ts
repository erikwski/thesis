import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { WasmLoaderService } from '../..//services/webAssembly.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

type Response = {
  tempo: number,
  valoreCalcolato: number
}

type DataTable = {
  tempoWasm: string | null;
  valoreWasm: number;
  tempoJs: string | null;
  valoreJs: number;
  campioni: number;
  performance: string | null;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-benchmark',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    PanelModule,
    FormsModule,
    TableModule,
    BadgeModule,
    ProgressSpinnerModule
  ],
  templateUrl: './benchmark.component.html',
})
export class BenchmarkComponent {
  public service = inject(WasmLoaderService);
  public cdr = inject(ChangeDetectorRef);
  public risultati: DataTable[] = [];
  public numeroDiEsempi = signal(999);

  async runBenchmark() {
    this.risultati.push({
      campioni: this.numeroDiEsempi(),
      tempoWasm: null,
      valoreWasm: 0,
      tempoJs: null,
      valoreJs: 0,
      performance: null,
    });
    this.cdr.detectChanges();
    const wasm = await this.runWasm();
    this.risultati[this.risultati.length - 1].tempoWasm =
      wasm.tempo.toFixed(2) + 'ms';
      this.risultati[this.risultati.length - 1].valoreWasm = wasm.valoreCalcolato;
    this.cdr.detectChanges();
    const js = this.runJs();
    this.risultati[this.risultati.length - 1].tempoJs =
      js.tempo.toFixed(2) + 'ms';
    this.risultati[this.risultati.length - 1].valoreJs = js.valoreCalcolato;
    this.risultati[this.risultati.length - 1].performance = ((js.tempo / wasm.tempo) * 100).toFixed(2) + '%';
    this.cdr.detectChanges()
  }

  async runWasm() : Promise<Response> {
    await this.service.loadWasm()
    const start = performance.now();

    const accumulatedResult = this.service.callFunction(
      'benchmarkCalculations',
      this.numeroDiEsempi()
    );

    const end = performance.now();
    return {
      tempo: end - start,
      valoreCalcolato: accumulatedResult,
    };
  }

  runJs() : Response {
    const start = performance.now();
    let accumulatedResult = 0;
    for (let i = 0; i < this.numeroDiEsempi(); i++) {
      const eoq = this.calculateEOQ(1000, 50, 2);
      const totalCost = this.calculateTotalCost(1000, 50, 2, 20, eoq);
      const reorderPoint = this.calculateReorderPoint(10, 1000);
      accumulatedResult += reorderPoint + totalCost + eoq;
    }

    const end = performance.now();
    return {
      tempo: end - start,
      valoreCalcolato: accumulatedResult,
    };
  }

  calculateEOQ(D: number, S: number, H: number) {
    return Math.sqrt((2 * D * S) / H);
  }

  calculateTotalCost(
    annualDemand: number,
    setupCost: number,
    holdingCostPerUnit: number,
    unitCost: number,
    eoq: number
  ) {
    const orderingCost = (annualDemand * setupCost) / eoq;
    const holdingCost = (eoq * holdingCostPerUnit) / 2;
    const purchaseCost = annualDemand * unitCost;
    return orderingCost + holdingCost + purchaseCost;
  }

  calculateReorderPoint(
    leadTime: number,
    annualDemand: number,
    workingDays = 365
  ) {
    if (leadTime <= 0 || annualDemand <= 0 || workingDays <= 0) {
      throw new Error(
        'Lead time, annual demand, and working days must be greater than zero.'
      );
    }
    const averageDailyDemand = annualDemand / workingDays;
    return leadTime * averageDailyDemand;
  }
}
