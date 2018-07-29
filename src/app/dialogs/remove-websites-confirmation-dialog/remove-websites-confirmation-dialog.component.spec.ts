import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveWebsitesConfirmationDialogComponent } from './remove-websites-confirmation-dialog.component';

describe('RemoveWebsitesConfirmationDialogComponent', () => {
  let component: RemoveWebsitesConfirmationDialogComponent;
  let fixture: ComponentFixture<RemoveWebsitesConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveWebsitesConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveWebsitesConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
