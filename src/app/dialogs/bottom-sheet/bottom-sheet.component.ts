import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { CreateCategoryDialogComponent } from '../create-category-dialog/create-category-dialog.component';
import { AddWebsiteDialogComponent } from '../add-website-dialog/add-website-dialog.component';
import { ImportWebsiteDialogComponent } from '../import-website-dialog/import-website-dialog.component';
import { AddWebpagesDialogComponent } from '../add-webpages-dialog/add-webpages-dialog.component';


@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openCreateCategoryDialog(e): void {
    this.bottomSheetRef.dismiss();
    e.preventDefault();

    this.dialog.open(CreateCategoryDialogComponent, {
      width: '40vw',
      disableClose: false,
      hasBackdrop: true
    });
  }

  openAddWebsiteDialog(e): void {
    this.bottomSheetRef.dismiss();
    e.preventDefault();

    this.dialog.open(AddWebsiteDialogComponent, {
      width: '40vw',
      disableClose: false,
      hasBackdrop: true
    });
  }

  openImportWebsiteDialog(e): void {
    this.bottomSheetRef.dismiss();
    e.preventDefault();

    this.dialog.open(ImportWebsiteDialogComponent, {
      width: '40vw',
      disableClose: false,
      hasBackdrop: true
    });
  }

  openAddPagesDialog(e): void {
    this.bottomSheetRef.dismiss();
    e.preventDefault();

    this.dialog.open(AddWebpagesDialogComponent, {
      width: '40vw',
      disableClose: false,
      hasBackdrop: true
    });
  }
}
