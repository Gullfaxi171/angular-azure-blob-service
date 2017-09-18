import { TestBed, inject } from '@angular/core/testing';

import { BlobService } from './blob.service';

describe('BlobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlobService]
    });
  });

  it('should be created', inject([BlobService], (service: BlobService) => {
    expect(service).toBeTruthy();
  }));
});
