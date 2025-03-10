import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/AuthService';

@Component({
  selector: 'app-login',
  imports: [
    // FormBuilder

        FormsModule,
        ReactiveFormsModule,
    ],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss'
})
export class LoginComponentComponent {
  form:FormGroup;

  constructor(private fb:FormBuilder,
               private authService: AuthService,
               private router: Router) {

      this.form = this.fb.group({
          email: ['',Validators.required],
          password: ['',Validators.required]
      });
  }

  login() {
      const val = this.form.value;

      if (val.email && val.password) {
          this.authService.login(val.email, val.password)
              .subscribe(
                  () => {
                      console.log("User is logged in");
                      this.router.navigateByUrl('/home');
                      // this.router.navigate(['/user']);
                  }
              );
      }
  }
}
