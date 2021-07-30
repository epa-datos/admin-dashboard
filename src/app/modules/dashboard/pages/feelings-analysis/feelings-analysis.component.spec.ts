import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeelingsAnalysisComponent } from './feelings-analysis.component';

describe('FeelingsAnalysisComponent', () => {
  let component: FeelingsAnalysisComponent;
  let fixture: ComponentFixture<FeelingsAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeelingsAnalysisComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeelingsAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
