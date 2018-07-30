import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitePagesResultsComponent } from './website-pages-results.component';

describe('WebsitePagesResultsComponent', () => {
  let component: WebsitePagesResultsComponent;
  let fixture: ComponentFixture<WebsitePagesResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsitePagesResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsitePagesResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
