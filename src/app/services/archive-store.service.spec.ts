import { TestBed } from '@angular/core/testing';

import { ArchiveStoreService } from './archive-store.service';

describe('ArchiveStoreService', () => {
  let service: ArchiveStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchiveStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
