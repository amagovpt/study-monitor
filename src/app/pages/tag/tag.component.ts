import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { StudiesService } from '../../services/studies.service';

import { Page } from '../../models/page';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit, OnDestroy {

  sub: Subscription;

  loading: boolean;
  error: boolean;

  tag: string;
  pages: Array<Page>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studies: StudiesService
  ) {
    this.error = false;
    this.loading = true;
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.tag = params.tag;

      this.studies.getUserTagPages(this.tag)
        .subscribe(pages => {
          if (pages === null) {
            this.error = true;
          } else {
            this.pages = pages;
          }

          this.loading = false;
        });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
