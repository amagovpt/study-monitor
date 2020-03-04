import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';

import { MessageService } from '../../services/message.service';
import { StudiesService } from '../../services/studies.service';

import { Tag } from '../../models/tag';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.css']
})
export class CreateCategoryDialogComponent implements OnInit {

  loading: boolean;

  matcher: ErrorStateMatcher;

  officialTags: Array<Tag>;

  tagForm: FormGroup;

  constructor(
    private studies: StudiesService,
    private message: MessageService,
    private router: Router,
    private dialogRef: MatDialogRef<CreateCategoryDialogComponent>,
    private cd: ChangeDetectorRef
  ) {
    this.matcher = new MyErrorStateMatcher();

    this.tagForm = new FormGroup({
      type: new FormControl('official'),
      tags: new FormControl(),
      newName: new FormControl('', [], this.categoryNameValidator.bind(this)),
      userTag: new FormControl({value: '', disabled: true}, [], this.categoryNameValidator.bind(this))
    });

    this.loading = false;
  }

  ngOnInit() {
    this.studies.getOfficialTags()
      .subscribe(tags => {
        if (tags) {
          this.officialTags = tags;
        }
      });
  }

  changeType(): void {
    if (this.tagForm.value.type === 'official') {
      this.tagForm.controls.tags.enable();
      this.tagForm.controls.newName.enable();
      this.tagForm.controls.userTag.disable();
      this.tagForm.controls.userTag.reset();
    } else {
      this.tagForm.controls.tags.disable();
      this.tagForm.controls.userTag.enable();
      this.tagForm.controls.tags.reset();
      this.tagForm.controls.newName.disable();
      this.tagForm.controls.newName.reset();
    }
  }

  canSubmit(): boolean {
    if (this.tagForm.value.type === 'official') {
      if (this.tagForm.value.newName && this.tagForm.value.newName !== ''
        && !this.tagForm.controls.newName.errors && this.tagForm.value.tags
        && this.tagForm.value.tags.length > 0) {
        return false;
      }
    } else {
      if (this.tagForm.value.userTag && this.tagForm.value.userTag !== '' && !this.tagForm.controls.userTag.errors) {
        return false;
      }
    }

    return true;
  }

  createCategory(e): void {
    e.preventDefault();

    this.loading = true;

    const type = this.tagForm.value.type;
    let tagsId = null;
    let name = null;

    if (type === 'official') {
      name = this.tagForm.value.newName;
      tagsId = this.tagForm.value.tags;
    } else {
      name = this.tagForm.value.userTag;
    }

    this.studies.createTag(type, tagsId, name)
      .subscribe(success => {
        if (success) {
          this.message.show('CREATE_TAG.message', 5000);
          this.dialogRef.close();
          this.router.navigateByUrl('/user/' + name);
        }

        this.loading = false;
        this.cd.detectChanges();
      });
  }

  categoryNameValidator(control: AbstractControl): Observable<any> {
    const name = control.value;
    if (name !== '') {
      return this.studies.userTagNameExists(name);
    } else {
      return of(false);
    }
  }
}
