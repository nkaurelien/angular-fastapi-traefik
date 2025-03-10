import { Routes } from '@angular/router';
import { LoginComponentComponent } from './shared/components/login-component/login-component.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponentComponent
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./shared/components/home-component/home-component.component').then(c => c.HomeComponentComponent)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
