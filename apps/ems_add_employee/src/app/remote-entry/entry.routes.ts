import { Route } from '@angular/router';
import { EmployeeAddComponent } from '@org/ems_add_employee';

export const remoteRoutes: Route[] = [{ path: '', component: EmployeeAddComponent, title: 'Add Employee' }];
