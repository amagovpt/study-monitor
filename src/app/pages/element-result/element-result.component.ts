import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { EvaluationService } from '../../services/evaluation.service';

@Component({
  selector: 'app-element-result',
  templateUrl: './element-result.component.html',
  styleUrls: ['./element-result.component.css']
})
export class ElementResultComponent implements OnInit, OnDestroy {

  @ViewChild('iframe') iframe: ElementRef;

  sub: Subscription;

  tag: string;
  website: string;
  url: string;

  data: any;
  ele: string;

  constructor(
    private router: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
    private evaluation: EvaluationService
  ) {
    this.data = {};
  }

  ngOnInit(): void {
    this.sub = this.router.params.subscribe(params => {
      this.tag = params.tag;
      this.website = params.website;
      this.url = params.url;
      this.ele = params.ele;

      this.data = this.evaluation.getTestResults(this.ele);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  tabChanged(event): void {
    if (event.index === 1) {
      const doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
      doc.open();
      doc.write(this.data.page);
      doc.close();
    }
  }

  goBack(): Array<string> {
    const path = this.location.path();
    let segments = _.split(path, '/');
    segments[0] = '/user';
    segments.splice(1, 1);
    segments.splice(_.size(segments) - 1, 1);
    segments = _.map(segments, s => decodeURIComponent(s));

    return segments;
  }
}
