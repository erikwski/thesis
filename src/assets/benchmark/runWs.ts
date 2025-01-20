export async function benchmarkWASM() {
  const response = await fetch('../assembly/build/release.wasm');
  const buffer = await response.arrayBuffer();
  const wasmModule = await WebAssembly.instantiate(buffer);
  const { calculateEOQ, calculateTotalCost, calculateReorderPoint } =
    wasmModule.instance.exports;

  const start = performance.now();

  for (let i = 0; i < 1000000; i++) {
    const eoq = (calculateEOQ as CallableFunction)(1000, 50, 2);
    const totalCost = (calculateTotalCost as CallableFunction)(1000, 50, 2, 20, eoq);
    const reorderPoint = (calculateReorderPoint as CallableFunction)(10, 1000, 250);
  }

  const end = performance.now();
  console.log('WebAssembly Execution Time:', end - start, 'ms');
}

benchmarkWASM();
