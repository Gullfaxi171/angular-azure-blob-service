import { Component } from '@angular/core'
import { BlobService, UploadConfig, UploadParams } from './modules/blob/blob.module'
import { Config } from './config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /** The upload config */
  config: UploadConfig
  /** The selected file */
  currentFile: File
  /** The current percent to be displayed */
  percent: number
  constructor (private blob: BlobService) {
    this.currentFile = null
    this.config = null
    this.percent = 0
  }
  updateFiles (files) {
    this.currentFile = files[0]
  }
  upload () {
    if (this.currentFile !== null) {
      const baseUrl = this.blob.generateBlobUrl(Config, this.currentFile.name)
      this.config = {
        baseUrl: baseUrl,
        blockSize: 1024 * 32,
        sasToken: Config.sas,
        file: this.currentFile,
        complete: () => {
          console.log('Transfer completed !')
        },
        error: (err) => {
          console.log('Error:', err)
        },
        progress: (percent) => {
          this.percent = percent
        }
      }
      this.blob.upload(this.config)
    }
  }
}
