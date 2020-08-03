import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-website-accessibility-plot',
  templateUrl: './website-accessibility-plot.component.html',
  styleUrls: ['./website-accessibility-plot.component.css']
})
export class WebsiteAccessibilityPlotComponent implements OnInit {

  @Input() data: any;

  @ViewChild('accessibilityPlot', { static: true }) accessibilityPlot: any;
  chart: any;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.translate.get('STATISTICS.accessibility_plot.label').subscribe(res => {
      this.chart = new Chart(this.accessibilityPlot.nativeElement, {
        type: 'radar',
        data: {
          datasets: [{
            label: res,
            data: this.data,
            backgroundColor: 'rgba(255, 136, 136, 0.5)',
            borderColor: 'red',
            borderWidth: '2px'
          }],
          labels: new Array(this.data.length).fill('')
        },
        options: {
          scale: {
            ticks: {
              suggestedMin: 0,
              suggestedMax: 10
            }
          }
        }
      });
    });
  }

}
