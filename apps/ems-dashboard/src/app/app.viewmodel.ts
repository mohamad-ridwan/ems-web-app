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
    const token = localStorage.getItem('access_token');
    if (token) {
      this.http.get<any>('http://localhost:3400/api/auth/me').subscribe({
        next: (employee) => {
          this.store.dispatch(AuthActions.loginSuccess({
            user: {
              username: employee.username,
              group: employee.group,
            }
          }));
        },
        error: (err) => {
          console.error('Failed to load current user profile:', err);
          this.store.dispatch(AuthActions.logout());
          this.router.navigate(['/login']);
        }
      });
    }
  }

  public logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
}
