import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { StudiesService } from '../../services/studies.service';

import { Page } from '../../models/page';

@Component({
  selector: 'app-website-list-pages-error',
  templateUrl: './website-list-pages-error.component.html',
  styleUrls: ['./website-list-pages-error.component.css']
})
export class WebsiteListPagesErrorComponent implements OnInit, OnDestroy {

  sub: Subscription;

  loading: boolean;
  error: boolean;

  tag: string;
  website: string;
  websiteError: string;
  eleError: string;
  qLower: number;
  qUpper: number;

  pages: Array<Page>;
  list: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private studies: StudiesService,
    private cd: ChangeDetectorRef
  ) {
    this.list = [];
    this.error = false;
    this.loading = true;

    this.eleError = null;
    this.websiteError = null;
    this.qLower = 0;
    this.qUpper = 0;
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.tag = params.tag;
      this.website = params.website;

      this.websiteError = params.websiteError;
      const error = _.split(params.websiteError, ':');
      this.eleError = error[0];

      const range = _.split(error[1], '-');
      this.qLower = parseInt(range[0], 0);
      this.qUpper = parseInt(range[1], 0);

      this.studies.getUserTagWebsitePagesData(this.tag, this.website)
        .subscribe(pages => {
          if (pages === null) {
            this.error = true;
          } else {
            this.pages = pages;
            const tmp = [];
            for (const p of this.pages) {
              const e = JSON.parse(atob(p.Tot)).elems;

              if (e[this.eleError] && e[this.eleError] >= this.qLower && e[this.eleError] <= this.qUpper) {
                tmp.push({
                  url: p.Uri,
                  n: e[this.eleError]
                });
              }
            }

            this.list = tmp;
          }

          this.loading = false;
          this.cd.detectChanges();
        });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getUriRoute(uri: string): Array<string> {
    const path = this.location.path();
    let segments = _.split(path, '/');
    segments[0] = '/user';
    segments.splice(1, 1);
    segments.push(uri);
    segments = _.map(segments, s => decodeURIComponent(s));

    return segments;
  }

  goBack(): Array<string> {
    const path = this.location.path();
    let segments = _.split(path, '/');
    segments[0] = '/user';
    segments.splice(1, 1);
    segments.splice(_.size(segments) - 1, 1);
    segments = _.map(segments, s => decodeURIComponent(s));

    return segments;
  }
}
