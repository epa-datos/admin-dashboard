import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphBarHorizontalComponent } from './graph-bar-horizontal.component';

describe('GraphBarHorizontalComponent', () => {
  let component: GraphBarHorizontalComponent;
  let fixture: ComponentFixture<GraphBarHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphBarHorizontalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphBarHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
