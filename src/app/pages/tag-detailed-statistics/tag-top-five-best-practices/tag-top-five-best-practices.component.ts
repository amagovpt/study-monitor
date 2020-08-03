import { Component, OnInit, Input } from '@angular/core';
import * as _  from 'lodash';
import _tests from '../../../tests';

@Component({
  selector: 'app-tag-top-five-best-practices',
  templateUrl: './tag-top-five-best-practices.component.html',
  styleUrls: ['./tag-top-five-best-practices.component.css']
})
export class TagTopFiveBestPracticesComponent implements OnInit {

  @Input('data') data: any;
  tests: any;

  success: any;

  constructor() {
    this.tests = _tests;
  }

  ngOnInit(): void {
    const success = new Array<any>();
    for (const key in this.data || {}) {
      if (this.data[key]) {
        success.push({
          key,
          n_pages: this.data[key].n_pages,
          n_websites: this.data[key].n_websites,
          lvl: this.tests[key].level.toUpperCase()
        });
      }
    }

    this.success = _.orderBy(success, ['n_websites', 'n_pages'], ['desc', 'desc']).slice(0, 5);
  }
}
