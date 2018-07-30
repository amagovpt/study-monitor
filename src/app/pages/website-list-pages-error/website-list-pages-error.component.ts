import { Component, OnInit, OnDestroy } from '@angular/core';
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
  eleError: string;

  pages: Array<Page>;
  list: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private studies: StudiesService
  ) {
    this.list = [];
    this.error = false;
    this.loading = true;
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.tag = params.tag;
      this.website = params.website;
      this.eleError = params.websiteError;

      this.studies.getUserTagWebsitePagesData(this.tag, this.website)
        .subscribe(pages => {
          if (pages === null) {
            this.error = true;
          } else {
            this.pages = pages;
            let tmp = [];
            for (let p of this.pages) {
              let e = JSON.parse(atob(p.Errors));

              if (e[this.eleError] && e[this.eleError] > 0) {
                tmp.push({
                  url: p.Uri,
                  n: e[this.eleError]
                });
              }
            }

            this.list = tmp; 
          }

          this.loading = false;
        });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goBack(): Array<string> {
    let path = this.location.path();
    let segments = _.split(path, '/');
    segments[0] = '/user';
    segments.splice(1, 1);
    segments.splice(_.size(segments)-1, 1);
    
    return segments;
  }
}
