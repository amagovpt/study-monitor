import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { StudiesService } from '../../services/studies.service';

@Component({
  selector: 'app-tag-list-websites-error',
  templateUrl: './tag-list-websites-error.component.html',
  styleUrls: ['./tag-list-websites-error.component.css']
})
export class TagListWebsitesErrorComponent implements OnInit, OnDestroy {

  sub: Subscription;

  loading: boolean;
  error: boolean;

  tag: string;
  websiteError: string;
  eleError: string;
  qLower: number;
  qUpper: number;

  pages: Array<any>;
  listKeys: Array<string>;
  list: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private studies: StudiesService,
    private cd: ChangeDetectorRef
  ) {
    this.list = {};
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

      this.websiteError = params.tagError;
      const error = _.split(params.tagError, ':');
      this.eleError = error[0];

      const range = _.split(error[1], '-');
      this.qLower = parseInt(range[0], 0);
      this.qUpper = parseInt(range[1], 0);

      this.studies.getUserTagWebsitesData(this.tag)
        .subscribe(pages => {

          if (pages === null) {
            this.error = true;
          } else {
            this.pages = pages;

            const websites = _.groupBy(this.pages, 'Name');

            const list = {};

            for (const w in websites) {
              if (w) {
                for (const p of websites[w]) {
                  const e = JSON.parse(atob(p.Tot)).elems;
                  if (e[this.eleError]) {
                    if (!list[p.Name]) {
                      list[p.Name] = [];
                    }
                    list[p.Name].push({
                      url: p.Uri,
                      n: e[this.eleError]
                    });
                  }
                }
              }
            }

            for (const w in list) {
              if (w) {
                const l = list[w].length;
                if (l < this.qLower || l > this.qUpper) {
                  delete list[w];
                }
              }
            }

            this.listKeys = _.keys(list);
            this.list = list;
          }

          this.loading = false;
          this.cd.detectChanges();
        });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
