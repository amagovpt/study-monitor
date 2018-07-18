import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, retry, catchError } from 'rxjs/operators';
import * as _ from 'lodash';

import { UserService } from './user.service';
import { MessageService } from './message.service';

import { Response } from '../models/response';
import { Tag } from '../models/tag';
import { Page } from '../models/page';
import { AsError } from '../models/error';

@Injectable({
  providedIn: 'root'
})
export class StudiesService {

  constructor(
    private user: UserService,
    private message: MessageService
  ) { }

  getUserTags(): Observable<Array<Tag>> {
    return ajax.post(this.getServer('/studies/user/tag'), {cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message);
        }

        return <Array<Tag>> response.result;
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  getUserTagPages(tag: string): Observable<Array<Page>> {
    return ajax.post(this.getServer('/studies/user/tag/pages'), {tag, cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message);
        }

        return <Array<Page>> response.result;
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  getOfficialTags(): Observable<Array<Tag>> {
    return ajax(this.getServer('/tags/allOfficial')).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message);
        }

        return <Array<Tag>> response.result;
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  createTag(type, official_tag_id, user_tag_name): Observable<number> {
    const body = {
      type,
      official_tag_id,
      user_tag_name,
      cookie: this.user.getUserData()
    };
    return ajax.post(this.getServer('/studies/create/tag'), body).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message);
        }

        return <number> response.result;
      }),
      catchError(err => {
        console.log(err);
        return of(-1);
      })
    );
  }

  private getServer(service: string): string {
    const host = location.host;

    return 'http://' + _.split(host, ':')[0] + ':3000' + service;
  }
}
