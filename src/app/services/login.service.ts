import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserStore } from '../store/user.store';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  protected router = inject(Router);
  readonly store = inject(UserStore);
  public codDipendente = '';

  constructor() {
    this.codDipendente = localStorage.getItem('user') ?? '';
  }

  login(codDip: string) {
    this.codDipendente = codDip;
    localStorage.setItem('user', codDip);
  }
}
