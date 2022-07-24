/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { FieldValueEnum, FieldValueType } from '@towify-types/live-data';

export interface ITableManager {
  /** 注册 Table */
  create(): Promise<{ message?: string; hashName?: string }>;

  /**
   * @param type
   * @param referenceTableHashName
   * 如果设定了 关联表 那么需要描述关联表的 TableHashName
   * */
  addField(type: FieldValueEnum, referenceTableHashName?: string): this;

  /** 存储前标记的存储数据 */
  set(fieldHashName: string, value: FieldValueType): this;

  /** 删除 Row */
  destroy(...rowId: string[]): this;

  /** 执行存贮 */
  save(): Promise<string | undefined>;

  /** 执行删除 Table */
  delete(): Promise<string | undefined>;
}
