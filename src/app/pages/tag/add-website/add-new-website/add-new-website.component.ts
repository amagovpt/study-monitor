import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm, ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';

import { StudiesService } from '../../../../services/studies.service';

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
  selector: 'app-add-new-website',
  templateUrl: './add-new-website.component.html',
  styleUrls: ['./add-new-website.component.css']
})
export class AddNewWebsiteComponent implements OnInit {

  @Input('tag') tag: string;
  @Output('addWebsite') addTagWebsite = new EventEmitter<any>();

  matcher: ErrorStateMatcher;

  websiteForm: FormGroup;

  constructor(
    private readonly studies: StudiesService, 
    private readonly fb: FormBuilder
  ) {
    this.websiteForm = this.fb.group({
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
  }

  ngOnInit(): void {
  }

  addWebsite(e): void {
    e.preventDefault();

    const name = this.websiteForm.value.name;
    const domain = this.websiteForm.value.domain;

    const pages = _.map(_.uniq(_.without(_.split(this.websiteForm.value.pages, '\n'), '')), p => {
      return _.trim(p);
    });

    this.addTagWebsite.next({name, domain, pages});
  }

  nameValidator(control: AbstractControl): Observable<any> {
    try {
      const name = _.trim(control.value);

      if (name !== '') {
        return this.studies.checkWebsiteNameExists(this.tag, name);
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
      
      if (domain !== '') {
        return this.studies.checkWebsiteDomainExists(this.tag, domain);
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

    return invalid ? { domainMissingProtocol: true } : null;
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