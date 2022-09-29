import { TestBed } from '@angular/core/testing';

import { InnsuranceService } from './innsurance.service';

describe('InnsuranceService', () => {
  let service: InnsuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InnsuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
