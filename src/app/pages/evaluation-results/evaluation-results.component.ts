import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { EvaluationService } from '../../services/evaluation.service';

@Component({
  selector: 'app-evaluation-results',
  templateUrl: './evaluation-results.component.html',
  styleUrls: ['./evaluation-results.component.css']
})
export class EvaluationResultsComponent implements OnInit, OnDestroy {

  sub: Subscription;

  loading: boolean;
  error: boolean;

  eval: any;
  tag: string;
  website: string;
  url: string;

  n_cols: number;
  colspan: number;

  thresholdConfig: any;

  constructor(
    private evaluation: EvaluationService,
    private route: ActivatedRoute,
    private location: Location
  ) {

    this.thresholdConfig = {
      '0': {color: 'red'},
      '2.5': {color: 'orange'},
      '5': {color: 'yellow'},
      '7.5': {color: 'green'}
    };

    this.loading = true;
    this.error = false;

    if (window.innerWidth < 960) {
      this.n_cols = 1;
      this.colspan = 1;
    } else {
      this.n_cols = 3;
      this.colspan = 2;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    if (event.target.innerWidth < 960) {
      this.n_cols = 1;
      this.colspan = 1;
    } else {
      this.n_cols = 3;
      this.colspan = 2;
    }
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.tag = params.tag;
      this.website = params.website;
      this.url = params.url;

      this.evaluation.getEvaluation(this.tag, this.website, this.url)
        .subscribe(data => {
          if (!data) {
            this.error = true;
          } else {
            this.eval = data;
          }

          this.loading = false;
        });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  evaluate(): void {
    this.loading = true;

    this.evaluation.evaluateUrl(this.url)
      .subscribe(data => {
        if (!data) {
          this.error = true;
        } else {
          this.eval = data;
        }

        this.loading = false;
      });
  }

  getTabsNames(): Array<string> {
    return _.keys(this.eval.tabs);
  }

  downloadEvaluation(): void {
    this.evaluation.downloadCSV();
  }

  goBack(): Array<string> {
    let path = this.location.path();
    let segments = _.split(path, '/');
    segments[0] = '/user';
    segments.splice(1, 1);
    segments.splice(_.size(segments)-1, 1);
    segments = _.map(segments, s => decodeURIComponent(s));
    
    return segments;
  }
}
