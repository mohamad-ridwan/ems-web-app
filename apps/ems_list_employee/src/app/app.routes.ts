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
        children: [
          {
            path: ':id',
            loadComponent: () =>
              import('@org/ems_employee_detail').then(
                (m) => m.EmployeeDetailComponent
              ),
          },
        ],
      },
      {
        path: 'add-employee',
        title: 'Add Employee',
        loadComponent: () =>
          import('@org/ems_add_employee').then((m) => m.EmployeeAddComponent),
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
    loadComponent: () =>
      import('@org/ems_login').then((m) => m.LoginComponent),
    canActivate: [guestGuard],
  },
];
