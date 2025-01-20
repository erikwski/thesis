export function calculateEOQ(D: f64, S: f64, H: f64): f64 {
  return Math.sqrt((2 * D * S) / H);
}

export function calculateTotalCost(
  annualDemand: f64,
  setupCost: f64,
  holdingCostPerUnit: f64,
  unitCost: f64,
  eoq: f64
): f64 {
  // Calcolo costi singolarmente, fatto inline per maggiori performance
  // const orderingCost: f64 = (annualDemand * setupCost) / eoq;
  // const holdingCost: f64 = (eoq * holdingCostPerUnit) / 2;
  // const purchaseCost: f64 = annualDemand * unitCost;

  // Return total cost
  return (
    (annualDemand * setupCost) / eoq +
    (eoq * holdingCostPerUnit) / 2 +
    annualDemand * unitCost
  );
}

// Function to calculate the reorder point
export function calculateReorderPoint(
  leadTime: f64,
  annualDemand: f64,
  workingDays: f64 = 365
): f64 {
  if (leadTime <= 0 || annualDemand <= 0 || workingDays <= 0) {
    throw new Error(
      'Lead time, annual demand, and working days must be greater than zero.'
    );
  }

  // Calcolo costi singolarmente, fatto inline per maggiori performance
  // const averageDailyDemand: f64 = annualDemand / workingDays;

  return (leadTime * annualDemand) / workingDays;
}