/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { ITableManager } from './table-manager.interface';
import type { LiveObjectType } from '@towify-types/live-data';
import { QueryManager } from './query.manager';
import { TDSManager } from './tds.manager';
import { Field } from '@towify-types/live-data';

export class TableManager implements ITableManager {
  #fieldData: LiveObjectType = {};

  constructor(
    private readonly tableHashName: string,
    private readonly tds: TDSManager
  ) {}

  get query(): QueryManager {
    return new QueryManager(this.tableHashName, this.tds);
  }

  async removeRow(...rowIds: string[]): Promise<string | undefined> {
    return this.tds?.removeRow({
      tableHashName: this.tableHashName,
      ids: rowIds,
      ignoreToken: true
    });
  }

  set(fieldHashName: string, value: Field.ValueType): this {
    this.#fieldData[fieldHashName] = value;
    return this;
  }

  public async add(
    row: LiveObjectType,
    needEncrypted?: boolean
  ): Promise<{ message?: string; row?: LiveObjectType }> {
    return this.tds?.add({
      tableHashName: this.tableHashName,
      row,
      needEncrypted
    });
  }

  async updateRow(
    rowId: string,
    ...fieldInfo: {
      hashName: string;
      isIncrement?: boolean;
      content: Field.ValueType;
    }[]
  ): Promise<string | undefined> {
    return this.tds?.updateRow({
      tableHashName: this.tableHashName,
      rowId,
      fieldInfo,
      ignoreToken: true
    });
  }
}
