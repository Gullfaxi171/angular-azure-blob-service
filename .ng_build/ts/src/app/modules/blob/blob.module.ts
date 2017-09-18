import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { BlobService } from './blob.service';

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
