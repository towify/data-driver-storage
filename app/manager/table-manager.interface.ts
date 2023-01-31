/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { Field } from '@towify-types/live-data';

export interface ITableManager {
  /** 存储前标记的存储数据 */
  set(fieldHashName: string, value: Field.ValueType): this;

  /** 删除 Row */
  removeRow(...rowIds: string[]): Promise<string | undefined>;

  updateRow(
    rowId: string,
    ...fieldInfo: {
      hashName: string;
      isIncrement?: boolean;
      content: Field.ValueType;
    }[]
  ): Promise<string | undefined>;
}
