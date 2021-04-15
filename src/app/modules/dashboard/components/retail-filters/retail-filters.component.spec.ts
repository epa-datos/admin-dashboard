import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailFiltersComponent } from './retail-filters.component';

describe('RetailFiltersComponent', () => {
  let component: RetailFiltersComponent;
  let fixture: ComponentFixture<RetailFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
