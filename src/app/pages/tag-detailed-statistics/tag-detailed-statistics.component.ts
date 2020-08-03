import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { StudiesService } from '../../services/studies.service';

import { Tag } from '../../models/tag';
import { Website } from '../../models/website';

@Component({
  selector: 'app-tag-detailed-statistics',
  templateUrl: './tag-detailed-statistics.component.html',
  styleUrls: ['./tag-detailed-statistics.component.css']
})
export class TagDetailedStatisticsComponent implements OnInit, OnDestroy {

  sub: Subscription;

  loading: boolean;
  error: boolean;

  tag: string;

  tagObject: Tag;

  pages: Array<any>;

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

      this.studies.getUserTagWebsitesData(this.tag)
        .subscribe(pages => {
          if (pages === null) {
            this.error = true;
          } else {
            this.pages = pages;

            this.tagObject = this.createTag(_.clone(this.pages));
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

  private createTag(pages: any): Tag {
    const newTag = new Tag();
    const tmpWebsitesIds = new Array<number>();
    const websites = new Array<any>();
    for (const wb of pages || []) {
      if (!tmpWebsitesIds.includes(wb.WebsiteId)) {
        tmpWebsitesIds.push(wb.WebsiteId);
        websites.push(wb.WebsiteId);
      }
    }
    
    for (const website of websites || []) {
      const newWebsite = this.createWebsite(website, pages);
      newTag.addWebsite(newWebsite);
    }

    return newTag;
  }

  private createWebsite(website: any, _pages: any): Website {
    const newWebsite = new Website();

    const pages = new Array<any>();
    _pages.map((p: any) => {
      if (p.WebsiteId === website) {
        pages.push({
          pageId: p.PageId,
          uri: p.Uri,
          score: parseFloat(p.Score),
          errors: p.Errors,
          tot: p.Tot,
          A: p.A,
          AA: p.AA,
          AAA: p.AAA,
          evaluation_date: p.Evaluation_Date
        });
      }
    });

    for (const page of pages || []) {
      this.addPageToWebsite(newWebsite, page);
    }

    return newWebsite;
  }

  private addPageToWebsite(website: any, page: any): void {
    website.addPage(
      page.score,
      page.errors,
      page.tot,
      page.A,
      page.AA,
      page.AAA,
      page.evaluation_date
    );
  }
}
