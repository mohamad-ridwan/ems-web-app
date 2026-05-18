import { Component } from '@angular/core';
import { EmsLoginRootComponent } from '@org/ems_login';

@Component({
  imports: [EmsLoginRootComponent],
  selector: 'app-ems-login-entry',
  template: `<app-ems-login-root></app-ems-login-root>`,
})
export class RemoteEntry {}
