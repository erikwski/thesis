import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WasmLoaderService {
  private wasmInstance: WebAssembly.Instance | null = null;

  constructor() {}

  /**
   * Carica il modulo webAssembly
   */
  async loadWasm(): Promise<void> {
    if (this.wasmInstance) {
      console.warn('WASM module already loaded.');
      return;
    }

    try {
      const response = await fetch('/assets/assembly/build/release.wasm');
      const buffer = await response.arrayBuffer();

      const imports = {
        env: {
          memory: new WebAssembly.Memory({ initial: 256, maximum: 512 }),
          abort: () => console.error('Abort called in WASM'),
        },
      };

      const { instance } = await WebAssembly.instantiate(buffer, imports);
      this.wasmInstance = instance;

      console.log('WASM module loaded:', instance.exports);
    } catch (error) {
      console.error('Failed to load WASM module:', error);
      throw error;
    }
  }

  /**
   * Chiama uno delle funzioni esportate in WASM
   * @param functionName  nome funzione
   * @param args parametri
   */
  callFunction<T = any>(functionName: string, ...args: any[]): T | null {
    debugger;
    if (!this.wasmInstance) {
      console.error('WASM module not loaded.');
      return null;
    }

    const fn = this.wasmInstance.exports[functionName] as (...args: any[]) => T;
    if (typeof fn !== 'function') {
      console.error(`Function ${functionName} not found in WASM exports.`);
      return null;
    }

    return fn(...args);
  }
}
