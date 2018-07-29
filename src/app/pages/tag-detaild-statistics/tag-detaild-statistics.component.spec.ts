import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDetaildStatisticsComponent } from './tag-detaild-statistics.component';

describe('TagDetaildStatisticsComponent', () => {
  let component: TagDetaildStatisticsComponent;
  let fixture: ComponentFixture<TagDetaildStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagDetaildStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagDetaildStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
