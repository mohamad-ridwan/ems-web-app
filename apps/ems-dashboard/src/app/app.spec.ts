import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Router, provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { authReducer } from '@org/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dummy',
  standalone: true,
  template: '<h1>List Employee Page</h1>'
})
class DummyComponent {}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App,
      ],
      providers: [
        provideHttpClient(),
        provideStore({ auth: authReducer }),
        provideRouter([
          {
            path: 'list-employee',
            component: DummyComponent,
          },
          {
            path: '',
            redirectTo: 'list-employee',
            pathMatch: 'full',
          }
        ]),
      ]
    }).compileComponents();
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
});
