import { inject, Injectable } from '@angular/core';
import * as webAssembly from '../../assets/assembly/build/release.js';
import { WasmLoaderService } from './webAssembly.service.js';

@Injectable({
  providedIn: 'root',
})
export class EoqService {
  protected loader = inject(WasmLoaderService);

  async calculateEOQ(D: number, S: number, H: number): Promise<number> {
    await this.loader.loadWasm();
    return this.loader.callFunction<number>('calculateEOQ', D, S, H) ?? 0;
  }
}
