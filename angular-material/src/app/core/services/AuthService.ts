import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { User } from '../models/User';
import moment from 'moment';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  private loginUrl = `${environment.api_url}/login`;
  private userUrl = `${environment.api_url}/user`;

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(this.loginUrl, { email: username, username, password })
      .pipe(
        shareReplay(1) // Share the observable and replay the last emitted value to new subscribers
      )
      .pipe(
        tap((httpResponse: any) => {
          const decoded = jwtDecode(httpResponse.access_token);
          // console.log({ decoded });
          this.setSession({
            idToken: httpResponse.access_token,
            expiresIn: decoded.exp,
          });
        })
      );
  }

  user(): Observable<User> {
    return this.http
      .get<any>(this.userUrl)
      .pipe(
        tap(httpResponse => {
          console.log({ httpResponse });
        })
      )
      .pipe(
        map(httpResponse => {
          return {
            ...httpResponse.user_data,
          };
        })
      );
  }

  private setSession(authResult: { idToken: string; expiresIn: number | undefined }) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = '' + localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
