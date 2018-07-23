import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTagsConfirmationDialogComponent } from './remove-tags-confirmation-dialog.component';

describe('RemoveTagsConfirmationDialogComponent', () => {
  let component: RemoveTagsConfirmationDialogComponent;
  let fixture: ComponentFixture<RemoveTagsConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveTagsConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveTagsConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
