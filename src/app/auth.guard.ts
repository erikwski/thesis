import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { inject } from '@angular/core';
import { GlobalStore } from './store/global.store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  protected router = inject(Router);
  protected store = inject(GlobalStore);

  canActivate() {
    if (this.store.loggato()) {
      return true; // Allow access to the route
    } else {
      // If no 'user' in localStorage, redirect to the root
      this.router.navigate(['/']);
      return false; // Prevent access to the route
    }
  }
}