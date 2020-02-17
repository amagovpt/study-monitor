import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart } from 'chart.js';
import * as _ from 'lodash';

import { Page } from '../../../models/page';

@Component({
  selector: 'app-website-score-distribution',
  templateUrl: './website-score-distribution.component.html',
  styleUrls: ['./website-score-distribution.component.css']
})
export class WebsiteScoreDistributionComponent implements OnInit {

  @Input('pages') pages: Array<Page>;

  @ViewChild('scoreChart', { static: true }) scoreChart: any;
  chart: any;

  data: any;

  labels: string[];
  values: number[];
  percentageValues: number[];
  freq: number[];
  freqPer: number[];

  constructor(private translate: TranslateService) {
    this.labels = [
      '[1 - 2[',
      '[2 - 3[',
      '[3 - 4[',
      '[4 - 5[',
      '[5 - 6[',
      '[6 - 7[',
      '[7 - 8[',
      '[8 - 9[',
      '[9 - 10]'
    ];
    this.values = [];
    this.freq = [];
    this.freqPer = [];
  }

  ngOnInit(): void {
    const frequencies = new Array<number>(10).fill(0);
    _.map(this.pages, p => {
      frequencies[_.floor(p.Score) - 1]++;
    });
    this.data = {
      frequency: frequencies,
      number: this.pages.length
    };

    this.translate.get(['STATISTICS.scores.percentage_p', 'STATISTICS.scores.frequency_p', 'STATISTICS.scores.percentage', 'STATISTICS.scores.range'])
      .subscribe(res => {

      this.values = this.data.frequency;
      const total = _.sum(this.values);

      this.percentageValues = _.map(this.values, (v) => {
        return (v / total) * 100;
      });

      let tmp = 0;
      for (let i = 0 ; i < 10 ; i++) {
        this.freq[i] = tmp += this.values[i];
      }

      let tmpPer = 0;
      for (let i = 0 ; i < 10 ; i++) {
        this.freqPer[i] = tmpPer += this.percentageValues[i];
      }

      this.chart = new Chart(this.scoreChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: res['STATISTICS.scores.percentage_p'],
              data: this.freqPer,
              type: 'line',
              backgroundColor: 'lightgray',
              lineTension: 0,
              fill: false,
              pointBackgroundColor: 'red',
              pointBorderColor: 'white',
              borderColor: 'blue'
            },
            {
              label: res['STATISTICS.scores.frequency_p'],
              data: this.percentageValues,
              backgroundColor: [
                'red',
                'red',
                'orange',
                'orange',
                'yellow',
                'yellow',
                'yellow',
                'green',
                'green',
                'lightgreen'
              ]
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                steps: 1,
                stepValue: 1,
                max: 100
              },
              scaleLabel: {
                display: true,
                labelString: res['STATISTICS.scores.percentage']
              }
            }],
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: res['STATISTICS.scores.range']
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem) => {
                return [res['STATISTICS.scores.percentage_p'] + ': ' + tooltipItem.yLabel.toFixed(1) + '%', res['STATISTICS.scores.frequency_p'] + ': ' + this.values[tooltipItem.index]];
              }
            }
          }
        }
      });
    });
  }
}
