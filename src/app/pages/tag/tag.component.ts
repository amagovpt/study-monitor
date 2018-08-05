import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';

import { RemoveWebsitesConfirmationDialogComponent } from '../../dialogs/remove-websites-confirmation-dialog/remove-websites-confirmation-dialog.component';

import { StudiesService } from '../../services/studies.service';
import { MessageService } from '../../services/message.service';

import { Website } from '../../models/website';

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
  websites: Array<Website>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studies: StudiesService,
    private message: MessageService,
    private dialog: MatDialog
  ) {
    this.error = false;
    this.loading = true;
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.tag = params.tag;

      this.studies.getUserTagWebsites(this.tag)
        .subscribe(websites => {
          if (websites === null) {
            this.error = true;
          } else {
            this.websites = websites;
          }

          this.loading = false;
        });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addExistingWebsite(data): void {
    this.loading = true;
    this.studies.addExistingTagWebsite(this.tag, data)
      .subscribe(websites => {
        if (websites) {
          this.message.show('ADD_WEBSITE.new.success_message');
          this.websites = websites;
        }

        this.loading = false;
      });
  }

  addNewWebsite(data): void {
    this.loading = true;
    this.studies.addNewTagWebsite(this.tag, data.name, data.domain, data.pages)
      .subscribe(websites => {
        if (websites) {
          this.message.show('ADD_WEBSITE.new.success_message');
          this.websites = websites;
        }

        this.loading = false;
      });
  }

  removeWebsites(websitesId): void {
    const dialogRef = this.dialog.open(RemoveWebsitesConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.loading = true;
        this.studies.removeWebsites(this.tag, websitesId)
          .subscribe(websites => {
            if (websites === null) {
              this.error = true;
            } else {
              this.message.show('WEBSITES.remove_success_message');
              this.websites = websites;
            }

            this.loading = false;
          });
      }
    });
  }
}
