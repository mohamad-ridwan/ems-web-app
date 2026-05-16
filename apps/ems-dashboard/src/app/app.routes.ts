import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';
import { authGuard } from './auth.guard';

export const appRoutes: Route[] = [
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
