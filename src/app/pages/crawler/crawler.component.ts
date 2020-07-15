import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StudiesService } from '../../services/studies.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';

import { CrawlerResultsDialogComponent } from '../../dialogs/crawler-results-dialog/crawler-results-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BackgroundEvaluationsInformationDialogComponent } from 'src/app/dialogs/background-evaluations-information-dialog/background-evaluations-information-dialog.component';


@Component({
  selector: 'app-crawler',
  templateUrl: './crawler.component.html',
  styleUrls: ['./crawler.component.css']
})
export class CrawlerComponent implements OnInit {

  tags: Array<any>;
  filteredTags: Observable<any[]>;
  websites: Array<any>;

  dataSource: MatTableDataSource<any>;

  displayedColumns = [
    'Website',
    'Status',
    'Results',
    'Delete'
  ];

  loading: boolean;

  tagsSelect: FormControl;

  constructor(private studies: StudiesService, private cd: ChangeDetectorRef, private dialog: MatDialog) {
    this.loading = false;
    this.tagsSelect = new FormControl();
    this.studies.getUserTags()
      .subscribe(tags => {
        this.tags = tags;
        this.filteredTags = this.tagsSelect.valueChanges
          .pipe(
            startWith(null),
            map(val => this.filterTag(val))
          );
      });
  }

  ngOnInit() {}

  filterTag(val: any): any[] {
    return this.tags.filter(tag =>
      _.includes(_.toLower(tag.Name), _.toLower(val)));
  }

  searchWebsites(): void {
    this.loading = true;
    
    this.studies.getUserTagCrawledWebsites(this.tagsSelect.value)
      .subscribe(websites => {
        if (websites !== null) {
          this.websites = websites;
          this.dataSource = new MatTableDataSource(this.websites);
          console.log(websites)
        }
        this.loading = false;
        this.cd.detectChanges();
      });
  }

  openCrawlingResultsDialog(website: string, url: string, domain: number): void {
    const dialog = this.dialog.open(CrawlerResultsDialogComponent, {
      width: '60vw',
      data: {
        domain
      }
    });

    dialog.afterClosed().subscribe(data => {
      if (data) {
        this.studies.addTagWebsitePages(this.tagsSelect.value, website, url, data)
          .subscribe(success => {
            if (success) {
              this.dialog.open(BackgroundEvaluationsInformationDialogComponent);
            } else {
              alert('error');
            }
          });
        //this.addTagWebsitePages.next({ domain: this.domain, urls: data });
      }
    });
  }

  deleteCrawlingResults(domainId: number): void {
    this.studies.deleteCrawlingResults(domainId)
      .subscribe(result => {
        if (result) {
          const index = this.websites.findIndex(w => w.DomainId === domainId);
          this.websites = this.websites.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.websites);
          this.cd.detectChanges();
        } else {
          alert('Error');
        }
      });
  }
}
