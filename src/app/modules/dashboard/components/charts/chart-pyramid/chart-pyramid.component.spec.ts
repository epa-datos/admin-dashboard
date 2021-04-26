import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPyramidComponent } from './chart-pyramid.component';

describe('ChartPyramidComponent', () => {
  let component: ChartPyramidComponent;
  let fixture: ComponentFixture<ChartPyramidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartPyramidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPyramidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
