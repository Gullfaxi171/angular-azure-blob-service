import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { UploadParams, UploadConfig } from './definitions'
import { Observable } from 'rxjs/Rx'

@Injectable()
export class BlobService {
  static DefaultBlockSize = 1024 * 32
  constructor (private http: HttpClient) { }
  generateBlobUrl (
    params: UploadParams,
    filename: string,
    useAzureStorageEmulator = false,
    azureStorageEmulatorBaseUrl = '') {
    const url = useAzureStorageEmulator ? azureStorageEmulatorBaseUrl : `https://${params.storageAccount}.blob.core.windows.net`
    return `${url}/${params.containerName}/${filename}`
  }
  private uploadFileInBlocks (reader, state) {
      if (!state.cancelled) {
          if (state.totalBytesRemaining > 0) {
              const fileContent = state.file.slice(state.currentFilePointer, state.currentFilePointer + state.maxBlockSize)
              const blockId = state.blockIdPrefix + this.prependZeros(state.blockIds.length, 6)
              state.blockIds.push(btoa(blockId))
              reader.readAsArrayBuffer(fileContent)
              state.currentFilePointer += state.maxBlockSize
              state.totalBytesRemaining -= state.maxBlockSize
              if (state.totalBytesRemaining < state.maxBlockSize) {
                  state.maxBlockSize = state.totalBytesRemaining
              }
          } else {
              this.commitBlockList(state)
          }
      }
  }
  private commitBlockList (state) {
      const uri = state.fileUrl + '&comp=blocklist'
      const headers = new HttpHeaders({ 'x-ms-blob-content-type': state.file.type })
      let requestBody = '<?xml version=\'1.0\' encoding=\'utf-8\'?><BlockList>'
      for (let i = 0; i < state.blockIds.length; i++) {
          requestBody += '<Latest>' + state.blockIds[i] + '</Latest>'
      }
      requestBody += '</BlockList>'

      this.http.put(uri, requestBody, { headers: headers, responseType: 'text' })
        .subscribe(elem => {
          if (state.complete) {
            state.complete()
          }
        }, err => {
          console.log({ error: err })
        })
  }
  private initializeState (config: UploadConfig) {
      let blockSize = BlobService.DefaultBlockSize
      if (config.blockSize) {
        blockSize = config.blockSize
      }
      let maxBlockSize = blockSize
      let numberOfBlocks = 1
      const file = config.file
      const fileSize = file.size
      if (fileSize < blockSize) {
          maxBlockSize = fileSize
      }
      if (fileSize % maxBlockSize === 0) {
          numberOfBlocks = fileSize / maxBlockSize
      } else {
          numberOfBlocks = fileSize / maxBlockSize + 1
      }

      return {
          maxBlockSize: maxBlockSize, // Each file will be split in 256 KB.
          numberOfBlocks: numberOfBlocks,
          totalBytesRemaining: fileSize,
          currentFilePointer: 0,
          blockIds: new Array(),
          blockIdPrefix: 'block-',
          bytesUploaded: 0,
          submitUri: null,
          file: file,
          baseUrl: config.baseUrl,
          sasToken: config.sasToken,
          fileUrl: config.baseUrl + config.sasToken,
          progress: config.progress,
          complete: config.complete,
          error: config.error,
          cancelled: false
      }
  }
  upload (config: UploadConfig) {
    const state = this.initializeState(config)
    const reader = new FileReader()
    reader.onloadend = (evt: any) => {
      if (evt.target.readyState === 2 && !state.cancelled) {
        const uri = state.fileUrl + '&comp=block&blockid=' + state.blockIds[state.blockIds.length - 1]
        const requestData = evt.target.result
        const requestData2 = new Uint8Array(evt.target.result)
        const headers = new HttpHeaders({ 'x-ms-blob-type': 'BlockBlob', 'Content-Type': 'application/octet-stream' })
        this.http.put(uri, requestData, { headers: headers, responseType: 'text' })
          .subscribe(elem => {
            state.bytesUploaded += requestData2.length
            const percentComplete = Math.round((state.bytesUploaded / state.file.size) * 1000) / 10
            if (state.progress) {
              state.progress(percentComplete)
            }

            this.uploadFileInBlocks(reader, state)
          }, err => {
            console.log({ error: err })
          })
          }
      }

      this.uploadFileInBlocks(reader, state)

      return {
          cancel: () => {
              state.cancelled = true
          }
      }
  }
  private prependZeros (number, length) {
    let str = '' + number
    while (str.length < length) {
      str = '0' + str
    }
    return str
  }
  private handleAngularJsonBug (error: HttpErrorResponse, cb) {
   const JsonParseError = 'Http failure during parsing for'
   const matches = error.message.match(new RegExp(JsonParseError, 'ig'))

   if ((error.status === 200 || error.status === 201) && matches.length === 1) {
     // return obs that completes
     return Observable.empty()
   } else {
     cb()
     // return Observable.throw(error)		// re-throw
   }
 }
}
