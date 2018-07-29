import { Component, OnInit, Input, HostListener } from '@angular/core';
import * as _ from 'lodash';

import { Page } from '../../../models/page';

@Component({
  selector: 'app-website-statistics',
  templateUrl: './website-statistics.component.html',
  styleUrls: ['./website-statistics.component.css']
})
export class WebsiteStatisticsComponent implements OnInit {

  @Input('tag') tag: string;
  @Input('website') website: string;
  @Input('pages') pages: Array<Page>

  n_cols: number;
  colspan: number;
  rowHeight: string;

  thresholdConfig: any;

  score: number;
  median: number;
  variance: number;
  standardDeviation: number;

  constructor() {
    this.thresholdConfig = {
      '0': {color: 'red'},
      '2.5': {color: 'orange'},
      '5': {color: 'yellow'},
      '7.5': {color: 'green'}
    };

    if (window.innerWidth < 960) {
      this.n_cols = 1;
      this.colspan = 1;
      this.rowHeight = '1:0.5';
    } else {
      this.n_cols = 3;
      this.colspan = 2;
      this.rowHeight = '1:0.5';
    }

    this.score = 0;
    this.median = 0;
    this.variance = 0;
    this.standardDeviation = 0;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 960) {
      this.n_cols = 1;
      this.colspan = 1;
      this.rowHeight = '1:0.5';
    } else {
      this.n_cols = 3;
      this.colspan = 2;
      this.rowHeight = '1:0.5';
    }
  }

  ngOnInit() {
    const scores = _.map(this.pages, 'Score');
    scores.sort();
    const size = _.size(scores);

    for (let i = 0 ; i < size ; i++) {
      this.score += scores[i];
    }

    this.score /= size;

    if (size === 1) {
      this.median = this.score;
    } else if (size % 2 === 0) {
      const lower = scores[(size / 2) - 1];
      const upper = scores[size / 2];
      this.median = (lower + upper) / 2;
    } else {
      this.median = scores[((size - 1) / 2)];
    }

    if (size > 1) {
      let st = 0;
      for (let i = 0 ; i < size ; i++) {
        st += Math.pow(scores[i] - this.score, 2);
      }

      this.variance = st / (size - 1);
      this.standardDeviation = Math.sqrt(this.variance);
    } else {
      this.variance = 0;
      this.standardDeviation = 0;
    }
  }
}
