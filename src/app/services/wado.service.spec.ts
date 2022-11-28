import { TestBed } from '@angular/core/testing';

import { WADOService } from './wado.service';

describe('WADOService', () => {
  let service: WADOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WADOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
