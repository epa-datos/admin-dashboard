import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiencesWrapperComponent } from './audiences-wrapper.component';

describe('AudiencesWrapperComponent', () => {
  let component: AudiencesWrapperComponent;
  let fixture: ComponentFixture<AudiencesWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudiencesWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiencesWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
