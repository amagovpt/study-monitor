import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWebpagesDialogComponent } from './add-webpages-dialog.component';

describe('AddWebpagesDialogComponent', () => {
  let component: AddWebpagesDialogComponent;
  let fixture: ComponentFixture<AddWebpagesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWebpagesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWebpagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
