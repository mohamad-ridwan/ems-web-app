import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Router, provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { authReducer } from '@org/auth';
import { Component } from '@angular/core';
import { guestGuard } from './guest.guard';

@Component({
  selector: 'app-dummy',
  standalone: true,
  template: '<h1>List Employee Page</h1>',
})
class DummyComponent {}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideStore({ auth: authReducer }),
        provideRouter([
          {
            path: 'list-employee',
            component: DummyComponent,
          },
          {
            path: 'login',
            component: DummyComponent,
            canActivate: [guestGuard],
          },
          {
            path: '',
            redirectTo: 'list-employee',
            pathMatch: 'full',
          },
        ]),
      ],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ems-dashboard'`, () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ems-dashboard');
  });

  it('should redirect to list-employee page', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    await router.navigate(['']);
    await fixture.whenStable();
    expect(router.url).toBe('/list-employee');
  });

  describe('guestGuard', () => {
    it('should allow navigation to login if NOT logged in', async () => {
      const fixture = TestBed.createComponent(App);
      const router = TestBed.inject(Router);

      localStorage.removeItem('access_token');
      await router.navigate(['/login']);
      await fixture.whenStable();
      expect(router.url).toBe('/login');
    });

    it('should redirect to list-employee if already logged in', async () => {
      const fixture = TestBed.createComponent(App);
      const router = TestBed.inject(Router);

      localStorage.setItem('access_token', 'mock-token');
      await router.navigate(['/login']);
      await fixture.whenStable();
      expect(router.url).toBe('/list-employee');
    });
  });
});
