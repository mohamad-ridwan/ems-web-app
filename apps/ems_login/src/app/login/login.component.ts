import { Component, inject } from '@angular/core';
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

  loginData = {
    username: '',
    password: '',
  };

  errorMessage = '';
  isLoading = false;

  onLogin() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.http.post<any>('http://localhost:3400/api/auth/login', this.loginData).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.access_token);
        this.isLoading = false;
        // Navigate to dashboard
        window.location.href = '/'; // Using window.location.href to ensure shell knows state changed if needed, or use router
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Login gagal. Periksa kembali username dan password Anda.';
      },
    });
  }
}
