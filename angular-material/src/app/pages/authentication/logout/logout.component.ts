import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { AuthService } from '../../../core/services/AuthService';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  template: '',
})
export class LogoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.logout();
    console.log('User is logged out');
    this.router.navigateByUrl('/');
  }
}
