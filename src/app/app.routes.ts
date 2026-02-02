import { Routes } from '@angular/router';

import { Register } from './register/register';
import { Login } from './login/login';
import { DashboardLayout } from './dashboard-layout/dashboard-layout';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from '../auth.guard';

export const routes: Routes = [
  /**{ path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: '', component: DashboardLayout, children: [
      { path: 'dashboard', component: Dashboard }
    ],
    canActivate: [authGuard]
  }**/

  { path: 'login', component: Login },
  { path: 'register', component: Register },

  {
    path: '', component: DashboardLayout, children: [
      { path: 'dashboard', component: Dashboard}
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }


  /**,
  { path: 'dashboard', loadComponent: () =>
      import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  } */
];
