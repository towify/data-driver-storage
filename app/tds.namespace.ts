/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { PermissionService } from './service/permission.service';
import { TableManager } from './manager/table.manager';

export namespace TDS {
  export const init = (params: {
    appId: string;
    appKey: string;
    url: string;
  }) => PermissionService.init(params);

  export const Table = TableManager;
}
