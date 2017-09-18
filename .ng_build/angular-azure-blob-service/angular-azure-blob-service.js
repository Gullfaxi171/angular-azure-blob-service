import { Injectable, NgModule } from '@angular/core';
import { Headers, Http, HttpModule, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';

class BlobService {
    /**
     * @param {?} http
     */
    constructor(http$$1) {
        this.http = http$$1;
    }
    /**
     * @param {?} params
     * @param {?} filename
     * @return {?}
     */
    generateBlobUrl(params, filename) {
        return 'https://' + params.storageAccount + '.blob.core.windows.net/' + params.containerName + '/' + filename;
    }
    /**
     * @param {?} reader
     * @param {?} state
     * @return {?}
     */
    uploadFileInBlocks(reader, state) {
        if (!state.cancelled) {
            if (state.totalBytesRemaining > 0) {
                const /** @type {?} */ fileContent = state.file.slice(state.currentFilePointer, state.currentFilePointer + state.maxBlockSize);
                const /** @type {?} */ blockId = state.blockIdPrefix + this.prependZeros(state.blockIds.length, 6);
                state.blockIds.push(btoa(blockId));
                reader.readAsArrayBuffer(fileContent);
                state.currentFilePointer += state.maxBlockSize;
                state.totalBytesRemaining -= state.maxBlockSize;
                if (state.totalBytesRemaining < state.maxBlockSize) {
                    state.maxBlockSize = state.totalBytesRemaining;
                }
            }
            else {
                this.commitBlockList(state);
            }
        }
    }
    /**
     * @param {?} state
     * @return {?}
     */
    commitBlockList(state) {
        const /** @type {?} */ uri = state.fileUrl + '&comp=blocklist';
        const /** @type {?} */ headers = new Headers({ 'x-ms-blob-content-type': state.file.type });
        const /** @type {?} */ options = new RequestOptions({ headers: headers });
        let /** @type {?} */ requestBody = '<?xml version=\'1.0\' encoding=\'utf-8\'?><BlockList>';
        for (let /** @type {?} */ i = 0; i < state.blockIds.length; i++) {
            requestBody += '<Latest>' + state.blockIds[i] + '</Latest>';
        }
        requestBody += '</BlockList>';
        this.http.put(uri, requestBody, options)
            .subscribe(elem => {
            if (state.complete) {
                state.complete();
            }
        }, err => {
            if (state.error) {
                state.error();
            }
        });
    }
    /**
     * @param {?} config
     * @return {?}
     */
    initializeState(config) {
        let /** @type {?} */ blockSize = BlobService.DefaultBlockSize;
        if (config.blockSize) {
            blockSize = config.blockSize;
        }
        let /** @type {?} */ maxBlockSize = blockSize;
        let /** @type {?} */ numberOfBlocks = 1;
        const /** @type {?} */ file = config.file;
        const /** @type {?} */ fileSize = file.size;
        if (fileSize < blockSize) {
            maxBlockSize = fileSize;
        }
        if (fileSize % maxBlockSize === 0) {
            numberOfBlocks = fileSize / maxBlockSize;
        }
        else {
            numberOfBlocks = fileSize / maxBlockSize + 1;
        }
        return {
            maxBlockSize: maxBlockSize,
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
        };
    }
    /**
     * @param {?} config
     * @return {?}
     */
    upload(config) {
        const /** @type {?} */ state = this.initializeState(config);
        const /** @type {?} */ reader = new FileReader();
        reader.onloadend = (evt) => {
            if (evt.target.readyState === 2 && !state.cancelled) {
                const /** @type {?} */ uri = state.fileUrl + '&comp=block&blockid=' + state.blockIds[state.blockIds.length - 1];
                const /** @type {?} */ requestData = evt.target.result;
                const /** @type {?} */ requestData2 = new Uint8Array(evt.target.result);
                const /** @type {?} */ headers = new Headers({ 'x-ms-blob-type': 'BlockBlob', 'Content-Type': 'application/octet-stream' });
                const /** @type {?} */ options = new RequestOptions({ headers: headers });
                // console.log(uri);
                this.http.put(uri, requestData, options)
                    .subscribe(elem => {
                    state.bytesUploaded += requestData2.length;
                    const /** @type {?} */ percentComplete = ((state.bytesUploaded / state.file.size) * 100).toFixed(2);
                    if (state.progress) {
                        state.progress(percentComplete, elem);
                    }
                    this.uploadFileInBlocks(reader, state);
                }, err => {
                    if (state.error) {
                        state.error();
                    }
                });
            }
        };
        this.uploadFileInBlocks(reader, state);
        return {
            cancel: () => {
                state.cancelled = true;
            }
        };
    }
    /**
     * @param {?} number
     * @param {?} length
     * @return {?}
     */
    prependZeros(number, length) {
        let /** @type {?} */ str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }
}
BlobService.DefaultBlockSize = 1024 * 32;
BlobService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
BlobService.ctorParameters = () => [
    { type: Http, },
];

class BlobModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: BlobModule,
            providers: [
                BlobService
            ]
        };
    }
}
BlobModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpModule
                ],
                declarations: [],
                exports: []
            },] },
];
/**
 * @nocollapse
 */
BlobModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { BlobService, BlobModule };
//# sourceMappingURL=angular-azure-blob-service.js.map
