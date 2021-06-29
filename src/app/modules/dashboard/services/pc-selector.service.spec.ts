import { TestBed } from '@angular/core/testing';

import { PcSelectorService } from './pc-selector.service';

describe('PcSelectorService', () => {
  let service: PcSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
