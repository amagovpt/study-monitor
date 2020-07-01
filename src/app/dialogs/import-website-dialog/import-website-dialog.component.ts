import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';

import { StudiesService } from '../../services/studies.service';
import { MessageService } from '../../services/message.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-import-website-dialog',
  templateUrl: './import-website-dialog.component.html',
  styleUrls: ['./import-website-dialog.component.css']
})
export class ImportWebsiteDialogComponent implements OnInit {

  loading: boolean;
  loadingCreate: boolean;
  error: boolean;
  matcher: ErrorStateMatcher;

  websites: Array<any>;
  websiteForm: FormGroup;

  tags: any[];
  filteredTags: Observable<string[]>;

  constructor(
    private studies: StudiesService,
    private fb: FormBuilder,
    private message: MessageService,
    private dialogRef: MatDialogRef<ImportWebsiteDialogComponent>
  ) {
    this.websiteForm = this.fb.group({
      tags: new FormControl('', [Validators.required]),
      websites: new FormControl('', [Validators.required])
    });

    this.loading = true;
    this.error = false;
    this.loadingCreate = false;
  }

  ngOnInit(): void {
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
            this.searchWebsites();
          }
        } else {
          this.error = true;
        }

        this.loading = false;
      });
  }

  searchWebsites(): void {
    this.studies.getUserWebsitesFromOtherTags(this.websiteForm.value.tags)
      .subscribe(websites => {
        if (websites !== null) {
          this.websites = websites;
        }
      });
  }

  importWebsite(e): void {
    const tag = this.websiteForm.value.tags;
    const websitesIds = this.websiteForm.value.websites;

    this.loadingCreate = true;
    this.studies.addExistingTagWebsite(tag, websitesIds)
      .subscribe(websites => {
        if (websites) {
          this.message.show('ADD_WEBSITE.new.success_message');
          this.dialogRef.close();
        }

        this.loadingCreate = false;
      });
  }

  canSubmit(): boolean {
    return !this.websiteForm.invalid;
  }

  filterTag(val: any): string[] {
    return this.tags.filter(tag =>
      _.includes(_.toLower(tag.Name), _.toLower(val)));
  }
}
