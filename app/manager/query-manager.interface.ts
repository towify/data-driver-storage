/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { Field, LiveObjectType, Query } from '@towify-types/live-data';

export interface IQueryManager {
  equalTo(fieldPath: Query.FieldPathType, value: Field.ValueType): this;

  notEqualTo(fieldPath: Query.FieldPathType, value: Field.ValueType): this;

  lessThan(fieldPath: Query.FieldPathType, value: number): this;

  lessThanOrEqualTo(fieldPath: Query.FieldPathType, value: number): this;

  greaterThan(fieldPath: Query.FieldPathType, value: number): this;

  greaterThanOrEqualTo(fieldPath: Query.FieldPathType, value: number): this;

  /** 可以用 contains 来查找某一属性值包含特定字符串的对象 */
  contains(fieldPath: Query.FieldPathType, value: string): this;

  /** 可以用 doesNotContain 来查找某一属性值包含特定字符串的对象 */
  doesNotContain(fieldPath: Query.FieldPathType, value: string): this;

  /** 可以用 containsAll 来查找某一属性值包含特定字符串的对象 */
  containsAll(fieldPath: Query.FieldPathType, value: Field.ValueType[]): this;

  /** 可以用 contains 来查找某一属性值包含特定字符串的对象 */
  include(fieldPath: Query.FieldPathType, value: string): this;

  /** 可以用 startsWith 来查找某一属性值以特定字符串开头的对象。和 SQL 中的 LIKE
   * 一样，你可以利用索引带来的优势 */
  startWith(fieldPath: Query.FieldPathType, value: string): this;

  endWith(fieldPath: Query.FieldPathType, value: string): this;

  some(fieldPath: Query.FieldPathType, value: string): this;

  pageIndex(count: number): this;

  /**
   * 可以通过设置 skip 来跳过一定数量的结果
   * 把 skip 和 limit 结合起来，就能实现翻页功能
   * */
  skip(count: number): this;

  /** 如果只需要一条结果，可以直接用 first */
  first(): Promise<{
    message?: string;
    data?: LiveObjectType;
  }>;

  /** 对于能够排序的属性，可以指定结果的排序规则 */
  ascending(fieldHashName: string): this;

  descending(fieldHashName: string): this;

  exists(fieldPath: Query.FieldPathType): this;

  doesNotExist(fieldHashName: Query.FieldPathType): this;

  count(): Promise<{ message?: string; count?: number }>;

  find(): Promise<{
    message?: string;
    data?: {
      list: LiveObjectType[];
      count?: number;
    };
  }>;

  destroy(): Promise<string | undefined>;
}
