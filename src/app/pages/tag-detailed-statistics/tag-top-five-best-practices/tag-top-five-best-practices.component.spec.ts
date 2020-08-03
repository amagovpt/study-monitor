import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagTopFiveBestPracticesComponent } from './tag-top-five-best-practices.component';

describe('TagTopFiveBestPracticesComponent', () => {
  let component: TagTopFiveBestPracticesComponent;
  let fixture: ComponentFixture<TagTopFiveBestPracticesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagTopFiveBestPracticesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagTopFiveBestPracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
