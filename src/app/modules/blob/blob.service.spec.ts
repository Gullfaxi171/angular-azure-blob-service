import { TestBed, inject } from '@angular/core/testing'

import { BlobService } from './blob.service'
import { HttpClientModule } from '@angular/common/http'

describe('BlobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BlobService]
    })
  })

  it('should be created', inject([BlobService], (service: BlobService) => {
    expect(service).toBeTruthy()
  }))
})
