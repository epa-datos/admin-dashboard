import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphHeatMapComponent } from './graph-heat-map.component';

describe('GraphHeatMapComponent', () => {
  let component: GraphHeatMapComponent;
  let fixture: ComponentFixture<GraphHeatMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphHeatMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphHeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
