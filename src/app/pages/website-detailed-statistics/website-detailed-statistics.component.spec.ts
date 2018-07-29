import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteDetailedStatisticsComponent } from './website-detailed-statistics.component';

describe('WebsiteDetailedStatisticsComponent', () => {
  let component: WebsiteDetailedStatisticsComponent;
  let fixture: ComponentFixture<WebsiteDetailedStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteDetailedStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteDetailedStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
