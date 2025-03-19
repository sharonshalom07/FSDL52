import { TestBed } from '@angular/core/testing';

import { TimeCapsuleService } from './time-capsule.service';

describe('TimeCapsuleService', () => {
  let service: TimeCapsuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeCapsuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
