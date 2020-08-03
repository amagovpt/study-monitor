import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteTopFiveErrorsComponent } from './website-top-five-errors.component';

describe('WebsiteTopFiveErrorsComponent', () => {
  let component: WebsiteTopFiveErrorsComponent;
  let fixture: ComponentFixture<WebsiteTopFiveErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteTopFiveErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteTopFiveErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
