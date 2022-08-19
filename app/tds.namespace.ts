/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { TableManager } from './manager/table.manager';
import { StorageHelper } from './helper/storage.helper';
import { TDSManager } from './service/TDSManager';
import { Language } from '@towify-serverless/scf-api';

export namespace TDS {
  export const init = (params: {
    appKey: string;
    url: string;
    language?: Language;
    salt?: string;
  }) => new TDSManager(params);

  export const Table = TableManager;

  export const Helper = StorageHelper;
}
