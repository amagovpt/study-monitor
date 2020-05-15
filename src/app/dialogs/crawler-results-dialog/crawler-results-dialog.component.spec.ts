import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlResultsDialogComponent } from './crawler-results-dialog.component';

describe('CrawlResultsDialogComponent', () => {
  let component: CrawlResultsDialogComponent;
  let fixture: ComponentFixture<CrawlResultsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlResultsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
