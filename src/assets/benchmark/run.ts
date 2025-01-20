import {
  calculateEOQ,
  calculateTotalCost,
  calculateReorderPoint,
} from './nativeFunctions';

export function benchmarkJavaScript() {
  const start = performance.now();

  for (let i = 0; i < 99999999; i++) {
    const eoq = calculateEOQ(1000, 50, 2);
    const totalCost = calculateTotalCost(1000, 50, 2, 20, eoq);
    const reorderPoint = calculateReorderPoint(10, 1000, 250);
  }

  const end = performance.now();
  console.log('JavaScript Execution Time:', end - start, 'ms');
}
