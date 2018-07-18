import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormControlName, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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
    private message: MessageService
  ) {
    this.matcher = new MyErrorStateMatcher();

    this.tagForm = new FormGroup({
      type: new FormControl('official'),
      officialTag: new FormControl(),
      userTag: new FormControl({value: '', disabled: true})
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
      this.tagForm.controls.officialTag.enable();
      this.tagForm.controls.userTag.disable();
      this.tagForm.controls.userTag.reset();
    } else {
      this.tagForm.controls.officialTag.disable();
      this.tagForm.controls.userTag.enable();
      this.tagForm.controls.officialTag.reset();
    }
  }

  createCategory(e): void {
    e.preventDefault();

    this.loading = true;

    const type = this.tagForm.value.type;
    let id = null;
    let name;

    if (type === 'official') {
      name = this.tagForm.value.officialTag;
      id = _.find(this.officialTags, ['Name', name]).TagId;
    }
    else {
      name = this.tagForm.value.userTag;
    }

    this.studies.createTag(type, id, name)
      .subscribe(success => {
        if (success) {
          this.message.show('TAG.create.success', 5000, {message: 'ver', path: '/user/' + name});  
        }

        this.loading = false;
      });
  }

}
