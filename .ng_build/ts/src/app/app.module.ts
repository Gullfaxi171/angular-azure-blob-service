import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BlobModule } from './modules/blob/blob.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BlobModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
