import { Component, signal, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AppViewModel } from '@org/ems-dashboard';
import { SidebarComponent } from '@org/ui-kit';

@Component({
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  selector: 'app-ems-login-entry',
  template: `
    @if (!isLoginPage()) {
      <ems-sidebar
        [pageTitle]="pageTitle()"
        [user]="vm.user()"
        (logout)="vm.logout()"
      >
        <router-outlet></router-outlet>
      </ems-sidebar>
    } @else {
      <div class="main-content d-flex flex-column w-100" style="margin-left: 0">
        <main class="flex-grow-1" style="margin-top: 0">
          <router-outlet></router-outlet>
        </main>
      </div>
    }
  `,
})
export class RemoteEntry {
  public readonly vm = inject(AppViewModel);
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
