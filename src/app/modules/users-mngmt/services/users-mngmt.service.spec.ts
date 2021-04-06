import { TestBed } from '@angular/core/testing';

import { UsersMngmtService } from './users-mngmt.service';

describe('UsersMngmtService', () => {
  let service: UsersMngmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersMngmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
