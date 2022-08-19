/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { TableManager } from './manager/table.manager';
import { TDSManager } from './manager/tds.manager';

export namespace TDS {
  export const Manager = TDSManager;
  export const Table = TableManager;
}
