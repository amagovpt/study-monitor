import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesTableComponent } from './pages-table.component';

describe('PagesTableComponent', () => {
  let component: PagesTableComponent;
  let fixture: ComponentFixture<PagesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
