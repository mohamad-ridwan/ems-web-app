import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthActions, selectCurrentUser } from '@org/auth';

@Injectable({
  providedIn: 'root',
})
export class AppViewModel {
  private store = inject(Store);
  private router = inject(Router);
  private http = inject(HttpClient);

  // Expose reactive signal of the current user
  public readonly user = this.store.selectSignal(selectCurrentUser);

  constructor() {
    this.loadCurrentUser();
  }

  private loadCurrentUser() {
    this.http.get<any>('http://localhost:3400/api/auth/me').subscribe({
      next: (employee) => {
        this.store.dispatch(
          AuthActions.loginSuccess({
            user: {
              username: employee.username,
              group: employee.group,
            },
          }),
        );
      },
      error: (err) => {
        console.error('Failed to load current user profile:', err);
        this.store.dispatch(AuthActions.logout());
        // Do not redirect here to avoid race conditions with guards
      },
    });
  }

  public logout() {
    this.http.post('http://localhost:3400/api/auth/logout', {}).subscribe({
      next: () => {
        this.store.dispatch(AuthActions.logout());
        this.router.navigate(['/login']);
      },
      error: () => {
        this.store.dispatch(AuthActions.logout());
        this.router.navigate(['/login']);
      }
    });
  }
}
