import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagStatisticsScoreDistributionComponent } from './tag-statistics-score-distribution.component';

describe('TagStatisticsScoreDistributionComponent', () => {
  let component: TagStatisticsScoreDistributionComponent;
  let fixture: ComponentFixture<TagStatisticsScoreDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagStatisticsScoreDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagStatisticsScoreDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
