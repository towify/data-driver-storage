/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { ITableManager } from './table-manager.interface';
import { FieldValueType, LiveObjectType } from '@towify-types/live-data';
import { QueryManager } from './query.manager';
import { TDSManager } from '../service/tds.manager';

export class TableManager implements ITableManager {
  #fieldData: LiveObjectType = {};

  constructor(private readonly tableHashName: string) {
  }

  get query(): QueryManager {
    return new QueryManager(this.tableHashName);
  }

  async removeRow(...rowIds: string[]): Promise<string | undefined> {
    return TDSManager.removeRow({
      tableHashName: this.tableHashName,
      ids: rowIds,
      ignoreToken: true
    });
  }

  set(fieldHashName: string, value: FieldValueType): this {
    this.#fieldData[fieldHashName] = value;
    return this;
  }

  async updateRow(
    rowId: string,
    ...fieldInfo: {
      hashName: string;
      isIncrement?: boolean;
      content: FieldValueType;
    }[]
  ): Promise<string | undefined> {
    return TDSManager.updateRow({
      tableHashName: this.tableHashName,
      rowId,
      fieldInfo,
      ignoreToken: true
    });
  }
}
