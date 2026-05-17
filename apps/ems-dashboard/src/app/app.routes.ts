import { Route } from '@angular/router';
import { authGuard } from './auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'detail-employee',
    loadChildren: () =>
      import('ems_employee_detail/Routes').then((m) => m!.remoteRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'list-employee',
    loadChildren: () =>
      import('ems_list_employee/Routes').then((m) => m!.remoteRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'add-employee',
    loadChildren: () =>
      import('ems_add_employee/Routes').then((m) => m!.remoteRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('ems_login/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    redirectTo: 'list-employee',
    pathMatch: 'full',
  },
];
