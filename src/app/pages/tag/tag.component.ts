import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';

import { RemovePagesConfirmationDialogComponent } from '../../dialogs/remove-pages-confirmation-dialog/remove-pages-confirmation-dialog.component';

import { StudiesService } from '../../services/studies.service';
import { MessageService } from '../../services/message.service';

import { Page } from '../../models/page';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit, OnDestroy {

  sub: Subscription;

  loading: boolean;
  error: boolean;

  tag: string;
  pages: Array<Page>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studies: StudiesService,
    private message: MessageService,
    private dialog: MatDialog
  ) {
    this.error = false;
    this.loading = true;
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.tag = params.tag;

      this.studies.getUserTagPages(this.tag)
        .subscribe(pages => {
          if (pages === null) {
            this.error = true;
          } else {
            this.pages = pages;
          }

          this.loading = false;
        });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addPages(urls): void {
    this.loading = true;
    this.studies.addTagPages(this.tag, urls)
      .subscribe(pages => {
        if (pages) {
          this.message.show('ADD_PAGES.success_message');
          this.pages = pages;
        }

        this.loading = false;
      });
  }

  removePages(pagesId): void {
    const dialogRef = this.dialog.open(RemovePagesConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.loading = true;
        this.studies.removePages(this.tag, pagesId)
          .subscribe(pages => {
            if (pages === null) {
              this.error = true;
            } else {
              this.message.show('PAGES.remove_success_message');
              this.pages = pages;
            }

            this.loading = false;
          });
      }
    });
  }
}
