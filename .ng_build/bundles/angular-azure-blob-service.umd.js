(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global['angular-azure-blob-service'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

var BlobService = (function () {
    function BlobService() {
    }
    return BlobService;
}());
BlobService.decorators = [
    { type: core.Injectable },
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
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
                ],
                declarations: [],
                exports: [BlobService]
            },] },
];
/**
 * @nocollapse
 */
BlobModule.ctorParameters = function () { return []; };

exports.BlobModule = BlobModule;
exports.ɵa = BlobService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-azure-blob-service.umd.js.map
