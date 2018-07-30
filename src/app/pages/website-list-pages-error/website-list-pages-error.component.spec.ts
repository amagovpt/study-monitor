import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteListPagesErrorComponent } from './website-list-pages-error.component';

describe('WebsiteListPagesErrorComponent', () => {
  let component: WebsiteListPagesErrorComponent;
  let fixture: ComponentFixture<WebsiteListPagesErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteListPagesErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteListPagesErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
