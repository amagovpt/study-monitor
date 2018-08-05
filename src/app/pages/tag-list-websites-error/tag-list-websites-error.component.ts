import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class TagListWebsitesErrorComponent implements OnInit {

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
    private studies: StudiesService
  ) {
    this.list = {};
    this.error = false;
    this.loading = true;

    this.eleError= null;
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

      let range = _.split(error[1], '-');
      this.qLower = range[0];
      this.qUpper = range[1];

      this.studies.getUserTagWebsitesData(this.tag)
        .subscribe(pages => {

          if (pages === null) {
            this.error = true;
          } else {
            this.pages = pages;

            let websites = _.groupBy(this.pages, 'Name');

            let list = {};

            for (let w in websites) {
              for (let p of websites[w]) {
                let e = JSON.parse(atob(p.Tot)).elems;

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

            for (let w in list) {
              let l = list[w].length;
              if (l < this.qLower || l > this.qUpper) {
                delete list[w];
              }
            }

            this.listKeys = _.keys(list);
            this.list = list; 
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
    segments = _.map(segments, s => decodeURIComponent(s));
    
    return segments;
  }
}
