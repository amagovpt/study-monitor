import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

import { ConfigService } from './config.service';
import { MessageService } from './message.service';

import { Response } from '../models/response';
import { AsError } from '../models/error';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly message: MessageService,
    private readonly config: ConfigService
  ) { }

  login(username: string, password: string): Observable<boolean> {
    const type = 'studies';
    return this.http.post<any>(this.config.getServer('/auth/login'), {username, password, type}, {observe: 'response'}).pipe(
      retry(3),
      map(res => {
        if (!res.body || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        const response = new Response(res.body);

        if (response.hasError()) {
          throw new AsError(response.success, response.message);
        }

        const cookie = response.result;
        const tomorrow = new Date();
        tomorrow.setTime(tomorrow.getTime() + 1 * 86400000);

        sessionStorage.setItem('SM-username', username);
        localStorage.setItem('SM-SSID', cookie);
        localStorage.setItem('expires-at', tomorrow.toString());

        this.router.navigateByUrl('/user');
        return true;
      }),
      catchError((err: AsError) => {
        switch (err.code) {
          case -1: // user doesn't exist
            this.message.show('LOGIN.messages.no_user');
            break;
          case -2: // error, password doesn't match
            this.message.show('LOGIN.messages.password_match');
            break;
          default:
            this.message.show('LOGIN.messages.system_error');
            break;
        }

        console.log(err);
        return of(false);
      })
    );
  }

  isUserLoggedIn(): boolean {
    const token = localStorage.getItem('SM-SSID');
    const expires = localStorage.getItem('expires-at');
    return token && new Date() < new Date(expires);
  }

  getUserData(): any {
    return localStorage.getItem('SM-SSID');
  }

  getUsername(): string {
    return sessionStorage.getItem('MM-username');
  }

  logout(location: string = '/'): Observable<boolean> {
    return this.http.post<any>(this.config.getServer('/auth/logout'), {}, {observe: 'response'}).pipe(
      retry(3),
      map(res => {
        if (!res.body || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        const response = new Response(res.body);

        if (response.hasError()) {
          throw new AsError(response.success, response.message);
        }

        sessionStorage.removeItem('SM-username');
        localStorage.removeItem('SM-SSID');
        localStorage.removeItem('expires-at');
        this.router.navigateByUrl(location);
        return true;
      }),
      catchError((err: AsError) => {
        switch (err.code) {
          case -1: // user doesn't exist
            this.message.show('LOGIN.messages.no_user');
            break;
          case -2: // error, password doesn't match
            this.message.show('LOGIN.messages.password_match');
            break;
          default:
            this.message.show('LOGIN.messages.system_error');
            break;
        }

        console.log(err);
        return of(false);
      })
    );
  }
}
