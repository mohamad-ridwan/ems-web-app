import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  isLoading = signal<boolean>(false)
  errorMessage = signal<string>('')
  
  loginData = {
    username: '',
    password: '',
  };

  onLogin() {
    this.isLoading.set(true);
    this.errorMessage.set('')
    
    this.http.post<any>('http://localhost:3400/api/auth/login', this.loginData).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.access_token);
        this.isLoading.update(() => false);
        window.location.href = '/';
      },
      error: (err) => {
        this.isLoading.update(() => false);
        if (err.status === 401) {
          this.errorMessage.update(() => 'Username atau password salah.');
        } else if (err.status === 500) {
          this.errorMessage.update(() => 'Terjadi kesalahan pada server. Silakan coba lagi nanti.');
        } else if (err.status === 0) {
          this.errorMessage.update(() => 'Tidak dapat terhubung ke server. Pastikan koneksi internet Anda aktif.');
        } else {
          this.errorMessage = err.error?.message || 'Terjadi kesalahan saat login.';
        }
        console.error('Login error:', err);
      },
    });
  }
}
