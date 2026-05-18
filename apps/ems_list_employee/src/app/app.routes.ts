/* eslint-disable @nx/enforce-module-boundaries */
import { Route } from '@angular/router';
import { authGuard, guestGuard } from '@org/ems-dashboard';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'detail-employee',
        title: 'Detail Employee',
        loadChildren: () =>
          import('ems_employee_detail/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: 'add-employee',
        title: 'Add Employee',
        loadChildren: () =>
          import('ems_add_employee/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: 'list-employee',
        title: 'List Employee',
        loadChildren: () =>
          import('./remote-entry/entry.routes').then((m) => m.remoteRoutes),
      },
      {
        path: '',
        redirectTo: 'list-employee',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    title: 'Login',
    loadChildren: () => import('ems_login/Routes').then((m) => m!.remoteRoutes),
    canActivate: [guestGuard],
  },
];
