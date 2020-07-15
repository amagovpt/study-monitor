import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm, ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';

import { BackgroundEvaluationsInformationDialogComponent } from '../../dialogs/background-evaluations-information-dialog/background-evaluations-information-dialog.component';

import { StudiesService } from '../../services/studies.service';
import { MessageService } from '../../services/message.service';

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
  selector: 'app-add-website-dialog',
  templateUrl: './add-website-dialog.component.html',
  styleUrls: ['./add-website-dialog.component.css']
})
export class AddWebsiteDialogComponent implements OnInit {

  loading: boolean;
  loadingCreate: boolean;
  error: boolean;

  matcher: ErrorStateMatcher;

  websiteForm: FormGroup;

  tags: any[];
  filteredTags: Observable<string[]>;

  constructor(
    private readonly studies: StudiesService, 
    private readonly fb: FormBuilder,
    private message: MessageService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddWebsiteDialogComponent>
  ) {
    this.websiteForm = this.fb.group({
      tags: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required], this.nameValidator.bind(this)),
      domain: new FormControl('', [
        Validators.required,
        domainValidator2,
        domainMissingProtocol
      ], this.domainValidator.bind(this)),
      pages: new FormControl('', [
        urlValidator,
        missingProtocol
      ])
    }, { validator: DomainUrlValidation.UrlMatchDomain });

    this.matcher = new MyErrorStateMatcher();

    this.loading = true;
    this.loadingCreate = false;
    this.error = false;
  }

  ngOnInit() {
    this.studies.getUserTags()
      .subscribe(tags => {
        if (tags) {
          this.tags = tags;
          this.filteredTags = this.websiteForm.controls.tags.valueChanges
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
            this.websiteForm.controls.tags.setValue(decodeURIComponent(segments[1]));
          }
        } else {
          this.error = true;
        }

        this.loading = false;
      });
  }

  createWebsite(e): void {
    this.loadingCreate = true;

    const tag = this.websiteForm.value.tags;
    const name = this.websiteForm.value.name;
    const domain = this.websiteForm.value.domain;
    const pages = this.websiteForm.value.pages.split('\n').filter(p => p.trim() !== '').map(p => p.trim()) || [];

    this.studies.addNewTagWebsite(tag, name, domain, pages)
      .subscribe(websites => {
        if (websites) {
          if (pages.length > 0) {
            this.dialog.open(BackgroundEvaluationsInformationDialogComponent, { width: '40vw' });
          }

          this.message.show('ADD_WEBSITE.new.success_message');
          this.dialogRef.close();
        }

        this.loadingCreate = false;
      });
  }

  canSubmit(): boolean {
    return !this.websiteForm.invalid;
  }

  validateTag(): boolean {
    return this.websiteForm?.value?.tags && this.websiteForm?.value?.tags?.trim() !== '';
  }

  filterTag(val: any): string[] {
    return this.tags.filter(tag =>
      _.includes(_.toLower(tag.Name), _.toLower(val)));
  }

  nameValidator(control: AbstractControl): Observable<any> {
    try {
      const name = _.trim(control.value);

      if (name !== '' && this.websiteForm.value.tags.trim() !== '') {
        return this.studies.checkWebsiteNameExists(this.websiteForm.value.tags, name);
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  domainValidator(control: AbstractControl): Observable<any> {
    try {
      const domain = _.trim(control.value);
      
      
      if (domain !== '' && this.websiteForm.value.tags.trim() !== '') {
        return this.studies.checkWebsiteDomainExists(this.websiteForm.value.tags, domain);
      } else {
        return null;
      }
    } catch(err) {
      console.log(err);
      return null;
    }
  }
}

function domainValidator2(control: FormControl): ValidationErrors | null {
  try {
    const domain = _.trim(control.value);

    let invalid = false;
    if (domain === '') {
      return null;
    }

    invalid = domain.endsWith('.');
    invalid = invalid || domain.endsWith('/');

    return invalid ? { invalidDomain: true } : null;
  } catch(err) {
    console.log(err);
    return null;
  }
}

function domainMissingProtocol(control: FormControl): ValidationErrors | null {
  try {
    const domain = _.trim(control.value);

    if (domain === '') {
      return null;
    }

    const invalid = !domain.startsWith('http://') && !domain.startsWith('https://')

    return invalid ? { domainMissingProtocol: { value: true } } : null;
  } catch(err) {
    console.log(err);
    return null;
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