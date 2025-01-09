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
  lastUpdated?: Date; // Ultima data di aggiornamento delle informazioni
}
