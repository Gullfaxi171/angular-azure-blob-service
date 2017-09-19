import { TestBed, inject } from '@angular/core/testing';

import { BlobService } from './blob.service';
import { HttpModule } from '@angular/http';

describe('BlobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [BlobService]
    });
  });

  it('should be created', inject([BlobService], (service: BlobService) => {
    expect(service).toBeTruthy();
  }));
});
