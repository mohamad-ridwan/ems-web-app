import { Component } from '@angular/core';
import { EmsListEmployeeRootComponent } from '@org/ems_list_employee';

@Component({
  imports: [EmsListEmployeeRootComponent],
  selector: 'app-ems-list-employee-entry',
  template: `<app-ems-list-employee-root></app-ems-list-employee-root>`,
})
export class RemoteEntry {}
