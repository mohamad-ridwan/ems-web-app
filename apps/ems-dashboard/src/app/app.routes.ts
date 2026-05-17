import { Route } from '@angular/router';
import { authGuard } from './auth.guard';
import { guestGuard } from './guest.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'detail-employee',
        loadChildren: () =>
          import('ems_employee_detail/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: 'list-employee',
        loadChildren: () =>
          import('ems_list_employee/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: 'add-employee',
        loadChildren: () =>
          import('ems_add_employee/Routes').then((m) => m!.remoteRoutes),
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
    loadChildren: () => import('ems_login/Routes').then((m) => m!.remoteRoutes),
    canActivate: [guestGuard],
  },
];
