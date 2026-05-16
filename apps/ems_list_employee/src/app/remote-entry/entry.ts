import { Component } from '@angular/core';
import { NxWelcome } from './nx-welcome';

@Component({
  imports: [NxWelcome],
  selector: 'app-ems_list_employee-entry',
  template: `<app-nx-welcome></app-nx-welcome>`
})
export class RemoteEntry {}
