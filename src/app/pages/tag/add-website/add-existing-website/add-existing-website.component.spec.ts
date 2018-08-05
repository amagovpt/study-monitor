import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExistingWebsiteComponent } from './add-existing-website.component';

describe('AddExistingWebsiteComponent', () => {
  let component: AddExistingWebsiteComponent;
  let fixture: ComponentFixture<AddExistingWebsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExistingWebsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExistingWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
