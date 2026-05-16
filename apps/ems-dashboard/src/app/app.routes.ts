import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';
import { authGuard } from './auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'list-employee',
    loadChildren: () => import('ems_list_employee/Routes').then(m => m!.remoteRoutes)
  },
  {
    path: 'add-employee',
    loadChildren: () =>
      import('ems_add_employee/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'login',
    loadChildren: () => import('ems_login/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcome,
    canActivate: [authGuard],
  },
];
