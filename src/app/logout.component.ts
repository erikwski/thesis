import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStore } from './store/global.store';
import { ProdottiStore } from './store/prodotti..store';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: '',
})
export class LogoutComponent implements OnInit {
  protected router = inject(Router);
  protected prodottiStore = inject(ProdottiStore);
  protected store = inject(GlobalStore);

  ngOnInit(): void {
    this.prodottiStore.logout();
    this.store.logout();
    this.router.navigate(['/']);
  }
}



