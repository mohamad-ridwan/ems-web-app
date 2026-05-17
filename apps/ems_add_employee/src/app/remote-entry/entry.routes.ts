import { Route } from '@angular/router';
import { EmployeeAddComponent } from '../add-employee/employee-add/employee-add.component';

export const remoteRoutes: Route[] = [{ path: '', component: EmployeeAddComponent, title: 'Add Employee' }];
