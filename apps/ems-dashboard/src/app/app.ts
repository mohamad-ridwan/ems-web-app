import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  isSidebarOpen = signal(false);

  constructor(private router: Router) {}
  protected title = 'ems-dashboard';

  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
