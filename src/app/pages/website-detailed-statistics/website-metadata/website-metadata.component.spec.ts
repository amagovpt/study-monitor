import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteMetadataComponent } from './website-metadata.component';

describe('WebsiteMetadataComponent', () => {
  let component: WebsiteMetadataComponent;
  let fixture: ComponentFixture<WebsiteMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
