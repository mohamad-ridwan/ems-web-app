import { Component, signal, inject, effect } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AppViewModel } from '@org/ems-dashboard';
import { SidebarComponent, PopupNotificationComponent, PopupNotificationService } from '@org/ui-kit';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-sidebar-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, PopupNotificationComponent,RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarLayoutComponent {
  public readonly vm = inject(AppViewModel);
  public readonly notificationService = inject(PopupNotificationService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  isLoginPage = signal(false);
  public readonly pageTitle = signal<string>('Portal');

  constructor() {
    this.checkIsLoginPage(this.router.url);
    this.updatePageTitle();

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe((event: NavigationEnd) => {
        this.checkIsLoginPage(event.urlAfterRedirects);
        this.updatePageTitle();
      });
  }

  private checkIsLoginPage(url: string) {
    this.isLoginPage.set(url.includes('/login'));
  }

  private updatePageTitle() {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const title = route.snapshot.title || 'Portal';
    this.pageTitle.set(title);
  }
}
