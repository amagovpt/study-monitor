import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStudiesComponent } from './user-studies.component';

describe('UserStudiesComponent', () => {
  let component: UserStudiesComponent;
  let fixture: ComponentFixture<UserStudiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStudiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
