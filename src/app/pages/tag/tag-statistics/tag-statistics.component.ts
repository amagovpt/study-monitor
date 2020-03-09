import { Component, OnInit, Input } from '@angular/core';

import { Website } from '../../../models/website';

@Component({
  selector: 'app-tag-statistics',
  templateUrl: './tag-statistics.component.html',
  styleUrls: ['./tag-statistics.component.css']
})
export class TagStatisticsComponent implements OnInit {

  @Input('tag') tag: string;
  @Input('websites') websites: Array<Website>;

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

    this.score = 0;
    this.median = 0;
    this.variance = 0;
    this.standardDeviation = 0;
  }

  ngOnInit() {
    this.websites = this.websites.map(w => {
      w.Pages = Number(w.Pages);
      w.Score = Number(w.Score);
      return w;
    });
    
    this.n_pages = this.websites.reduce((p, w) => p += w.Pages, 0);
    const scores = this.websites.map(w => w.Score);
    scores.sort();

    let n = 0;
    const size = scores.length;
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
