export interface UploadParams {
  /** The SAS, that can be found in the storage account parameters */
  sas: string
  /** The name of the storage account ressource */
  storageAccount: string
  /** The name of the container */
  containerName: string
}

export interface UploadConfig {
  /** SAS Token */
  sasToken: string
  /** Base URL of the container */
  baseUrl: string
  /** The file that needs to be uploaded */
  file: File
  /** Blocksize (default 1024*32) */
  blockSize?: number
  /** Event triggered on complete */
  complete?: () => void
  /** Event triggered en error */
  error?: () => void
  /** Event fired on each progress update */
  progress?: (percent: number) => void
}
