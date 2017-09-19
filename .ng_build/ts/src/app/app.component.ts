import { Component } from '@angular/core';
import { BlobService, UploadConfig, UploadParams } from './modules/blob/blob.module';
import { Config } from './config';

@Component({
  selector: 'app-root',
  template: `
    <h1>Angular Azure Blob Storage</h1>
    <input type="file" #file (change)="updateFiles(file.files)">
    <input type="button" (click)="upload()" value="Send">
    <p *ngIf="percent > 0">Progress: {{ percent }}%</p>
  `,
  styles: [`

  `]
})
export class AppComponent {
  /** The upload config */
  config: UploadConfig;
  /** The selected file */
  currentFile: File;
  /** The current percent to be displayed */
  percent: number;
  constructor (private blob: BlobService) {
    this.currentFile = null;
    this.config = null;
    this.percent = 0;
  }
  updateFiles (files) {
    this.currentFile = files[0];
  }
  upload () {
    if (this.currentFile !== null) {
      const baseUrl = this.blob.generateBlobUrl(Config, this.currentFile.name);
      this.config = {
        baseUrl: baseUrl,
        sasToken: Config.sas,
        file: this.currentFile,
        complete: () => {
          console.log('Transfer completed !');
        },
        error: () => {
          console.log('Error !');
        },
        progress: (percent) => {
          this.percent = percent;
        }
      };
      this.blob.upload(this.config);
    }
  }
}
