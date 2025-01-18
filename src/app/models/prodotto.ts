export interface Prodotto {
  id: string; // Identificativo unico del prodotto
  name: string; // Nome del prodotto
  description?: string; // Descrizione del prodotto (opzionale)
  annualDemand: number; // Domanda annua (D)
  setupCost: number; // Costo di setup/ordinazione (S)
  holdingCostPerUnit: number; // Costo di mantenimento per unità per anno (H)
  unitCost: number; // Costo per unità del prodotto
  leadTime: number; // Tempo di consegna (in giorni)
  reorderPoint?: number; // Punto di riordino (calcolato o definito)
  eoq?: number; // Lotto Economico di Ordinazione (calcolato)
  totalCost?: number; // Costo totale annuale associato (calcolato)
  utente: number; // Utente alla quale é collegato
}

export class ProdottoDto {
  static fromAPIResponse(data: any): Prodotto {
    return {
      id: String(data.id),
      name: data.name,
      description: data.description ?? undefined, 
      annualDemand: data.annual_demand.toFixed(2),
      setupCost: data.setup_cost.toFixed(2),
      holdingCostPerUnit: data.holding_cost_per_unit.toFixed(2),
      unitCost: data.unit_cost.toFixed(2),
      leadTime: data.lead_time.toFixed(2),
      reorderPoint: data.reorder_point ?? undefined,
      eoq: data.eoq ?? undefined,
      totalCost: data.total_cost ?? undefined,
      utente: data.utente,
    };
  }
}