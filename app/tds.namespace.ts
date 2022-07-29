/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { TDSService } from './service/TDSService';
import { TableManager } from './manager/table.manager';
import { StorageHelper } from './helper/storage.helper';

export namespace TDS {
  export const init = (params: {
    appId: string;
    appKey: string;
    url: string;
  }) => TDSService.init(params);

  export const Table = TableManager;

  export const Helper = StorageHelper;
}
