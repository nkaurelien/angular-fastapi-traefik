import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/AuthService';
import { User } from '../../../core/models/User';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-component',
  imports: [
    CommonModule
  ],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.scss'
})
export class HomeComponentComponent {

    public user$: Observable<User>;

    constructor(
      private authService: AuthService,
    ) {
        this.user$ = this.authService.user()

    }
}
