[![Build Status](https://travis-ci.org/Gullfaxi171/angular-azure-blob-service.svg?branch=master)](https://travis-ci.org/Gullfaxi171/angular-azure-blob-service)

# angular-azure-blob-service
A simple module for communication with Azure Blob Storage from angular apps. Works with @angular 4.3+

## Installation

```
npm install angular-azure-blob-service
```

For older versions of @angular (<4.3) :
```
npm install angular-azure-blob-service@0.6.0
```

## Azure Configuration

TODO

## App Configuration

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
      blockSize: 1024 * 64, // OPTIONAL, default value is 1024 * 32
      file: this.currentFile,
      complete: () => {
        console.log('Transfer completed !');
      },
      error: (err) => {
        console.log('Error:', err);
      },
      progress: (percent) => {
        this.percent = percent;
      }
    };
    this.blob.upload(this.config);
  }
}
```

## CORS
In order to enable CORS, you should go to your Azure Portal and open the Storage Account. Once there, go to CORS and click "Add" to add a CORS RULE.

* Allowed origins : your URLs, separated by commas, including ports and http:// or https:// if necessary
* Allowed methods : your choice, you can for instance select all 7
* Allowed headers : x-ms-blob-type,Content-Type,x-ms-blob-content-type,x-ms-meta-target,x-ms-meta-source,x-ms-meta-data*
* Exposed headers : x-ms-meta-*
* Max age : your choice, for instance 200

you can find more info [here](https://dmrelease.blob.core.windows.net/azurestoragejssample/samples/sample-blob.html)

Todo :
- write the docs (how to configure cors, how to get the sas token)
- write tests
