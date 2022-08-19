/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { TableManager } from './manager/table.manager';
import { StorageHelper } from './helper/storage.helper';
<<<<<<< HEAD
import { TDSManager } from './service/tds.manager';

export namespace TDS {
  export const init = (params: {
    readonly appKey: string;
    readonly url: string;
    readonly language?: 'zh-CN' | 'en';
    readonly salt?: string;
=======
import { TDSManager } from './service/TDSManager';
import { Language } from '@towify-serverless/scf-api';

export namespace TDS {
  export const init = (params: {
    appKey: string;
    url: string;
    language?: Language;
    salt?: string;
>>>>>>> 34a5614f74c849426dde53010448c9bcafeae9a0
  }) => new TDSManager(params);

  export const Table = TableManager;

  export const Helper = StorageHelper;
}
