import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmnichatWrapperComponent } from './omnichat-wrapper.component';

describe('OmnichatWrapperComponent', () => {
  let component: OmnichatWrapperComponent;
  let fixture: ComponentFixture<OmnichatWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmnichatWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OmnichatWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
