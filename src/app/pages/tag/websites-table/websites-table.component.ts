import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import * as _ from 'lodash';

import { Website } from '../../../models/website';

@Component({
  selector: 'app-websites-table',
  templateUrl: './websites-table.component.html',
  styleUrls: ['./websites-table.component.css']
})
export class WebsitesTableComponent implements OnInit {

  @Input('websites') websites: Array<Website>;
  @Input('tag') tag: string;

  @Output('removeWebsites') removeWebsites = new EventEmitter<Array<number>>();

  displayedColumns = [
    'Select',
    'Name',
    'Url',
    'Score',
    //'See'
  ];

  // column sorter
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: MatTableDataSource<Website>;
  selection: SelectionModel<Website>;

  constructor(private router: Router) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.websites);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.selection = new SelectionModel<Website>(true, []);
  }

  applyFilter(filterValue: string): void {
    filterValue = _.trim(filterValue);
    filterValue = _.toLower(filterValue);
    this.dataSource.filter = filterValue;
  }

  deleteWebsites(): void {
    const websitesId = _.map(this.selection.selected, 'WebsiteId');
    this.removeWebsites.next(websitesId);
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
