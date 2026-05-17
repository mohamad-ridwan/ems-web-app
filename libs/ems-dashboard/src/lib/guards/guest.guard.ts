import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  if (!token) {
    return true;
  }

  // Redirect to main page since they are already logged in
  router.navigate(['/list-employee']);
  return false;
};
