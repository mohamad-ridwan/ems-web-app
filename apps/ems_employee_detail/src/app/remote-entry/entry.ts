import { Component } from '@angular/core';
import { EmsEmployeeDetailRootComponent } from '@org/ems_employee_detail';

@Component({
  imports: [EmsEmployeeDetailRootComponent],
  selector: 'app-ems-employee-detail-entry',
  template: `<app-ems-employee-detail-root></app-ems-employee-detail-root>`,
})
export class RemoteEntry {}

