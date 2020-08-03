import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteAccessibilityPlotComponent } from './website-accessibility-plot.component';

describe('WebsiteAccessibilityPlotComponent', () => {
  let component: WebsiteAccessibilityPlotComponent;
  let fixture: ComponentFixture<WebsiteAccessibilityPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteAccessibilityPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteAccessibilityPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
