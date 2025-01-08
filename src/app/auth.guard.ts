import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (localStorage.getItem('user')) {
    return true; // Allow access to the route
  } else {
    // If no 'user' in localStorage, redirect to the root
    router.navigate(['/']);
    return false; // Prevent access to the route
  }
};
