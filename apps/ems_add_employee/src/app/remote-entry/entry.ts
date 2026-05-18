import { Component } from '@angular/core';
import { EmsAddEmployeeRootComponent } from '@org/ems_add_employee';

@Component({
  imports: [EmsAddEmployeeRootComponent],
  selector: 'app-ems-add-employee-entry',
  template: `<app-ems-add-employee-root></app-ems-add-employee-root>`,
})
export class RemoteEntry {}

