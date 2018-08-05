import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagListWebsitesErrorComponent } from './tag-list-websites-error.component';

describe('TagListWebsitesErrorComponent', () => {
  let component: TagListWebsitesErrorComponent;
  let fixture: ComponentFixture<TagListWebsitesErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagListWebsitesErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagListWebsitesErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
