import { Route } from '@angular/router';
import { authGuard, guestGuard } from '@org/ems-dashboard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadChildren: () =>
      import('./remote-entry/entry.routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'list-employee',
    canActivate: [authGuard],
    loadChildren: () =>
      import('ems_list_employee/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list-employee',
  },
];
