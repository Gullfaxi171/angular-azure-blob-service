import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlobService } from './blob.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [BlobService]
})
export class BlobModule { }
