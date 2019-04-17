import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { StudiesService } from '../../services/studies.service';

import { Page } from '../../models/page';

@Component({
  selector: 'app-website-detailed-statistics',
  templateUrl: './website-detailed-statistics.component.html',
  styleUrls: ['./website-detailed-statistics.component.css']
})
export class WebsiteDetailedStatisticsComponent implements OnInit, OnDestroy {

  sub: Subscription;

  loading: boolean;
  error: boolean;

  tag: string;
  website: string;

  pages: Array<Page>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private studies: StudiesService,
    private cd: ChangeDetectorRef
  ) {
    this.error = false;
    this.loading = true;
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.tag = params.tag;
      this.website = params.website;

      this.studies.getUserTagWebsitePagesData(this.tag, this.website)
        .subscribe(pages => {
          if (pages === null) {
            this.error = true;
          } else {
            this.pages = pages;
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
