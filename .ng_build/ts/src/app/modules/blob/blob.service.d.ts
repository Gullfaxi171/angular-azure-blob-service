import { Http } from '@angular/http';
import { UploadParams } from './definitions';
export declare class BlobService {
    private http;
    static DefaultBlockSize: number;
    constructor(http: Http);
    generateBlobUrl(params: UploadParams, filename: string): string;
    private uploadFileInBlocks(reader, state);
    private commitBlockList(state);
    private initializeState(config);
    upload(config: any): {
        cancel: () => void;
    };
    private prependZeros(number, length);
}
