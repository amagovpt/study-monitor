import { Component, OnInit, Input, HostListener } from '@angular/core';
import * as _ from 'lodash';

import { Website } from '../../../models/website';

@Component({
  selector: 'app-tag-statistics',
  templateUrl: './tag-statistics.component.html',
  styleUrls: ['./tag-statistics.component.css']
})
export class TagStatisticsComponent implements OnInit {

  @Input('tag') tag: string;
  @Input('websites') websites: Array<Website>;

  n_cols: number;
  colspan: number;
  rowHeight: string;

  thresholdConfig: any;

  n_pages: number;
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
      this.rowHeight = '1:0.6';
    } else {
      this.n_cols = 3;
      this.colspan = 2;
      this.rowHeight = '1:0.6';
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
      this.rowHeight = '1:0.6';
    } else {
      this.n_cols = 3;
      this.colspan = 2;
      this.rowHeight = '1:0.6';
    }
  }

  ngOnInit() {
    this.n_pages = _.sumBy(this.websites, 'Pages');
    const scores = _.without(_.map(this.websites, 'Score'), null);
    scores.sort();

    let n = 0;
    const size = _.size(scores);
    for (let i = 0 ; i < size ; i++) {
      this.score += scores[i];
      n++;
    }

    this.score /= n;

    if (n === 0) {
      this.median = 0;
    } else if (n === 1) {
      this.median = this.score;
    } else if (n % 2 === 0) {
      const lower = scores[(n / 2) - 1];
      const upper = scores[n / 2];
      this.median = (lower + upper) / 2;
    } else {
      this.median = scores[((n - 1) / 2)];
    }

    if (n > 1) {
      let st = 0;
      for (let i = 0 ; i < n ; i++) {
        st += Math.pow(scores[i] - this.score, 2);
      }

      this.variance = st / (n - 1);
      this.standardDeviation = Math.sqrt(this.variance);
    } else {
      this.variance = 0;
      this.standardDeviation = 0;
    }
  }
}
