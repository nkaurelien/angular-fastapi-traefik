import { inject } from '@angular/core';
import { AuthService } from './../services/AuthService';
import { CanActivateFn } from '@angular/router';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (!authService.isLoggedIn()) {
    authService.redirectToLogin();
    return false;
  }
  return true;
};
/* eslint-enable @typescript-eslint/no-unused-vars */
