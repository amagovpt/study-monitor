import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart } from 'chart.js';
import * as _ from 'lodash';

@Component({
  selector: 'app-tag-statistics-score-distribution',
  templateUrl: './tag-statistics-score-distribution.component.html',
  styleUrls: ['./tag-statistics-score-distribution.component.css']
})
export class TagStatisticsScoreDistributionComponent implements OnInit {

  @Input('pages') pages: Array<any>;

  @ViewChild('pagesScoreChart') pagesScoreChart: any;
  pagesChart: any;

  @ViewChild('websitesScoreChart') websitesScoreChart: any;
  websitesChart: any;

  labels: string[];

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
  }

  ngOnInit(): void {
     this.calculatePagesScoreChart();
     this.calculateWebsitesScoreChart();
  }

  calculatePagesScoreChart(): void {
    let frequencies = new Array<number>(10).fill(0);
    _.map(this.pages, p => {
      frequencies[_.floor(p.Score) - 1]++;
    });
    let data = {
      frequencie: frequencies,
      number: this.pages.length
    };

    this.translate.get(['STATISTICS.scores.percentage_p', 'STATISTICS.scores.frequencie_p'])
      .subscribe(res => {

      let values = data.frequencie;
      const total = _.sum(values);

      let percentageValues = _.map(values, (v) => {
        return (v / total) * 100;
      });

      let freq = [];
      let freqPer = [];
      let tmp = 0;
      for (let i = 0 ; i < 10 ; i++) {
        freq[i] = tmp += values[i];
      }

      let tmpPer = 0;
      for (let i = 0 ; i < 10 ; i++) {
        freqPer[i] = tmpPer += percentageValues[i];
      }

      this.pagesChart = new Chart(this.pagesScoreChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: res['STATISTICS.scores.percentage_p'],
              data: freqPer,
              type: 'line',
              backgroundColor: 'lightgray',
              lineTension: 0,
              fill: false,
              pointBackgroundColor: 'red',
              pointBorderColor: 'white',
              borderColor: 'blue'
            },
            {
              label: res['STATISTICS.scores.frequencie_p'],
              data: percentageValues,
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
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem) => {
                return [res['STATISTICS.scores.percentage_p'] + ': ' + tooltipItem.yLabel.toFixed(1) + '%', res['STATISTICS.scores.frequencie_p'] + ': ' + values[tooltipItem.index]];
              }
            }
          }
        }
      });
    });
  }

  calculateWebsitesScoreChart(): void {
    let frequencies = new Array<number>(10).fill(0);
    let websites = _.groupBy(this.pages, 'Name');

    for (let w in websites) {
      let m = _.meanBy(websites[w], 'Score');
      frequencies[_.floor(m) - 1]++;
    }

    let data = {
      frequencie: frequencies,
      number: _.size(websites)
    };

    this.translate.get(['STATISTICS.scores.percentage_w', 'STATISTICS.scores.frequencie_w'])
      .subscribe(res => {

      let values = data.frequencie;
      const total = _.sum(values);

      let percentageValues = _.map(values, (v) => {
        return (v / total) * 100;
      });

      let freq = [];
      let freqPer = [];
      let tmp = 0;
      for (let i = 0 ; i < 10 ; i++) {
        freq[i] = tmp += values[i];
      }

      let tmpPer = 0;
      for (let i = 0 ; i < 10 ; i++) {
        freqPer[i] = tmpPer += percentageValues[i];
      }

      this.websitesChart = new Chart(this.websitesScoreChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: res['STATISTICS.scores.percentage_w'],
              data: freqPer,
              type: 'line',
              backgroundColor: 'lightgray',
              lineTension: 0,
              fill: false,
              pointBackgroundColor: 'red',
              pointBorderColor: 'white',
              borderColor: 'blue'
            },
            {
              label: res['STATISTICS.scores.frequencie_w'],
              data: percentageValues,
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
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem) => {
                return [res['STATISTICS.scores.percentage_w'] + ': ' + tooltipItem.yLabel.toFixed(1) + '%', res['STATISTICS.scores.frequencie_w'] + ': ' + values[tooltipItem.index]];
              }
            }
          }
        }
      });
    });
  }
}
