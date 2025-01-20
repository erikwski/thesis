import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WasmLoaderService {
  protected wasmInstance = signal<WebAssembly.Instance | null>(null);
  public loadedInstance = computed(() => this.wasmInstance() != null);

  constructor() {}

  /**
   * Carica il modulo webAssembly
   */
  async loadWasm(): Promise<void> {
    if (this.wasmInstance()) {
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
      this.wasmInstance.set(instance);

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
  callFunction<T = any>(functionName: string, ...args: any[]): T {
    if (!this.wasmInstance()) {
      throw Error('WASM module not loaded.');
    }

    const fn = this.wasmInstance()!.exports[functionName] as (...args: any[]) => T;
    if (typeof fn !== 'function') {
      throw Error(`Function ${functionName} not found in WASM exports.`);
    }

    return fn(...args);
  }
}
