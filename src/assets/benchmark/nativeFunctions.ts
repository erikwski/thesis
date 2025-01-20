export function calculateEOQ(D: number, S: number, H: number) {
  return Math.sqrt((2 * D * S) / H);
}

export function calculateTotalCost(
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

export function calculateReorderPoint(leadTime: number, annualDemand: number, workingDays = 365) {
  if (leadTime <= 0 || annualDemand <= 0 || workingDays <= 0) {
    throw new Error(
      "Lead time, annual demand, and working days must be greater than zero."
    );
  }
  const averageDailyDemand = annualDemand / workingDays;
  return leadTime * averageDailyDemand;
}
