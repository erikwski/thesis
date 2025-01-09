import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from '@angular/fire/firestore';
import { docData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { getDoc } from 'firebase/firestore';
import { Prodotto } from '../models/prodotto';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  protected firestore = inject(Firestore);
  protected loginService = inject(LoginService);

  /** Controlla se esiste giá un utente */
  async esisteUtente(): Promise<boolean> {
    const docRef = doc(
      this.firestore,
      `genericCollection/${this.loginService.codDipendente}`
    );
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.exists(); // Ritorna true se l'utente esiste giá
  }

  /** Inizializza un nuovo utente */
  async creaUtente(name: string): Promise<void> {
    const docRef = doc(
      this.firestore,
      `genericCollection/${this.loginService.codDipendente}`
    );
    const data = {
      products: [],
      name,
    };
    return setDoc(docRef, data);
  }

  /** Aggiungi un prodotto ai prodotti esistenti */
  async aggiungiProdotto(product: Prodotto): Promise<void> {
    const docRef = doc(
      this.firestore,
      `genericCollection/${this.loginService.codDipendente}`
    );
    return updateDoc(docRef, {
      products: arrayUnion(product),
    });
  }

  // Ottieni i dati dell'utente loggato
  datiUtente(): Observable<any> {
    const docRef = doc(
      this.firestore,
      `genericCollection/${this.loginService.codDipendente}`
    );
    return docData(docRef, { idField: 'id' });
  }
}
