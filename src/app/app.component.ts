import { OnInit, Component, Injectable, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import * as _ from 'lodash';

import { UserService } from './services/user.service';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav') sidenav: ElementRef;

  @ViewChild('scrollRef') scrollRef: any;

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

  constructor(
    public el: ElementRef,
    public user: UserService,
    private translate: TranslateService
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
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => {
      this.updateLanguage();
    });
  }

  ngAfterViewInit(): void {
    merge(this.scrollRef.directiveRef.PS_SCROLL_DOWN, this.scrollRef.directiveRef.PS_SCROLL_UP)
      .subscribe(() => {
        const y = this.scrollRef.directiveRef.geometry().y;

        if (y > 300) {
          this.showGoToTop = true;
        } else {
          this.showGoToTop = false;
        }
      });
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
    this.scrollRef.directiveRef.scrollToTop(0, 250);
  }
}
