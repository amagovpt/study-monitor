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
  settings: boolean;
  tag: string;
  tagStatistics: boolean;
  website: string;
  websiteStatistics: boolean;
  tagError: string;
  websiteError: string;
  page: string;
  pageEle: string;
  pageCode: boolean;

  constructor(
    private router: Router,
    private location: Location
  ) {
    this.addCategory = false;
    this.settings = false;
    this.tag = null;
    this.tagStatistics = false;
    this.website = null;
    this.websiteStatistics = false;
    this.tagError = null;
    this.websiteError = null;
    this.page = null;
    this.pageEle = null;
    this.pageCode = false;
  }

  ngOnInit(): void {
    this.sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.addCategory = false;
        this.settings = false;
        this.tag = null;
        this.tagStatistics = false;
        this.website = null;
        this.websiteStatistics = false;
        this.tagError = null;
        this.websiteError = null;
        this.page = null;
        this.pageEle = null;
        this.pageCode = false;

        const path = this.location.path();
        const segments = _.split(path, '/');

        if (_.size(segments) > 2) {
          if (segments[2] === 'add-category') {
            this.addCategory = true;
          } else if (segments[2] === 'settings') {
            this.settings = true;
          } else if (segments[3] === 'statistics') {
            if (segments[6] === 'statistics') {
              switch (_.size(segments)) {
                case 10:
                  if (segments[9] === 'code') {
                    this.pageCode = true;
                  } else {
                    this.pageEle = decodeURIComponent(segments[9]);
                  }
                case 9:
                  this.page = decodeURIComponent(segments[8]);
                case 8:
                  this.websiteError = decodeURIComponent(segments[7]);
                case 7:
                  this.websiteStatistics = true;
                case 6:
                  this.website = decodeURIComponent(segments[5]);
                case 5:
                  this.tagError = decodeURIComponent(segments[4]);
                case 4:
                  this.tagStatistics = true;
                case 3:
                  this.tag = decodeURIComponent(segments[2]);
                  break;
              }
            } else {
              switch (_.size(segments)) {
                case 8:
                  if (segments[7] === 'code') {
                    this.pageCode = true;
                  } else {
                    this.pageEle = decodeURIComponent(segments[7]);
                  }
                case 7:
                  this.page = decodeURIComponent(segments[6]);
                case 6:
                  this.website = decodeURIComponent(segments[5]);
                case 5:
                  this.tagError = decodeURIComponent(segments[4]);
                case 4:
                  this.tagStatistics = true;
                case 3:
                  this.tag = decodeURIComponent(segments[2]);
                  break;
              }
            }
          } else if (segments[4] === 'statistics') {
            switch (_.size(segments)) {
              case 8:
                if (segments[7] === 'code') {
                  this.pageCode = true;
                } else {
                  this.pageEle = decodeURIComponent(segments[7]);
                }
              case 7:
                this.page = decodeURIComponent(segments[6]);
              case 6:
                this.websiteError = decodeURIComponent(segments[5]);
              case 5:
                this.websiteStatistics = true;
              case 4:
                this.website = decodeURIComponent(segments[3]);
              case 3:
                this.tag = decodeURIComponent(segments[2]);
                break;
            }
          } else {
            switch (_.size(segments)) {
              case 6:
                if (segments[5] === 'code') {
                  this.pageCode = true;
                } else {
                  this.pageEle = decodeURIComponent(segments[5]);
                }
              case 5:
                this.page = decodeURIComponent(segments[4]);
              case 4:
                this.website = decodeURIComponent(segments[3]);
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
