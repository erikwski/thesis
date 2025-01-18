import { Prodotto } from "./prodotto";

export interface UserData {
  codDipendente: number;
  nome: string,
  prodotti: Prodotto[]
}
