import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { BlobService } from './blob.service';
export { BlobService } from './blob.service';
export { UploadConfig, UploadParams } from './definitions';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
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
    };
  }
}
