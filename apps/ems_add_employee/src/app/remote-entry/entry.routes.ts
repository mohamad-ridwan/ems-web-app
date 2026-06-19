import { Route } from '@angular/router';
import { EmployeeAddComponent, DemoXssComponent } from '@org/ems_add_employee';

export const remoteRoutes: Route[] = [
  { path: '', component: EmployeeAddComponent, title: 'Add Employee' },
  { path: 'demo-xss', component: DemoXssComponent, title: 'XSS & Security Demo' },
];
