import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagStatisticsPagesResultsComponent } from './tag-statistics-pages-results.component';

describe('TagStatisticsPagesResultsComponent', () => {
  let component: TagStatisticsPagesResultsComponent;
  let fixture: ComponentFixture<TagStatisticsPagesResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagStatisticsPagesResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagStatisticsPagesResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
