import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, retry, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ConfigService } from './config.service';
import { UserService } from './user.service';
import { MessageService } from './message.service';

import { Response } from '../models/response';
import { Tag } from '../models/tag';
import { Website } from '../models/website';
import { Page } from '../models/page';
import { AsError } from '../models/error';

import { AddPagesErrorsDialogComponent } from '../dialogs/add-pages-errors-dialog/add-pages-errors-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class StudiesService {

  constructor(
    private readonly router: Router,
    private readonly user: UserService,
    private readonly http: HttpClient,
    private readonly message: MessageService,
    private readonly config: ConfigService,
    private readonly dialog: MatDialog
  ) { }

  getUserTags(): Observable<Array<Tag>> {
    return this.http.get<any>(this.config.getServer('/tag/studyMonitor'), {observe: 'response'}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.body;

        if (!res.body || res.status === 404) {
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
    return ajax.post(this.config.getServer('/study/user/tag/websites'), {tag, cookie: this.user.getUserData()}).pipe(
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
        if (err.code === -1) {
          this.router.navigateByUrl('/user');
        }
        console.log(err);
        return of(null);
      })
    );
  }

  getUserTagWebsitesData(tag: string): Observable<Array<any>> {
    return ajax.post(this.config.getServer('/study/user/tag/websitesData'), {tag, cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message);
        }

        return <Array<any>> response.result;
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  getUserTagWebsitePages(tag: string, website: string): Observable<Array<Page>> {
    return ajax.post(this.config.getServer('/study/user/tag/website/pages'), {tag, website, cookie: this.user.getUserData()}).pipe(
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
        if (err.code === -1) {
          this.router.navigateByUrl('/user/' + tag);
        }
        console.log(err);
        return of(null);
      })
    );
  }

  getUserTagWebsitePagesData(tag: string, website: string): Observable<Array<Page>> {
    return ajax.post(this.config.getServer('/study/user/tag/website/pagesData'), {tag, website, cookie: this.user.getUserData()}).pipe(
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

  getUserWebsitesFromOtherTags(tag: string): Observable<Array<Website>> {
    return ajax.post(this.config.getServer('/study/user/websites/otherTags'), {tag, cookie: this.user.getUserData()}).pipe(
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

  getOfficialTags(): Observable<Array<Tag>> {
    return this.http.get<any>(this.config.getServer('/tag/allOfficial'), {observe: 'response'}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.body;

        if (!res.body || res.status === 404) {
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

  createTag(type, tagsId, user_tag_name): Observable<number> {
    const body = {
      type,
      tagsId: JSON.stringify(tagsId),
      user_tag_name
    };
    return this.http.post(this.config.getServer('/tag/user/create'), body, {observe: 'response'}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.body;

        if (!res.body || res.status === 404) {
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
    return this.http.get<any>(this.config.getServer('/user/tag/nameExists/' + name), {observe: 'response'}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.body;

        if (!res.body || res.status === 404) {
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
    return ajax.post(this.config.getServer('/study/user/removeTags'), {tagsId: JSON.stringify(tagsId), cookie: this.user.getUserData()}).pipe(
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
    return ajax.post(this.config.getServer('/study/user/tag/website/nameExists'), {tag, name, cookie: this.user.getUserData()}).pipe(
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
    return ajax.post(this.config.getServer('/study/user/tag/website/domainExists'), {tag, domain, cookie: this.user.getUserData()}).pipe(
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

  addExistingTagWebsite(tag: string, websitesId: Array<number>): Observable<Array<Website>> {
    return ajax.post(this.config.getServer('/study/user/tag/addExistingWebsite'), {tag, websitesId: JSON.stringify(websitesId), cookie: this.user.getUserData()}).pipe(
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
          this.message.show('ADD_WEBSITE.new.error_message');
        }
        return of(null);
      })
    );
  }

  addNewTagWebsite(tag: string, name: string, domain: string, pages: Array<string>): Observable<Array<Website>> {
    return ajax.post(this.config.getServer('/study/user/tag/addNewWebsite'), {tag, name, domain, pages: JSON.stringify(pages), cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message, 'NORMAL', response.errors, response.result);
        }

        return <Array<Website>> response.result;
      }),
      catchError(err => {
        if (err.code === 0) {
          this.dialog.open(AddPagesErrorsDialogComponent, {
            data: err.errors
          });
          return of(err.result);
        } else {
          console.log(err);
          this.message.show('MISC.unexpected_error');
          return of(null);
        }
      })
    );
  }

  removeWebsites(tag: string, websitesId: Array<number>): Observable<Array<Website>> {
    return ajax.post(this.config.getServer('/study/user/tag/removeWebsites'), {tag, websitesId: JSON.stringify(websitesId), cookie: this.user.getUserData()}).pipe(
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
    return ajax.post(this.config.getServer('/study/user/tag/website/domain'), {tag, website, cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message);
        }

        return <string> response.result;
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

  addTagWebsitePages(tag: string, website: string, domain: string, pages: Array<string>): Observable<Array<Page>> {
    return ajax.post(this.config.getServer('/study/user/tag/website/addPages'), {tag, website, domain, pages: JSON.stringify(pages), cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message, 'NORMAL', response.errors, response.result);
        }

        return <Array<Page>> response.result;
      }),
      catchError(err => {
        if (err.code === 0) {
          this.dialog.open(AddPagesErrorsDialogComponent, {
            data: err.errors
          });
          return of(err.result);
        } else {
          console.log(err);
          this.message.show('MISC.unexpected_error');
          return of(null);
        }
      })
    );
  }

  removePages(tag: string, website: string, pagesId: Array<number>): Observable<Array<Page>> {
    return ajax.post(this.config.getServer('/study/user/tag/website/removePages'), {tag, website, pagesId: JSON.stringify(pagesId), cookie: this.user.getUserData()}).pipe(
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

  changePassword(password: string, newPassword: string, confirmPassword: string): Observable<boolean> {
    return ajax.post(this.config.getServer('/study/user/changePassword'), {password, newPassword, confirmPassword, cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message);
        }

        return <boolean> response.result;
      }),
      catchError(err => {
        if (err.code === -1) {
          this.message.show('SETTINGS.change_password.old_password_match_error');
        }
        console.log(err);
        return of(null);
      })
    );
  }
}
