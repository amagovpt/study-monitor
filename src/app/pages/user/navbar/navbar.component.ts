import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  sub: Subscription;

  addCategory: boolean;
  tag: string;
  page: string;
  pageEle: string;
  pageCode: boolean;

  constructor(
    private router: Router,
    private location: Location
  ) {
    this.addCategory = false;
    this.tag = null;
    this.page = null;
    this.pageEle = null;
    this.pageCode = false;
  }

  ngOnInit(): void {
    this.sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.addCategory = false;
        this.tag = null;
        this.page = null;
        this.pageEle = null;
        this.pageCode = false;

        const path = this.location.path();
        const segments = _.split(path, '/');

        if (_.size(segments) > 2) {
          if (segments[2] === 'add-category') {
            this.addCategory = true;
          } else {
            switch (_.size(segments)) {
              case 5:
                if (segments[4] === 'code') {
                  this.pageCode = true;
                } else {
                  this.pageEle = decodeURIComponent(segments[4]);
                }
              case 4:
                this.page = decodeURIComponent(segments[3]);
              case 3:
                this.tag = decodeURIComponent(segments[2]);
                break;
            }
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
