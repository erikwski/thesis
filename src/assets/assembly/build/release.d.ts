/** Exported memory */
export declare const memory: WebAssembly.Memory;
/**
 * src/assets/assembly/index/calculateEOQ
 * @param D `f64`
 * @param S `f64`
 * @param H `f64`
 * @returns `f64`
 */
export declare function calculateEOQ(D: number, S: number, H: number): number;
/**
 * src/assets/assembly/index/calculateTotalCost
 * @param annualDemand `f64`
 * @param setupCost `f64`
 * @param holdingCostPerUnit `f64`
 * @param unitCost `f64`
 * @param eoq `f64`
 * @returns `f64`
 */
export declare function calculateTotalCost(annualDemand: number, setupCost: number, holdingCostPerUnit: number, unitCost: number, eoq: number): number;
/**
 * src/assets/assembly/index/calculateReorderPoint
 * @param leadTime `f64`
 * @param annualDemand `f64`
 * @param workingDays `f64`
 * @returns `f64`
 */
export declare function calculateReorderPoint(leadTime: number, annualDemand: number, workingDays?: number): number;
