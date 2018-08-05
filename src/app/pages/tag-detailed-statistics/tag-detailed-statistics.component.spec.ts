import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDetailedStatisticsComponent } from './tag-detailed-statistics.component';

describe('TagDetailedStatisticsComponent', () => {
  let component: TagDetailedStatisticsComponent;
  let fixture: ComponentFixture<TagDetailedStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagDetailedStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagDetailedStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
