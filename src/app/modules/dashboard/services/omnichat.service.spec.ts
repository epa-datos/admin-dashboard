import { TestBed } from '@angular/core/testing';

import { OmnichatService } from './omnichat.service';

describe('OmnichatService', () => {
  let service: OmnichatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmnichatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
