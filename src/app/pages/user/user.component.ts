import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CreateCategoryDialogComponent } from '../../dialogs/create-category-dialog/create-category-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openCreateCategoryDialog(): void {
    this.dialog.open(CreateCategoryDialogComponent);
  }
}
