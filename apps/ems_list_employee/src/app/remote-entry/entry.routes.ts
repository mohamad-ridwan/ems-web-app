import { Route } from '@angular/router';
import { EmployeeListComponent } from '@org/ems_list_employee';

export const remoteRoutes: Route[] = [
  { path: '', component: EmployeeListComponent, title: 'List Employee' },
];
