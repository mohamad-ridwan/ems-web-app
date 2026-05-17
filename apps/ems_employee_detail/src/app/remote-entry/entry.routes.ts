import { Route } from '@angular/router';
import { EmployeeDetailComponent } from '@org/ems_employee_detail';

export const remoteRoutes: Route[] = [
  { path: ':id', component: EmployeeDetailComponent, title: 'Detail Employee' }
];
