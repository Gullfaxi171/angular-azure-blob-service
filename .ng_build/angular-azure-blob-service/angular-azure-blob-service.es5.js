import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
var BlobService = (function () {
    function BlobService() {
    }
    return BlobService;
}());
BlobService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
BlobService.ctorParameters = function () { return []; };
var BlobModule = (function () {
    function BlobModule() {
    }
    return BlobModule;
}());
BlobModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [],
                exports: [BlobService]
            },] },
];
/**
 * @nocollapse
 */
BlobModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { BlobModule, BlobService as ɵa };
//# sourceMappingURL=angular-azure-blob-service.es5.js.map
