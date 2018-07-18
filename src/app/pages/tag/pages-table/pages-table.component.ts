import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
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

  displayedColumns = [
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

  constructor(private router: Router,) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.pages);
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    filterValue = _.trim(filterValue);
    filterValue = _.toLower(filterValue);
    this.dataSource.filter = filterValue;
  }

  showPage(page: string): void {
    this.router.navigateByUrl(`["/user", "${this.tag}", "${page}"]`);
  }
}
