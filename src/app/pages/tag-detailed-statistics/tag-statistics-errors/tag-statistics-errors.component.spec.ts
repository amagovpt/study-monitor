import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagStatisticsErrorsComponent } from './tag-statistics-errors.component';

describe('TagStatisticsErrorsComponent', () => {
  let component: TagStatisticsErrorsComponent;
  let fixture: ComponentFixture<TagStatisticsErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagStatisticsErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagStatisticsErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
