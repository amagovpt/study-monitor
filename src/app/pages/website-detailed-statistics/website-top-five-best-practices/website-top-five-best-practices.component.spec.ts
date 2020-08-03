import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteTopFiveBestPracticesComponent } from './website-top-five-best-practices.component';

describe('WebsiteTopFiveBestPracticesComponent', () => {
  let component: WebsiteTopFiveBestPracticesComponent;
  let fixture: ComponentFixture<WebsiteTopFiveBestPracticesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteTopFiveBestPracticesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteTopFiveBestPracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
