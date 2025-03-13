import { Routes } from '@angular/router';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { BlankComponent } from './layouts/blank/blank.component';
import { LogoutComponent } from './pages/authentication/logout/logout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [isLoggedInGuard],
    loadComponent: () => import('./shared/components/home-component/home-component.component').then(c => c.HomeComponentComponent),
  },
  {
    path: 'dash',
    canActivate: [isLoggedInGuard],
    loadComponent: () => import('./shared/components/dash-component/dash-component.component').then(c => c.DashComponentComponent),
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },

  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./pages/authentication/authentication.routes').then(m => m.AuthenticationRoutes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
