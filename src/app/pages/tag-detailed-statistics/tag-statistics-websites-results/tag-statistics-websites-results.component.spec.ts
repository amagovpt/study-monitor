import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagStatisticsWebsitesResultsComponent } from './tag-statistics-websites-results.component';

describe('TagStatisticsWebsitesResultsComponent', () => {
  let component: TagStatisticsWebsitesResultsComponent;
  let fixture: ComponentFixture<TagStatisticsWebsitesResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagStatisticsWebsitesResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagStatisticsWebsitesResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
