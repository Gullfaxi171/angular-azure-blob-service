import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class BlobService {
    constructor() { }
}
BlobService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
BlobService.ctorParameters = () => [];

class BlobModule {
}
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
BlobModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { BlobModule, BlobService as ɵa };
//# sourceMappingURL=angular-azure-blob-service.js.map
