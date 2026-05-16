import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(private router: Router) {}
  protected title = 'ems-dashboard';

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
