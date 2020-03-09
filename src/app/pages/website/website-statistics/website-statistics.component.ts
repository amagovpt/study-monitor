import { Component, OnInit, Input } from '@angular/core';

import { Page } from '../../../models/page';

@Component({
  selector: 'app-website-statistics',
  templateUrl: './website-statistics.component.html',
  styleUrls: ['./website-statistics.component.css']
})
export class WebsiteStatisticsComponent implements OnInit {

  @Input('tag') tag: string;
  @Input('website') website: string;
  @Input('pages') pages: Array<Page>;

  thresholdConfig: any;

  score: number;
  median: number;
  variance: number;
  amplitude: number;

  constructor() {
    this.thresholdConfig = {
      '0': {color: 'red'},
      '2.5': {color: 'orange'},
      '5': {color: 'yellow'},
      '7.5': {color: 'green'}
    };

    this.score = 0;
    this.median = 0;
    this.variance = 0;
    this.amplitude = 0;
  }

  ngOnInit() {
    this.pages = this.pages.map(p => {
      p.Score = Number(p.Score);
      return p;
    });

    const scores = this.pages.map(p => p.Score);
    scores.sort();
    const size = scores.length;

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
    } else {
      this.variance = 0;
    }

    this.amplitude = scores[size - 1] - scores[0];
  }
}
