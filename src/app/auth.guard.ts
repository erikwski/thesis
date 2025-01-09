import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserStore } from './store/user.store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  router = inject(Router);
  store = inject(UserStore);


  canActivate() {
    debugger;
    if (this.store.loggato()) {
      return true; // Allow access to the route
    } else {
      // If no 'user' in localStorage, redirect to the root
      this.router.navigate(['/']);
      return false; // Prevent access to the route
    }
  }
}