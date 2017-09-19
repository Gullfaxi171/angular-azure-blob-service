[![Build Status](https://travis-ci.org/Gullfaxi171/angular-azure-blob-service.svg?branch=master)](https://travis-ci.org/Gullfaxi171/angular-azure-blob-service)

# angular-azure-blob-service
A simple module for communication with Azure Blob Storage from angular apps. Works with @angular 4

In your app.module.ts

```js
import { BlobModule } from 'angular-azure-blob-service';

@NgModule({
  ...
  imports: [
    BlobModule.forRoot()
  ],
  ...
})
```

In your component

```js
import { BlobService, UploadConfig, UploadParams } from 'angular-azure-blob-service'
```

```js
const Config: UploadParams = {
  sas: 'my sas',
  storageAccount: 'my dev storage account',
  containerName: 'my container name'
};
```

Upload the document

```js
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
```

Todo :
- write the docs (how to configure cors, how to get the sas token)
- test it !
