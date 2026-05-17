import { Component, signal, inject } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppViewModel } from './app.viewmodel';
import { NotificationComponent, NotificationService } from '@org/shared-theme';

@Component({
  imports: [RouterModule, NotificationComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public readonly vm = inject(AppViewModel);
  public readonly notificationService = inject(NotificationService);
  isSidebarOpen = signal(false);
  isLoginPage = signal(false);
  isDropdownOpen = signal(false);

  constructor(private router: Router) {
    // Initial check in case navigation already completed or on direct page load
    this.checkIsLoginPage(this.router.url);

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkIsLoginPage(event.urlAfterRedirects);
    });
  }
  protected title = 'ems-dashboard';

  private checkIsLoginPage(url: string) {
    this.isLoginPage.set(url.includes('/login'));
  }

  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }
}
