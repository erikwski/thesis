import { computed, inject, Injectable } from '@angular/core';
import { WasmLoaderService } from './webAssembly.service.js';

@Injectable({
  providedIn: 'root',
})
export class EoqService {
  protected loader = inject(WasmLoaderService);

  public readonly calcolateReady = computed(() => this.loader.loadedInstance());

  public async loadedWasm() {
    if (!this.loader.loadedInstance()) {
      this.loader.loadWasm();
    }
  }

  protected approssimaDecimali(num: number){
    return Math.round(num * 100) / 100;
  }

  public calculateEOQ(
    annualDemand: number,
    setupCost: number,
    holdingCostPerUnit: number
  ): number {
    return this.approssimaDecimali(
      this.loader.callFunction<number>(
        'calculateEOQ',
        annualDemand,
        setupCost,
        holdingCostPerUnit
      ) ?? 0
    );
  }

  public calculateTotalCost(
    annualDemand: number,
    setupCost: number,
    holdingCostPerUnit: number,
    unitCost: number,
    eoq: number
  ): number {
    return this.approssimaDecimali(
      this.loader.callFunction<number>(
        'calculateTotalCost',
        annualDemand,
        setupCost,
        holdingCostPerUnit,
        unitCost,
        eoq
      ) ?? 0
    );
  }

  public calculateReorderPoint(leadTime: number, annualDemand: number): number {
    return this.approssimaDecimali(
      this.loader.callFunction<number>(
        'calculateReorderPoint',
        leadTime,
        annualDemand
      ) ?? 0
    );
  }
}
