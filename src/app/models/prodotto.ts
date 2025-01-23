export interface Prodotto {
  id: string; // Identificativo unico del prodotto
  name: string; // Nome del prodotto
  description?: string; // Descrizione del prodotto (opzionale)
  annualDemand: number; // Domanda annua (D)
  setupCost: number; // Costo di setup/ordinazione (S)
  holdingCostPerUnit: number; // Costo di mantenimento per unità per anno (H)
  unitCost: number; // Costo per unità del prodotto
  leadTime: number; // Tempo di consegna (in giorni)
  utente?: number; // Utente alla quale é collegato
}

export class ProdottoApiCasting {
  static fromAPIResponse(data: any): Prodotto {
    return {
      id: String(data.id),
      name: data.name,
      description: data.description ?? undefined,
      annualDemand: data.annual_demand,
      setupCost: data.setup_cost.toFixed(2),
      holdingCostPerUnit: data.holding_cost_per_unit.toFixed(2),
      unitCost: data.unit_cost.toFixed(2),
      leadTime: data.lead_time,
      utente: data.utente,
    };
  }

  static toAPIResponse(data: Partial<Prodotto>): any {
    return {
      id: data.id,
      name: data.name,
      description: data.description ?? undefined,
      annual_demand: Math.abs(Number(data.annualDemand)) ?? 0,
      setup_cost: Number(data.setupCost) ?? 0,
      holding_cost_per_unit: Number(data.holdingCostPerUnit) ?? 0,
      unit_cost: Number(data.unitCost) ?? 0,
      lead_time: Math.abs(Number(data.leadTime)) ?? 0,
      utente: data.utente,
    };
  }
}

export const DEFAULT_PRODOTTO: Prodotto = {
  id: '',
  name: '',
  description: '',
  annualDemand: 0,
  setupCost: 0,
  holdingCostPerUnit: 0,
  unitCost: 0,
  leadTime: 0,
};