import { Component, signal, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AppViewModel } from '@org/ems-dashboard';
import { SidebarComponent } from '@org/ui-kit';

@Component({
  selector: 'app-ems-login-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.view.html',
  styleUrl: './app.view.scss',
})
export class EmsLoginRootComponent {
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
