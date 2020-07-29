import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import * as _ from 'lodash';
import { StudiesService } from '../../services/studies.service';
import { MatDialog } from '@angular/material/dialog';
import { BackgroundEvaluationsInformationDialogComponent } from '../background-evaluations-information-dialog/background-evaluations-information-dialog.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

class DomainUrlValidation {

  static UrlMatchDomain(AC: AbstractControl) {
    const domain = AC.get('domain').value;

    const urls = AC.get('pages').value.split('\n').filter(a => a !== '');

    let invalid = false;
    const size = urls.length;

    if (!size) {
      return null;
    }

    for (let i = 0 ; i < size ; i++) {
      const url = urls[i].trim();

      if (!url.startsWith(domain)) {
        invalid = true;
      }
    }

    if (invalid) {
      AC.get('pages').setErrors({ 'domainNoMatch': true });
    } else {
      return null;
    }
  }
}

@Component({
  selector: 'app-add-webpages-dialog',
  templateUrl: './add-webpages-dialog.component.html',
  styleUrls: ['./add-webpages-dialog.component.css']
})
export class AddWebpagesDialogComponent implements OnInit {

  loading: boolean;
  loadingCreate: boolean;
  error: boolean;

  matcher: ErrorStateMatcher;

  pagesForm: FormGroup;
  domain: string;

  urisFromFile: string[];
  urisFromFileString: string;
  fileErrorMessage: string;

  crawlStatus: string;
  crawlButtonDisable: boolean;
  crawlResultsDisabled: boolean;

  tags: any[];
  filteredTags: Observable<string[]>;

  websites: any[];
  filteredWebsites: Observable<string[]>;

  hideAddPagesButton: boolean;
  addingPages: boolean;
  addingFile: boolean;

  constructor(
    private readonly studies: StudiesService, 
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
    this.pagesForm = this.fb.group({
      tags: new FormControl('', [Validators.required]),
      websites: new FormControl('', [Validators.required]),
      domain: new FormControl({value: '', disabled: true}),
      pages: new FormControl('', [Validators.required, urlValidator, missingProtocol])
    }, { validator: DomainUrlValidation.UrlMatchDomain });

    this.matcher = new MyErrorStateMatcher();
    this.crawlStatus = 'not_running';
    this.crawlButtonDisable = false;
    this.fileErrorMessage = '';
    this.urisFromFile = [];

    this.loading = true;
    this.loadingCreate = false;
    this.error = false;

    this.hideAddPagesButton = false;
    this.addingPages = true;
    this.addingFile = false;
  }

  ngOnInit() {
    this.studies.getUserTags()
      .subscribe(tags => {
        if (tags) {
          this.tags = tags;
          this.filteredTags = this.pagesForm.controls.tags.valueChanges
            .pipe(
              startWith(null),
              map(val => this.filterTag(val))
            );

          const location = window.location.pathname;
          let segments = location.split('/');
          segments = segments.slice(1);
          if (segments[0] !== 'user') {
            segments = segments.slice(1);
          }
          if (segments[1] !== undefined) {
            this.pagesForm.controls.tags.setValue(decodeURIComponent(segments[1]));
            this.searchWebsites();
          }

          if (segments[2] !== undefined) {
            this.pagesForm.controls.websites.setValue(decodeURIComponent(segments[2]));
            this.searchDomain();
          }
        } else {
          this.error = true;
        }

        this.loading = false;
      });
  }

  createPages(e) {
    e.preventDefault();

    const tag = this.pagesForm.value.tags;
    const website = this.pagesForm.value.websites;
    const domain = this.pagesForm.value.domain;
    let pages = new Array<string>();

    if (this.addingPages) {
      pages = this.pagesForm.value.pages.split('\n').filter(p => p.trim() !== '').map(p => p.trim());
    }

    if (this.addingFile) {
      pages = this.urisFromFile.filter(p => p.trim() !== '').map(p => p.trim());
    }

    this.studies.addTagWebsitePages(tag, website, domain, pages)
      .subscribe(success => {
        if (success) {
          this.dialog.open(BackgroundEvaluationsInformationDialogComponent);
        } else {
          alert('error');
        }
      });
  }

  searchWebsites(): void {
    this.pagesForm.controls.websites.reset();
    this.pagesForm.controls.domain.reset();
    this.studies.getUserTagWebsites(this.pagesForm.value.tags)
      .subscribe(websites => {
        if (websites !== null) {
          this.websites = websites;
          this.filteredWebsites = this.pagesForm.controls.websites.valueChanges
            .pipe(
              startWith(null),
              map(val => this.filterWebsite(val))
            );
        }
      });
  }

  searchDomain(): void {
    this.pagesForm.controls.domain.reset();
    this.studies.getWebsiteDomain(this.pagesForm.value.tags, this.pagesForm.value.websites)
      .subscribe(domain => {
        if (domain) {
          this.domain = domain;
          this.pagesForm.controls.domain.setValue(domain);
          this.cd.detectChanges();

          this.studies.checkCrawler(this.domain)
            .subscribe(result => {
              if (result !== null) {
                if (result) {
                  this.crawlStatus = 'complete';
                  this.crawlButtonDisable = true;
                  this.crawlResultsDisabled = false;
                } else {
                  this.crawlStatus = 'progress';
                  this.crawlButtonDisable = true;
                  this.crawlResultsDisabled = true;
                }
              } else {
                this.crawlStatus = 'not_running';
                this.crawlButtonDisable = false;
                this.crawlResultsDisabled = true;
              }
              this.cd.detectChanges();
            });
        }
      });
  }

  canSubmit(): boolean {
    if (this.addingPages) {
      return !this.pagesForm.invalid; 
    }

    if (this.addingFile) {
      return this.fileErrorMessage === '' && this.urisFromFile.length > 0;
    }
  }

  filterTag(val: any): string[] {
    return this.tags.filter(tag =>
      _.includes(_.toLower(tag.Name), _.toLower(val)));
  }

  filterWebsite(val: any): string[] {
    return this.websites.filter(website =>
      _.includes(_.toLower(website.Name), _.toLower(val)));
  }

  handleFileInput(files: FileList) {
    const fileToRead = files.item(0);
    this.urisFromFile = [];
    if (fileToRead === null) {
      this.fileErrorMessage = '';
      this.urisFromFile = [];
      return;
    }

    switch (fileToRead.type) {
      case ('text/plain'):
        this.parseTXT(fileToRead);
        break;
      case ('text/xml'):
        this.parseXML(fileToRead);
        break;
      default:
        this.urisFromFile = [];
        this.fileErrorMessage = 'invalidType';
        break;
    }
  }

  parseTXT(file: File): string[] {
    const result = [];
    // open file and check for the urls
    const reader = new FileReader();
    reader.readAsText(file);
    // divide the url in the result array
    reader.onload = () => {
      const urlFile = reader.result.toString();
      const lines = urlFile.split('\n').map(l => l.trim()).filter(u => u !== '');

      this.urisFromFile = _.clone(lines);
      this.validateFileUris(this.domain, this.urisFromFile);
    };
    return result;
  }

  parseXML(file: File): string[] {
    const reader = new FileReader();
    const result = [];
    reader.readAsText(file);
    reader.onload = () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(reader.result.toString(), 'text/xml');
      
      const urls = doc.getElementsByTagName('loc');

      this.urisFromFile = new Array<string>();
      for (let i = 0 ; i < urls.length ; i++) {
        const url = urls.item(i);
        this.urisFromFile.push(url.textContent.trim());
      }

      this.validateFileUris(this.domain, this.urisFromFile);
    };
    return result;
  }

  validateFileUris(domain: string, uris: string[]): void {
    if (domain === '') {
      this.fileErrorMessage = 'invalidDomain';
      return;
    }
    if (uris !== undefined || uris !== []) {
      for (let url of uris) {
        if (!url.startsWith(domain)) {
          this.fileErrorMessage = 'invalidDomain';
          return;
        } else {
          this.fileErrorMessage = '';
        }
      }
    }
  }

  addFilePages(): void {
    //this.addTagWebsitePages.next({ domain: this.domain, urls: this.urisFromFile });
  }

  crawlWebsite(): void {
    this.studies.crawlWebsite(this.domain)
      .subscribe(result => {
        if (result) {
          this.crawlStatus = 'progress';
          this.crawlButtonDisable = true;
        } else {
          alert('Error');
        }
      });
  }

  tabChanged(event: any): void {
    if (event.index === 0) {
      this.addingPages = true;
      this.addingFile = false;
    } else if (event.index === 1) {
      this.addingPages = false;
      this.addingFile = true;
    } else {
      this.addingPages = false;
      this.addingFile = false;
    }
    
    if (event.index === 2) {
      this.hideAddPagesButton = true;
    } else {
      this.hideAddPagesButton = false;
    }
    this.cd.detectChanges();
  }
}

function missingProtocol(control: FormControl) {
  const urls = control.value.split('\n').filter(a => a !== '');
  
  let invalid = false;
  const size = urls.length;

  if (!size) {
    return null;
  }

  for (let i = 0 ; i < size ; i++) {
    const url = urls[i].trim();
  
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      invalid = true;
      break;
    }
  }

  return invalid ? { 'missingProtocol': { value: true } } : null;
}

function urlValidator(control: FormControl) {
  const urls = control.value.split('\n').filter(a => a !== '');
  
  let invalid = false;
  const size = urls.length;

  if (!size) {
    return null;
  }

  for (let i = 0 ; i < size ; i++) {
    const url = urls[i].trim();

    if (!url.includes(url, '.') || url[url.length - 1] === '.') {
      invalid = true;
      break;
    }
  }

  return invalid ? { 'url': { value: true } } : null;
}