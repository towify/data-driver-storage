/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { TableManager } from './manager/table.manager';
import { StorageHelper } from './helper/storage.helper';
import { TDSService } from './service/tds.service';

export namespace TDS {
  export const init = (params: { appKey: string; url: string }) =>
    TDSService.init(params);

  export const Table = TableManager;

  export const Helper = StorageHelper;
}
