import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlobService } from './blob.service';
export class BlobModule {
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
function BlobModule_tsickle_Closure_declarations() {
    /** @type {?} */
    BlobModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    BlobModule.ctorParameters;
}
//# sourceMappingURL=blob.module.js.map