import { Route } from '@angular/router';
import { authGuard, guestGuard } from '@org/ems-dashboard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadChildren: () =>
      import('./remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'list-employee',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@org/ems_list_employee').then((m) => m.EmployeeListComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list-employee',
  },
];
