import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, retry, catchError } from 'rxjs/operators';
import * as _ from 'lodash';

import { UserService } from './user.service';
import { MessageService } from './message.service';

import { Response } from '../models/response';
import { Tag } from '../models/tag';
import { Website } from '../models/website';
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
    return ajax.post(this.getServer('/studies/user/tags'), {cookie: this.user.getUserData()}).pipe(
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

  getUserTagWebsites(tag: string): Observable<Array<Website>> {
    return ajax.post(this.getServer('/studies/user/tag/websites'), {tag, cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message);
        }

        return <Array<Website>> response.result;
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  getUserTagWebsitePages(tag: string, website: string): Observable<Array<Page>> {
    return ajax.post(this.getServer('/studies/user/tag/website/pages'), {tag, website, cookie: this.user.getUserData()}).pipe(
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

  getUserTagWebsitePagesData(tag: string, website: string): Observable<Array<Page>> {
    return ajax.post(this.getServer('/studies/user/tag/website/pagesData'), {tag, website, cookie: this.user.getUserData()}).pipe(
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
    return ajax.post(this.getServer('/tags/allOfficial'), {cookie: this.user.getUserData()}).pipe(
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
        if (err.code === -17) {
          this.message.show('MISC.unexpected_error');
        } else {
          this.message.show('CREATE_TAG.error_message');
        }
        return of(-1);
      })
    );
  }

  userTagNameExists(name: string): Observable<any> {
    return ajax.post(this.getServer('/studies/user/tag/nameExists'), {name, cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message);
        }

        if (response.result) {
          return { 'notTakenName': true };
        } else {
          return null;
        }
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  removeTags(tagsId: Array<number>): Observable<Array<Tag>> {
    return ajax.post(this.getServer('/studies/user/removeTags'), {tagsId, cookie: this.user.getUserData()}).pipe(
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
        if (err.code === -17) {
          this.message.show('MISC.unexpected_error');
        } else {
          this.message.show('TAGS.remove_error_message');
        }
        return of(null);
      })
    );
  }

  checkWebsiteNameExists(tag: string, name: string): Observable<any> {
    return ajax.post(this.getServer('/studies/user/tag/website/nameExists'), {tag, name, cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message);
        }

        return response.result === true ? { takenName: true } : null;
      }),
      catchError(err => {
        console.log(err);
        if (err.code === -17) {
          this.message.show('MISC.unexpected_error');
        }
        return of({ takenNameError: true });
      })
    );
  }

  checkWebsiteDomainExists(tag: string, domain: string): Observable<any> {
    return ajax.post(this.getServer('/studies/user/tag/website/domainExists'), {tag, domain, cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message);
        }

        return response.result === true ? { takenDomain: true } : null;
      }),
      catchError(err => {
        console.log(err);
        if (err.code === -17) {
          this.message.show('MISC.unexpected_error');
        }
        return of({ takenDomainError: true });
      })
    );
  }

  addTagWebsite(tag: string, name: string, domain: string, pages: Array<string>): Observable<Array<Website>> {
    return ajax.post(this.getServer('/studies/user/tag/addWebsite'), {tag, name, domain, pages: JSON.stringify(pages), cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message);
        }

        return <Array<Website>> response.result;
      }),
      catchError(err => {
        console.log(err);
        if (err.code === -17) {
          this.message.show('MISC.unexpected_error');
        } else {
          this.message.show('ADD_WEBSITE.error_message');
        }
        return of(null);
      })
    );
  }

  removeWebsites(tag: string, websitesId: Array<number>): Observable<Array<Website>> {
    return ajax.post(this.getServer('/studies/user/tag/removeWebsites'), {tag, websitesId, cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message);
        }

        return <Array<Website>> response.result;
      }),
      catchError(err => {
        console.log(err);
        if (err.code === -17) {
          this.message.show('MISC.unexpected_error');
        } else {
          this.message.show('WEBSITES.remove_error_message');
        }
        return of(null);
      })
    );
  }

  getWebsiteDomain(tag: string, website: string): Observable<string> {
    return ajax.post(this.getServer('/studies/user/tag/website/domain'), {tag, website, cookie: this.user.getUserData()}).pipe(
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
        if (err.code === -17) {
          this.message.show('MISC.unexpected_error');
        }
        return of(null);
      })
    );
  }

  addTagWebsitePages(tag: string, website: string, pages: Array<string>): Observable<Array<Page>> {
    return ajax.post(this.getServer('/studies/user/tag/website/addPages'), {tag, website, pages: JSON.stringify(pages), cookie: this.user.getUserData()}).pipe(
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
        if (err.code === -17) {
          this.message.show('MISC.unexpected_error');
        } else {
          this.message.show('ADD_PAGES.error_message');
        }
        return of(null);
      })
    );
  } 

  removePages(tag: string, website: string, pagesId: Array<number>): Observable<Array<Page>> {
    return ajax.post(this.getServer('/studies/user/tag/website/removePages'), {tag, website, pagesId, cookie: this.user.getUserData()}).pipe(
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
        if (err.code === -17) {
          this.message.show('MISC.unexpected_error');
        } else {
          this.message.show('PAGES.remove_error_message');
        }
        return of(null);
      })
    );
  }

  private getServer(service: string): string {
    const host = location.host;

    return 'http://' + _.split(host, ':')[0] + ':3000' + service;
  }
}
