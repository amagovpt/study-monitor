import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';

import { RemovePagesConfirmationDialogComponent } from '../../dialogs/remove-pages-confirmation-dialog/remove-pages-confirmation-dialog.component';
import { BackgroundEvaluationsInformationDialogComponent } from '../../dialogs/background-evaluations-information-dialog/background-evaluations-information-dialog.component';

import { StudiesService } from '../../services/studies.service';
import { MessageService } from '../../services/message.service';

import { Page } from '../../models/page';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit, OnDestroy {

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
    private message: MessageService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
    this.error = false;
    this.loading = true;
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.tag = params.tag;
      this.website = params.website;

      this.studies.getUserTagWebsitePages(this.tag, this.website)
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

  addPages(data): void {
    /*this.loading = true;
    this.studies.addTagWebsitePages(this.tag, this.website, data.domain, data.urls)
      .subscribe(pages => {
        if (pages) {
          this.message.show('ADD_PAGES.success_message');
          this.pages = pages;
        }

        this.loading = false;
        this.cd.detectChanges();
      });*/
      this.studies.addTagWebsitePages(this.tag, this.website, data.domain, data.urls)
      .subscribe(result => {
        if (result) {
          this.dialog.open(BackgroundEvaluationsInformationDialogComponent, { width: '40vw' })
        } else {
          alert('Error');
        }
      });
  }

  removePages(pagesId): void {
    const dialogRef = this.dialog.open(RemovePagesConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.loading = true;
        this.cd.detectChanges();

        this.studies.removePages(this.tag, this.website, pagesId)
          .subscribe(pages => {
            if (pages === null) {
              this.error = true;
            } else {
              this.message.show('PAGES.remove_success_message');
              this.pages = pages;
            }

            this.loading = false;
            this.cd.detectChanges();
          });
      }
    });
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
