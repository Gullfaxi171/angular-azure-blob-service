import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

import { BlobService } from './blob.service'
export { BlobService } from './blob.service'
export { UploadConfig, UploadParams } from './definitions'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  exports: []
})
export class BlobModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BlobModule,
      providers: [
        BlobService
      ]
    }
  }
}
