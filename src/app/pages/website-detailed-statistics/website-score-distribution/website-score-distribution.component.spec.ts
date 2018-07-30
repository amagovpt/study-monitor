import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteScoreDistributionComponent } from './website-score-distribution.component';

describe('WebsiteScoreDistributionComponent', () => {
  let component: WebsiteScoreDistributionComponent;
  let fixture: ComponentFixture<WebsiteScoreDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteScoreDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteScoreDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
