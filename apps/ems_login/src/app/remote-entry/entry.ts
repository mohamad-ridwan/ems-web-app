import { Component } from '@angular/core';
import { LoginComponent } from '@org/ems_login';

@Component({
  imports: [LoginComponent],
  selector: 'app-ems-login-entry',
  template: `<app-login></app-login>`,
})
export class RemoteEntry {}
