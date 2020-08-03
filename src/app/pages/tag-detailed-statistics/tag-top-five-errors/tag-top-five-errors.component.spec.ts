import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagTopFiveErrorsComponent } from './tag-top-five-errors.component';

describe('TagTopFiveErrorsComponent', () => {
  let component: TagTopFiveErrorsComponent;
  let fixture: ComponentFixture<TagTopFiveErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagTopFiveErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagTopFiveErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
