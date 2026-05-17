import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '@org/auth';
import { AuthService } from '../data-access/auth.service';
import { LoginRequest } from '../domain/auth.model';

@Injectable()
export class LoginFacade {
  private authService = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store);

  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  showPassword = signal<boolean>(false);

  loginData: LoginRequest = {
    username: '',
    password: '',
    group: 'Operations',
  };

  onLogin() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.access_token);

        // Dispatch to global NgRx Store
        this.store.dispatch(
          AuthActions.loginSuccess({
            user: {
              username: response.employee.username,
              group: response.employee.group,
            },
          }),
        );

        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.isLoading.set(false);
        if (err.status === 401) {
          this.errorMessage.set('Username atau password salah.');
        } else if (err.status === 500) {
          this.errorMessage.set(
            'Terjadi kesalahan pada server. Silakan coba lagi nanti.',
          );
        } else if (err.status === 0) {
          this.errorMessage.set(
            'Tidak dapat terhubung ke server. Pastikan koneksi internet Anda aktif.',
          );
        } else {
          this.errorMessage.set(
            err.error?.message || 'Terjadi kesalahan saat login.',
          );
        }
        console.error('Login error:', err);
      },
    });
  }
}
