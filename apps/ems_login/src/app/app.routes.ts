import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { authGuard, guestGuard } from '@org/ems-dashboard';

@Component({
  standalone: true,
  selector: 'app-dummy-home',
  template: `
    <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light" style="background: radial-gradient(circle at 50% 50%, #f8f9fa 0%, #e9ecef 100%);">
      <div class="card border-0 shadow-lg p-5 text-center" style="max-width: 500px; border-radius: 20px; backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.9);">
        <div class="mb-4">
          <div class="d-inline-flex p-4 bg-success bg-opacity-10 text-success rounded-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
          </div>
        </div>
        <h2 class="fw-bold text-dark mb-2">Login Berhasil!</h2>
        <p class="text-secondary mb-4">
          Selamat! Anda telah sukses masuk ke Dashboard Employee Management System (EMS). Semua guard keamanan dan otentikasi bekerja dengan sempurna.
        </p>
        <div class="d-grid gap-2">
          <button class="btn btn-outline-danger btn-lg border-2 px-4 py-3 mt-2" style="border-radius: 12px; transition: all 0.3s ease;" (click)="logout()">
            Keluar (Logout)
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .btn-primary {
      transition: all 0.3s ease;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3) !important;
    }
    .btn-outline-danger {
      transition: all 0.3s ease;
    }
    .btn-outline-danger:hover {
      transform: translateY(-2px);
    }
  `]
})
export class DummyHomeComponent {
  goToDashboard() {
    window.location.href = '/list-employee';
  }

  logout() {
    localStorage.removeItem('access_token');
    window.location.reload();
  }
}

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [authGuard],
    component: DummyHomeComponent,
    title: 'Home',
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadChildren: () =>
      import('./remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'list-employee',
    redirectTo: '',
  },
  {
    path: '**',
    redirectTo: '',
  }
];
