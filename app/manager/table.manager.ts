/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { ITableManager } from './table-manager.interface';
import {
  FieldValueEnum,
  FieldValueType,
  LiveObjectType
} from '@towify-types/live-data';
import { QueryManager } from './query.manager';
import { FieldInfoModel, TableInfoModel } from '@towify/data-engine';
import { NanoIdHelper } from 'soid-data';
import { PermissionService } from '../service/permission.service';

export class TableManager implements ITableManager {
  #fields: FieldInfoModel[] = [];
  #fieldData: LiveObjectType = {};
  #destroyRowIds: string[] = [];

  constructor(private readonly tableHashName: string) {}

  get query(): QueryManager {
    return new QueryManager(this.tableHashName);
  }

  addField(type: FieldValueEnum, referenceTableHashName?: string): this {
    this.#fields.push(
      new FieldInfoModel(
        NanoIdHelper.short(),
        `Field-${NanoIdHelper.custom(4)}`,
        type,
        true,
        false,
        true,
        false,
        false,
        200,
        false,
        referenceTableHashName,
        false
      )
    );
    return this;
  }

  async create(): Promise<{ message?: string; hashName?: string }> {
    const hashName = NanoIdHelper.short();
    const table = new TableInfoModel(
      `Table-${NanoIdHelper.custom(4)}`,
      hashName,
      false,
      true,
      true,
      [],
      {
        creating: '*',
        deleting: '*',
        finding: '*',
        updating: '*'
      },
      'custom',
      undefined,
      false
    );
    const error = await table.save();
    if (error) return { message: error };
    return { hashName };
  }

  async delete(): Promise<string | undefined> {
    const table = await PermissionService.instance.getTable(this.tableHashName);
    return table?.destroy();
  }

  async save(): Promise<string | undefined> {
    const table = await PermissionService.instance.getTable(this.tableHashName);
    // 如果有 Field 就创建
    this.#fields.forEach(field => table?.addField(field));
    if (Object.values(this.#fieldData).length) {
      table?.addRow(this.#fieldData);
    }
    if (this.#destroyRowIds.length) {
      table?.removeRow(...this.#destroyRowIds);
    }
    const result = await table?.save();
    this.#clear();
    return result;
  }

  destroy(...rowId: string[]): this {
    this.#destroyRowIds.push(...rowId);
    return this;
  }

  set(fieldHashName: string, value: FieldValueType): this {
    this.#fieldData[fieldHashName] = value;
    return this;
  }

  #clear() {
    this.#fields = [];
    this.#fieldData = {};
    this.#destroyRowIds = [];
  }
}
