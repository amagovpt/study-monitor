import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormControlName, FormBuilder, Validators, FormGroupDirective, NgForm, ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { StudiesService } from '../../../../services/studies.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-existing-website',
  templateUrl: './add-existing-website.component.html',
  styleUrls: ['./add-existing-website.component.css']
})
export class AddExistingWebsiteComponent implements OnInit {

  @Input('tag') tag: string;
  @Output('addWebsite') addTagWebsite = new EventEmitter<any>();

  matcher: ErrorStateMatcher;

  websites: Array<any>;
  websiteForm: FormControl;

  constructor(private studies: StudiesService) {
    this.websiteForm = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {
    this.studies.getUserWebsitesFromOtherTags(this.tag)
      .subscribe(websites => {
        if (websites !== null) {
          this.websites = websites;
        }
      });
  }

  addWebsite(e): void {
    e.preventDefault();

    const websitesId = this.websiteForm.value;
    this.addTagWebsite.next(websitesId);
  }
}
