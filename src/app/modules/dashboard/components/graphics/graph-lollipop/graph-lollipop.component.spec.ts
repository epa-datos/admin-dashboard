import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphLollipopComponent } from './graph-lollipop.component';

describe('GraphLollipopComponent', () => {
  let component: GraphLollipopComponent;
  let fixture: ComponentFixture<GraphLollipopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphLollipopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphLollipopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
