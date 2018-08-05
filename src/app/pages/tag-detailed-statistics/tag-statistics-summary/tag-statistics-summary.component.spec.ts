import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagStatisticsSummaryComponent } from './tag-statistics-summary.component';

describe('TagStatisticsSummaryComponent', () => {
  let component: TagStatisticsSummaryComponent;
  let fixture: ComponentFixture<TagStatisticsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagStatisticsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagStatisticsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
