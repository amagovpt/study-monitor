import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-tag-statistics-errors',
  templateUrl: './tag-statistics-errors.component.html',
  styleUrls: ['./tag-statistics-errors.component.css']
})
export class TagStatisticsErrorsComponent implements OnInit {

  @Input('pages') pages: Array<any>;

  pagesErrorsA: number;
  pagesErrorsAA: number;
  pagesErrorsAAA: number;

  websitesErrorsA: number;
  websitesErrorsAA: number;
  websitesErrorsAAA: number;

  n_websites: number;

  constructor() {
    this.pagesErrorsA = 0;
    this.pagesErrorsAA = 0;
    this.pagesErrorsAAA = 0;

    this.websitesErrorsA = 0;
    this.websitesErrorsAA = 0;
    this.websitesErrorsAAA = 0;
  }

  ngOnInit(): void {
    const websites = _.groupBy(this.pages, 'Name');
    this.n_websites = _.size(websites);
    let countA = true, countAA = true, countAAA = true;
    for (const w in websites) {
      for (const p of websites[w]) {
        if (p.A > 0) {
          this.pagesErrorsA++;
          if (countA) {
            this.websitesErrorsA++;
            countA = false;
          }
        }
        if (p.AA > 0) {
          this.pagesErrorsAA++;
          if (countAA) {
            this.websitesErrorsAA++;
            countAA = false;
          }
        }
        if (p.AAA > 0) {
          this.pagesErrorsAAA++;
          if (countAAA) {
            this.websitesErrorsAAA++;
            countAAA = false;
          }
        }
      }
      countA = true;
      countAA = true;
      countAAA = true;
    }
  }
}
