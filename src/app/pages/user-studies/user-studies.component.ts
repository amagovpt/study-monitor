import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';

import { CreateCategoryDialogComponent } from '../../dialogs/create-category-dialog/create-category-dialog.component';

import { StudiesService } from '../../services/studies.service';

import { Tag } from '../../models/tag';

@Component({
  selector: 'app-user-studies',
  templateUrl: './user-studies.component.html',
  styleUrls: ['./user-studies.component.css']
})
export class UserStudiesComponent implements OnInit {

  loading: boolean;
  error: boolean;

  tags: Array<Tag>;

  displayedColumns = [
    'Name',
    'Pages',
    'See'
  ];

  // column sorter
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Tag>;

  constructor(
    private router: Router,
    private studies: StudiesService,
    private dialog: MatDialog
  ) {
    this.loading = true;
    this.error = false;
  }

  ngOnInit() {
    this.studies.getUserTags()
      .subscribe(tags => {
        if (tags === null) {
          this.error = true;
        } else {
          this.tags = tags;
          this.dataSource = new MatTableDataSource(this.tags);
          this.dataSource.sort = this.sort;
        }
        
        this.loading = false;
      });
  }

  applyFilter(filterValue: string): void {
    filterValue = _.trim(filterValue);
    filterValue = _.toLower(filterValue);
    this.dataSource.filter = filterValue;
  }

  showTag(tagName: string): void {
    this.router.navigateByUrl('/user/' + tagName);
  }

  openCreateCategoryDialog(): void {
    this.dialog.open(CreateCategoryDialogComponent);
  }
}