import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormControlName, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as _ from 'lodash';

import { StudiesService } from '../../../services/studies.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-pages',
  templateUrl: './add-pages.component.html',
  styleUrls: ['./add-pages.component.css']
})
export class AddPagesComponent implements OnInit {

  @Input('tag') tag: string;

  @Output('addPages') addTagPages = new EventEmitter<Array<string>>();

  matcher: ErrorStateMatcher;

  urlsForm: FormControl;

  constructor(private studies: StudiesService) {
    this.urlsForm = new FormControl('', [
      Validators.required,
      urlValidator
    ]);

    this.matcher = new MyErrorStateMatcher();
  }

  ngOnInit(): void {
  }

  addPages(e): void {
    e.preventDefault();

    const urls = _.uniq(_.without(_.split(this.urlsForm.value, '\n'), ''));
    this.addTagPages.next(urls);
  }
}

function urlValidator(control: FormControl) {
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
