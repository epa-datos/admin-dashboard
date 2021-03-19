import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmchartsComponent } from './amcharts.component';

describe('AmchartsComponent', () => {
  let component: AmchartsComponent;
  let fixture: ComponentFixture<AmchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmchartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
