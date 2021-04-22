import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewWrapperComponent } from './overview-wrapper.component';

describe('OverviewWrapperComponent', () => {
  let component: OverviewWrapperComponent;
  let fixture: ComponentFixture<OverviewWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
