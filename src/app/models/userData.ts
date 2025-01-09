import { Prodotto } from "./prodotto";

export interface UserData {
  codDipendente: string;
  nome: string,
  prodotti: Prodotto[]
}
