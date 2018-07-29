import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormControlName, FormBuilder, Validators, FormGroupDirective, NgForm, ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { StudiesService } from '../../../services/studies.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

class DomainUrlValidation {

  static UrlMatchDomain(AC: AbstractControl) {
    let domain = AC.get('domain').value;
    domain = _.replace(domain, 'http://', '');
    domain = _.replace(domain, 'https://', '');
    domain = _.replace(domain, 'www.', '');

    const urls =_.uniq(_.without(_.split(AC.get('pages').value, '\n'), ''));

    let invalid = false;
    const size = _.size(urls);

    if (!size) {
      return null;
    }
     
    for (let i = 0 ; i < size ; i++) {
      let url = _.trim(urls[i]);
      url = _.replace(url, 'http://', '');
      url = _.replace(url, 'https://', '');
      url = _.replace(url, 'www.', '');

      if (!_.startsWith(url, domain)) {
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
  selector: 'app-add-website',
  templateUrl: './add-website.component.html',
  styleUrls: ['./add-website.component.css']
})
export class AddWebsiteComponent implements OnInit {

  @Input('tag') tag: string;
  @Output('addWebsite') addTagWebsite = new EventEmitter<any>();

  matcher: ErrorStateMatcher;

  websiteForm: FormGroup;
  
  constructor(private studies: StudiesService, private fb: FormBuilder) {
    this.websiteForm = this.fb.group({
      name: new FormControl('', [Validators.required], this.nameValidator.bind(this)),
      domain: new FormControl('', [
        Validators.required,
        domainValidator
      ], this.domainValidator.bind(this)),
      pages: new FormControl('', [
        urlValidator
      ])
    }, { validator: DomainUrlValidation.UrlMatchDomain });

    this.matcher = new MyErrorStateMatcher();
  }

  ngOnInit(): void {
  }

  addWebsite(e): void {
    e.preventDefault();

    const name = this.websiteForm.value.name;
    let domain = this.websiteForm.value.domain;
    domain = _.replace(domain, 'http://', '');
    domain = _.replace(domain, 'https://', '');
    domain = _.replace(domain, 'www.', '');

    const pages = _.map(_.uniq(_.without(_.split(this.websiteForm.value.pages, '\n'), '')), p => {
      p = _.replace(p, 'http://', '');
      p = _.replace(p, 'https://', '');
      p = _.replace(p, 'www.', '');
      return p;
    });

    this.addTagWebsite.next({name, domain, pages});
  }

  nameValidator(control: AbstractControl): Observable<any> {
    const name = _.trim(control.value);
    
    if (name !== '') {
      return this.studies.checkWebsiteNameExists(this.tag, name);
    } else {
      return null;
    }
  }

  domainValidator(control: AbstractControl): Observable<any> {
    let domain = _.trim(control.value);
    domain = _.replace(domain, 'http://', '');
    domain = _.replace(domain, 'https://', '');
    domain = _.replace(domain, 'www.', '');
    
    if (domain !== '') {
      return this.studies.checkWebsiteDomainExists(this.tag, domain);
    } else {
      return null;
    }
  }
}

function domainValidator(control: FormControl): ValidationErrors | null {
  let domain = _.trim(control.value);
  domain = _.replace(domain, 'http://', '');
  domain = _.replace(domain, 'https://', '');
  domain = _.replace(domain, 'www.', '');

  let invalid = false;
  if (domain === '') {
    return null;
  }

  invalid = !_.includes(domain, '.');
  invalid = invalid || _.includes(domain, '/');

  return invalid ? { invalidDomain: true } : null;
}

function urlValidator(control: FormControl): ValidationErrors | null {
  const urls = _.uniq(_.without(_.split(control.value, '\n'), ''));

  let invalid = true;
  const size = _.size(urls);

  if (!size) {
    return null;
  }

  for (let i = 0 ; i < size ; i++) {
    let url = _.trim(urls[i]);

    if (!_.startsWith(url, 'http://') && !_.startsWith(url, 'https://') && !_.startsWith(url, 'www.')) {
      if (_.includes(url, '.') && url[_.size(url) - 1] !== '.') {
        invalid = false;
      } else {
        invalid = true;
      }
    } else if (_.startsWith(url, 'http://')) {
      url = _.replace(url, 'http://', '');
      if (_.includes(url, '.') && url[_.size(url) - 1] !== '.') {
        invalid = false;
      } else {
        invalid = true;
      }
    } else if (_.startsWith(url, 'https://')) {
      url = _.replace(url, 'https://', '');
      if (_.includes(url, '.') && url[_.size(url) - 1] !== '.') {
        invalid = false;
      } else {
        invalid = true;
      }
    } else if (_.startsWith(url, 'www.')) {
      url = _.replace(url, 'www.', '');
      if (_.includes(url, '.') && url[_.size(url) - 1] !== '.') {
        invalid = false;
      } else {
        invalid = true;
      }
    } else {
      invalid = true;
    }
  }

  return invalid ? { 'url': { value: true } } : null;
}
