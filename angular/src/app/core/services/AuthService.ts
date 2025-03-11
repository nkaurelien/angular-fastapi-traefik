import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { User } from '../models/User';
import moment from 'moment';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private loginUrl = `${environment.api_url}/login`;

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(this.loginUrl, { username: email, email, password })
      .pipe(
        shareReplay(1) // Share the observable and replay the last emitted value to new subscribers
      ).pipe(
        tap((httpResponse) => console.log({ httpResponse }))
      ).pipe(
        tap((httpResponse: any) => {
          const decoded = jwtDecode(httpResponse.access_token);
          console.log({ decoded });
        })
      );
  }

  private setSession(authResult: any) {
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
}
