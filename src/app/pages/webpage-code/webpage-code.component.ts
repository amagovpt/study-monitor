import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';

import { saveAs } from 'file-saver';
import { html } from 'js-beautify';

@Component({
  selector: 'app-webpage-code',
  templateUrl: './webpage-code.component.html',
  styleUrls: ['./webpage-code.component.css']
})
export class WebpageCodeComponent implements OnInit, OnDestroy {

  sub: Subscription;

  tag: string;
  website: string;
  url: string;
  encodedUrl: string;

  pagecode: string;
  downloadHTML: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.tag = params.tag;
      this.website = params.website;
      this.url = params.url;

      this.pagecode = html(JSON.parse(sessionStorage.getItem('evaluation')).pagecode, { indent_size: 2 });
      const blob = new Blob([this.pagecode], { type: 'text/html' });
      this.downloadHTML = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  downloadCode(): void {
    const blob = new Blob([this.pagecode], { type: 'text/html' });
    saveAs(blob, this.url + '.html');
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
