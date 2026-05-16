import { Route } from '@angular/router';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail/employee-detail.component';

export const remoteRoutes: Route[] = [
  { path: ':email', component: EmployeeDetailComponent }
];
