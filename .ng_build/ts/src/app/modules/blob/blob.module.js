import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BlobService } from './blob.service';
export class BlobModule {
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