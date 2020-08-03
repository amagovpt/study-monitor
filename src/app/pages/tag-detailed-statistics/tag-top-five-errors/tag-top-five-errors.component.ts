import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import _tests from '../../../tests';

@Component({
  selector: 'app-tag-top-five-errors',
  templateUrl: './tag-top-five-errors.component.html',
  styleUrls: ['./tag-top-five-errors.component.css']
})
export class TagTopFiveErrorsComponent implements OnInit {

  @Input('data') data: any;

  tests: any;

  errorsA: any;
  errorsAA: any;
  errorsAAA: any;

  constructor() {
    this.tests = _tests;
  }

  ngOnInit() {
    const errors = new Array<any>();
    for (const key in this.data || {}) {
      if (this.data[key]) {
        errors.push({
          key,
          n_pages: this.data[key].n_pages,
          n_websites: this.data[key].n_websites,
          lvl: this.tests[key].level.toUpperCase()
        });
      }
    }

    this.errorsA = errors.filter((e: any) => e.lvl === 'A');
    this.errorsAA = errors.filter((e: any) => e.lvl === 'AA');
    this.errorsAAA = errors.filter((e: any) => e.lvl === 'AAA');

    this.errorsA = _.orderBy(this.errorsA, ['n_websites', 'n_pages'], ['desc', 'desc']).slice(0, 5);
    this.errorsAA = _.orderBy(this.errorsAA, ['n_websites', 'n_pages'], ['desc', 'desc']).slice(0, 5);
    this.errorsAAA = _.orderBy(this.errorsAAA, ['n_websites', 'n_pages'], ['desc', 'desc']).slice(0, 5);
  }
}
