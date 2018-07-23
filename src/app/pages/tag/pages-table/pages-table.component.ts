import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import * as _ from 'lodash';

import { Page } from '../../../models/page';

@Component({
  selector: 'app-pages-table',
  templateUrl: './pages-table.component.html',
  styleUrls: ['./pages-table.component.css']
})
export class PagesTableComponent implements OnInit {

  @Input('pages') pages: Array<Page>;
  @Input('tag') tag: string;

  @Output('removePages') removePages = new EventEmitter<Array<number>>();

  displayedColumns = [
    'Select',
    'Uri',
    'Score',
    'A',
    'AA',
    'AAA',
    'Evaluation_Date',
    'See'
  ];

  // column sorter
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Page>;
  selection: SelectionModel<Page>;

  constructor(private router: Router) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.pages);
    this.dataSource.sort = this.sort;
    this.selection = new SelectionModel<Page>(true, []);
  }

  applyFilter(filterValue: string): void {
    filterValue = _.trim(filterValue);
    filterValue = _.toLower(filterValue);
    this.dataSource.filter = filterValue;
  }

  deletePages(): void {
    const pagesId = _.map(this.selection.selected, 'PageId');
    this.removePages.next(pagesId);
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
