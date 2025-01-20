/** Exported memory */
export declare const memory: WebAssembly.Memory;
/**
 * assembly/index/calculateEOQ
 * @param D `f64`
 * @param S `f64`
 * @param H `f64`
 * @returns `f64`
 */
export declare function calculateEOQ(D: number, S: number, H: number): number;
/**
 * assembly/index/calculateTotalCost
 * @param annualDemand `f64`
 * @param setupCost `f64`
 * @param holdingCostPerUnit `f64`
 * @param unitCost `f64`
 * @param eoq `f64`
 * @returns `f64`
 */
export declare function calculateTotalCost(annualDemand: number, setupCost: number, holdingCostPerUnit: number, unitCost: number, eoq: number): number;
/**
 * assembly/index/calculateReorderPoint
 * @param leadTime `f64`
 * @param annualDemand `f64`
 * @returns `f64`
 */
export declare function calculateReorderPoint(leadTime: number, annualDemand: number): number;
