import { OnInit, OnDestroy, Component, Injectable, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { UserService } from './services/user.service';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav', { static: true }) sidenav: ElementRef;

  selectedLang: string;

  langs: any = {
    'pt': 'Portuguese',
    'en': 'English'
  };

  langCodes: any = {
    'English': 'en',
    'Portuguese': 'pt'
  };

  showGoToTop: boolean;

  sub: Subscription;

  tag: string;
  tagStatistics: boolean;
  website: string;
  websiteStatistics: boolean;
  tagError: string;
  websiteError: string;
  page: string;
  pageEle: string;
  pageCode: boolean;

  constructor(
    public el: ElementRef,
    public user: UserService,
    public translate: TranslateService,
    private location: Location,
    private router: Router
  ) {
    this.translate.addLangs(_.values(this.langs));
    this.translate.setDefaultLang('Portuguese');

    const lang = localStorage.getItem('language');

    if (!lang) {
      const browserLang = translate.getBrowserLang();
      const use = _.includes(_.keys(this.langs), browserLang) ? this.langs[browserLang] : 'Portuguese';

      this.translate.use(use);
      localStorage.setItem('language', use);
    } else {
      this.translate.use(lang);
    }

    this.selectedLang = this.translate.currentLang;

    this.showGoToTop = false;

    this.tag = null;
    this.tagStatistics = false;
    this.website = null;
    this.websiteStatistics = false;
    this.tagError = null;
    this.websiteError = null;
    this.page = null;
    this.pageEle = null;
    this.pageCode = false;
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => {
      this.updateLanguage();
    });
    this.sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.tag = null;
        this.tagStatistics = false;
        this.website = null;
        this.websiteStatistics = false;
        this.tagError = null;
        this.websiteError = null;
        this.page = null;
        this.pageEle = null;
        this.pageCode = false;

        const path = this.location.path();
        const segments = _.split(path, '/');

        if (_.size(segments) > 2) {
          if (segments[3] === 'statistics') {
            if (segments[6] === 'statistics') {
              switch (_.size(segments)) {
                case 10:
                  if (segments[9] === 'code') {
                    this.pageCode = true;
                  } else {
                    this.pageEle = decodeURIComponent(segments[9]);
                  }
                case 9:
                  this.page = decodeURIComponent(segments[8]);
                case 8:
                  this.websiteError = decodeURIComponent(segments[7]);
                case 7:
                  this.websiteStatistics = true;
                case 6:
                  this.website = decodeURIComponent(segments[5]);
                case 5:
                  this.tagError = decodeURIComponent(segments[4]);
                case 4:
                  this.tagStatistics = true;
                case 3:
                  this.tag = decodeURIComponent(segments[2]);
                  break;
              }
            } else {
              switch (_.size(segments)) {
                case 8:
                  if (segments[7] === 'code') {
                    this.pageCode = true;
                  } else {
                    this.pageEle = decodeURIComponent(segments[7]);
                  }
                case 7:
                  this.page = decodeURIComponent(segments[6]);
                case 6:
                  this.website = decodeURIComponent(segments[5]);
                case 5:
                  this.tagError = decodeURIComponent(segments[4]);
                case 4:
                  this.tagStatistics = true;
                case 3:
                  this.tag = decodeURIComponent(segments[2]);
                  break;
              }
            }
          } else if (segments[4] === 'statistics') {
            switch (_.size(segments)) {
              case 8:
                if (segments[7] === 'code') {
                  this.pageCode = true;
                } else {
                  this.pageEle = decodeURIComponent(segments[7]);
                }
              case 7:
                this.page = decodeURIComponent(segments[6]);
              case 6:
                this.websiteError = decodeURIComponent(segments[5]);
              case 5:
                this.websiteStatistics = true;
              case 4:
                this.website = decodeURIComponent(segments[3]);
              case 3:
                this.tag = decodeURIComponent(segments[2]);
                break;
            }
          } else if (segments[2] !== 'settings') {
            switch (_.size(segments)) {
              case 6:
                if (segments[5] === 'code') {
                  this.pageCode = true;
                } else {
                  this.pageEle = decodeURIComponent(segments[5]);
                }
              case 5:
                this.page = decodeURIComponent(segments[4]);
              case 4:
                this.website = decodeURIComponent(segments[3]);
              case 3:
                this.tag = decodeURIComponent(segments[2]);
                break;
            }
          }
        }

        document.getElementById('main').scrollIntoView();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /**
   * Update the language in the lang attribute of the html element.
   */
  updateLanguage(): void {
    const lang = document.createAttribute('lang');
    lang.value = this.langCodes[this.translate.currentLang];
    this.el.nativeElement.parentElement.parentElement.attributes.setNamedItem(lang);
  }

  changeLanguage(): void {
    this.translate.use(this.selectedLang);
    localStorage.setItem('language', this.selectedLang);
    this.updateLanguage();
  }

  goToTop(): void {
    document.getElementById('main').scrollIntoView();
  }

  onScroll(e): void {
    if (e.srcElement.scrollTop > 300) {
      this.showGoToTop = true;
    } else {
      this.showGoToTop = false;
    }
  }
}
