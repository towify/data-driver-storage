/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { TableManager } from './manager/table.manager';
import { TDSManager } from './service/tds.manager';

export namespace TDS {
  export const init = (params: {
    readonly appKey: string;
    readonly url: string;
    readonly language?: 'zh-CN' | 'en';
    readonly salt?: string;
  }) => new TDSManager(params);

  export const Table = TableManager;
}
