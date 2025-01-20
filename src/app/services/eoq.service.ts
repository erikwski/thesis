import { inject, Injectable } from '@angular/core';
import { WasmLoaderService } from './webAssembly.service.js';

@Injectable({
  providedIn: 'root',
})
export class EoqService {
  protected loader = inject(WasmLoaderService);

  public async loadedWasm(){
    if (!this.loader.loadedInstance) {
      this.loader.loadWasm();
    }
  } 

  public calculateEOQ(D: number, S: number, H: number): number {
    return this.loader.callFunction<number>('calculateEOQ', D, S, H) ?? 0;
  }

  public get isLoaded(){
    return this.loader.loadedInstance
  }
}
