import { Route } from '@angular/router';
import { EmployeeListComponent } from '../employee-list/employee-list/employee-list.component';

export const remoteRoutes: Route[] = [
  { path: '', component: EmployeeListComponent },
];