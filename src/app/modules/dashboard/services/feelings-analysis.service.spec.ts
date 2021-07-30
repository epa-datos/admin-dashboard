import { TestBed } from '@angular/core/testing';

import { FeelingsAnalysisService } from './feelings-analysis.service';

describe('FeelingsAnalysisService', () => {
  let service: FeelingsAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeelingsAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
