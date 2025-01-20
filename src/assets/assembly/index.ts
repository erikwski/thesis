export function calculateEOQ(D: f64, S: f64, H: f64): f64 {
  if (D <= 0 || S <= 0 || H <= 0) {
    throw new Error('D, S, and H must be greater than zero.');
  }
  return Math.sqrt((2 * D * S) / H);
}
