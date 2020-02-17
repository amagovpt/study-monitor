import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';

import { CreateCategoryDialogComponent } from '../../dialogs/create-category-dialog/create-category-dialog.component';
import { RemoveTagsConfirmationDialogComponent } from '../../dialogs/remove-tags-confirmation-dialog/remove-tags-confirmation-dialog.component';

import { StudiesService } from '../../services/studies.service';
import { MessageService } from '../../services/message.service';

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
    'Select',
    'Name',
    'Websites',
    'Pages',
    //'See'
  ];

  // column sorter
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Tag>;
  selection: SelectionModel<Tag>;

  constructor(
    private studies: StudiesService,
    private message: MessageService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
    this.selection = new SelectionModel<Tag>(true, []);
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
        this.cd.detectChanges();
      });
  }

  applyFilter(filterValue: string): void {
    filterValue = _.trim(filterValue);
    filterValue = _.toLower(filterValue);
    this.dataSource.filter = filterValue;
  }

  openCreateCategoryDialog(): void {
    this.dialog.open(CreateCategoryDialogComponent, {
      width: '40vw'
    });
  }

  deleteTags(): void {
    const tagsId = _.map(this.selection.selected, 'TagId');

    const dialogRef = this.dialog.open(RemoveTagsConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.loading = true;
        this.studies.removeTags(tagsId)
          .subscribe(tags => {
            if (tags === null) {
              this.error = true;
            } else {
              this.message.show('TAGS.remove_success_message');
              this.tags = tags;
              this.dataSource = new MatTableDataSource(this.tags);
              this.dataSource.sort = this.sort;
              this.selection.clear();
            }

            this.loading = false;
            this.cd.detectChanges();
          });
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
