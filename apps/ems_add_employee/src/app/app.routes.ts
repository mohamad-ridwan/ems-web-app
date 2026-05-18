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
        loadChildren: () =>
          import('./remote-entry/entry.routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'list-employee',
        title: 'List Employee',
        loadComponent: () =>
          import('@org/ems_list_employee').then((m) => m.EmployeeListComponent),
      },
      {
        path: '',
        redirectTo: 'add-employee',
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
