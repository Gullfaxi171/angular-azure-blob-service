import { Injectable, NgModule } from '@angular/core';
import { Headers, Http, HttpModule, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
var BlobService = (function () {
    /**
     * @param {?} http
     */
    function BlobService(http$$1) {
        this.http = http$$1;
    }
    /**
     * @param {?} params
     * @param {?} filename
     * @return {?}
     */
    BlobService.prototype.generateBlobUrl = function (params, filename) {
        return 'https://' + params.storageAccount + '.blob.core.windows.net/' + params.containerName + '/' + filename;
    };
    /**
     * @param {?} reader
     * @param {?} state
     * @return {?}
     */
    BlobService.prototype.uploadFileInBlocks = function (reader, state) {
        if (!state.cancelled) {
            if (state.totalBytesRemaining > 0) {
                var /** @type {?} */ fileContent = state.file.slice(state.currentFilePointer, state.currentFilePointer + state.maxBlockSize);
                var /** @type {?} */ blockId = state.blockIdPrefix + this.prependZeros(state.blockIds.length, 6);
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
    };
    /**
     * @param {?} state
     * @return {?}
     */
    BlobService.prototype.commitBlockList = function (state) {
        var /** @type {?} */ uri = state.fileUrl + '&comp=blocklist';
        var /** @type {?} */ headers = new Headers({ 'x-ms-blob-content-type': state.file.type });
        var /** @type {?} */ options = new RequestOptions({ headers: headers });
        var /** @type {?} */ requestBody = '<?xml version=\'1.0\' encoding=\'utf-8\'?><BlockList>';
        for (var /** @type {?} */ i = 0; i < state.blockIds.length; i++) {
            requestBody += '<Latest>' + state.blockIds[i] + '</Latest>';
        }
        requestBody += '</BlockList>';
        this.http.put(uri, requestBody, options)
            .subscribe(function (elem) {
            if (state.complete) {
                state.complete();
            }
        }, function (err) {
            if (state.error) {
                state.error();
            }
        });
    };
    /**
     * @param {?} config
     * @return {?}
     */
    BlobService.prototype.initializeState = function (config) {
        var /** @type {?} */ blockSize = BlobService.DefaultBlockSize;
        if (config.blockSize) {
            blockSize = config.blockSize;
        }
        var /** @type {?} */ maxBlockSize = blockSize;
        var /** @type {?} */ numberOfBlocks = 1;
        var /** @type {?} */ file = config.file;
        var /** @type {?} */ fileSize = file.size;
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
    };
    /**
     * @param {?} config
     * @return {?}
     */
    BlobService.prototype.upload = function (config) {
        var _this = this;
        var /** @type {?} */ state = this.initializeState(config);
        var /** @type {?} */ reader = new FileReader();
        reader.onloadend = function (evt) {
            if (evt.target.readyState === 2 && !state.cancelled) {
                var /** @type {?} */ uri = state.fileUrl + '&comp=block&blockid=' + state.blockIds[state.blockIds.length - 1];
                var /** @type {?} */ requestData = evt.target.result;
                var /** @type {?} */ requestData2_1 = new Uint8Array(evt.target.result);
                var /** @type {?} */ headers = new Headers({ 'x-ms-blob-type': 'BlockBlob', 'Content-Type': 'application/octet-stream' });
                var /** @type {?} */ options = new RequestOptions({ headers: headers });
                // console.log(uri);
                _this.http.put(uri, requestData, options)
                    .subscribe(function (elem) {
                    state.bytesUploaded += requestData2_1.length;
                    var /** @type {?} */ percentComplete = ((state.bytesUploaded / state.file.size) * 100).toFixed(2);
                    if (state.progress) {
                        state.progress(percentComplete, elem);
                    }
                    _this.uploadFileInBlocks(reader, state);
                }, function (err) {
                    if (state.error) {
                        state.error();
                    }
                });
            }
        };
        this.uploadFileInBlocks(reader, state);
        return {
            cancel: function () {
                state.cancelled = true;
            }
        };
    };
    /**
     * @param {?} number
     * @param {?} length
     * @return {?}
     */
    BlobService.prototype.prependZeros = function (number, length) {
        var /** @type {?} */ str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    };
    return BlobService;
}());
BlobService.DefaultBlockSize = 1024 * 32;
BlobService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
BlobService.ctorParameters = function () { return [
    { type: Http, },
]; };
var BlobModule = (function () {
    function BlobModule() {
    }
    /**
     * @return {?}
     */
    BlobModule.forRoot = function () {
        return {
            ngModule: BlobModule,
            providers: [
                BlobService
            ]
        };
    };
    return BlobModule;
}());
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
BlobModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { BlobService, BlobModule };
//# sourceMappingURL=angular-azure-blob-service.es5.js.map
