import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const http = inject(HttpClient);

  return http.get('http://localhost:3400/api/auth/me').pipe(
    map(() => {
      router.navigate(['/']);
      return false;
    }),
    catchError(() => {
      return of(true);
    })
  );
};
