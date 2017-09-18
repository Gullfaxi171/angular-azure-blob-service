import { UploadParams } from './modules/blob';

let sas = '?sv=2017-04-17&ss=bfqt&srt=sco&sp=rwdlacup&se=2021-07-31T23:13:42Z&st=2017-09-11T15:13:42Z'
sas += '&spr=https,http&sig=8IxzO1jdThPmsmUr4dH9%2BRNKCi%2Bl1HmH4OR9mimEv34%3D'

export const Config: UploadParams = {
  sas: sas,
  storageAccount: 'radevstorageaccount',
  containerName: 'oresys'
};
