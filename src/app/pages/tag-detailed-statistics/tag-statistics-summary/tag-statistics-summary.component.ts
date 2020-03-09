import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-tag-statistics-summary',
  templateUrl: './tag-statistics-summary.component.html',
  styleUrls: ['./tag-statistics-summary.component.css']
})
export class TagStatisticsSummaryComponent implements OnInit {

  @Input('pages') pages: Array<any>;

  thresholdConfig: any;

  score: number;
  median: number;
  variance: number;
  amplitude: number;
  n_websites: number;

  pagesWithErrorsA: number;
  pagesWithErrorsAA: number;
  pagesWithErrorsAAA: number;
  pagesWithoutErrors: number;

  table: any;

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

    this.pagesWithErrorsA = 0;
    this.pagesWithErrorsAA = 0;
    this.pagesWithErrorsAAA = 0;
    this.pagesWithoutErrors = 0;

    this.table = {};
  }

  ngOnInit(): void {
    this.pages = this.pages.map(p => {
      p.Score = Number(p.Score);
      return p;
    });
    
    this.n_websites = _.size(_.uniq(_.map(this.pages, 'Name')));
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
    } else {
      this.variance = 0;
    }

    this.amplitude = scores[size - 1] - scores[0];

    for (const p of this.pages) {
      if (p.A === 0) {
        if (p.AA === 0) {
          if (p.AAA === 0) {
            this.pagesWithoutErrors++;
          } else {
            this.pagesWithErrorsAAA++;
          }
        } else {
          this.pagesWithErrorsAA++;
        }
      } else {
        this.pagesWithErrorsA++;
      }
    }

    const results = {
      nc: {
        websites: []
      },
      A: {
        websites: []
      },
      AA: {
        websites: []
      },
      AAA: {
        websites: []
      }
    };

    const websites = _.groupBy(this.pages, 'Name');

    for (const w in websites) {
      const sumA = _.sumBy(websites[w], 'A');
      const sumAA = _.sumBy(websites[w], 'AA');
      const sumAAA = _.sumBy(websites[w], 'AAA');

      if (sumA === 0) {
        if (sumAA === 0) {
          if (sumAAA === 0) {
             results['AAA']['websites'].push(w);
          } else {
             results['AA']['websites'].push(w);
          }
        } else {
          results['A']['websites'].push(w);
        }
      } else {
        results['nc']['websites'].push(w);
      }
    }



    for (const c in results) {
      for (const w in results[c]) {
        this.table[c] = this.calculateQuartiles(this.getErrorOcurrenceByWebsite(c));
      }
    }
  }

  getErrorOcurrenceByWebsite(conform: string): Array<number> {
    const ocur = new Array<number>();
    const websites = _.groupBy(this.pages, 'Name');
    for (const w in websites) {
      let n = 0;
      for (const p of websites[w]) {
        if (p['A'] !== 0 && conform === 'nc') {
          n++;
        }

        if (p['A'] === 0 && p['AA'] !== 0 && conform === 'A') {
          n++;
        }

        if (p['A'] === 0 && p['AA'] === 0 && p['AAA'] !== 0 && conform === 'AA') {
          n++;
        }

        if (p['A'] === 0 && p['AA'] === 0 && p['AAA'] === 0 && conform === 'AA') {
          n++;
        }
      }
      ocur.push(n);
    }

    return _.without(ocur, 0);
  }

  calculateQuartiles(errors: any): Array<any> {
    const values = errors.sort((a, b) => {
      return a - b;
    });

    let q1, q2, q3, q4;

    q1 = values[Math.round(0.25 * (values.length + 1)) - 1];

    if (values.length % 2 === 0) {
      q2 = (values[(values.length / 2) - 1] + values[(values.length / 2)]) / 2;
    } else {
      q2 = values[(values.length + 1) / 2];
    }

    q3 = values[Math.round(0.75 * (values.length + 1)) - 1];
    q4 = values[values.length - 1];

    const tmp = {
      q1: new Array<number>(),
      q2: new Array<number>(),
      q3: new Array<number>(),
      q4: new Array<number>()
    };

    let q;
    for (const v of values) {
      if (v <= q1) {
        q = 'q1';
      } else {
        if (v <= q2) {
          q = 'q2';
        } else {
          if (v <= q3) {
            q = 'q3';
          } else {
            q = 'q4';
          }
        }
      }

      tmp[q].push(v);
    }

    const final = new Array<any>();

    for (const k in tmp) {
      const v = tmp[k];
      const sum = v.length;

      if (sum > 0) {
        const test = {
          tot: sum,
          por: Math.round((sum * 100) / values.length),
          int: {
            lower: v[0],
            upper: v[v.length - 1]
          }
        };
        final.push(test);
      }
    }

    return final;
  }
}
