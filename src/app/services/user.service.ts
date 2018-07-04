import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, retry, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';

import { CookieService } from 'ngx-cookie-service';
import { MessageService } from './message.service';

import { Response } from '../models/response';
import { AsError } from '../models/error';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router, 
    private cookieService: CookieService,
    private message: MessageService,
    private dialog: MatDialog
  ) { }

  login(email: string, password: string): Observable<boolean> {
    const app = 'studies';
    return ajax.post(this.getServer('/users/login'), {email, password, app}).pipe(
      retry(3),
      map(res => {
        if (!res.response || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }
        
        let response = new Response(res.response);

        if (response.hasError()) {
          throw new AsError(response.success, response.message);
        }

        const host = this.getEnv();
        const tomorrow = new Date();

        tomorrow.setDate(tomorrow.getDate() + 1);

        this.cookieService.set('AS-SSID', btoa(JSON.stringify(response.result)), tomorrow, '/', host, false);
        this.router.navigateByUrl('/user');
        return true;
      }),
      catchError((err: AsError) => {
        switch (err.code) {
          case -3: // error, password doesn't match
            this.message.show('LOGIN.messages.password_match');
            break;
          case -1: // user does exist but doesn't belong to this website
          case -2: // user doesn't exist
            this.message.show('LOGIN.messages.no_user');
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
    return this.cookieService.check('AS-SSID');
  }

  getUserData(): {} {
    return JSON.parse(atob(this.cookieService.get('AS-SSID')));
  }

  logout(location: string = '/'): void {
    const host = this.getEnv();

    this.cookieService.delete('AS-SSID');
    this.router.navigateByUrl(location);
  }

  private getEnv(): string {
    return _.split(location.host, ':')[0];
  }

  private getServer(service: string): string {
    const host = location.host;

    return 'http://' + _.split(host, ':')[0] + ':3000' + service;
  }
}