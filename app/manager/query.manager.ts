/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { IQueryManager } from './query-manager.interface';
import {
  FieldValueType,
  LiveObjectType,
  QueryConditionEnum,
  QueryFieldPathType,
  QueryFilterDetailType,
  SortEnum
} from '@towify-types/live-data';
import { NanoIdHelper } from 'soid-data';
import { TDSManager } from './tds.manager';

export class QueryManager implements IQueryManager {
  #data: {
    pageCount: number;
    pageIndex: number;
    precondition?: {
      needToken: boolean;
      queries: QueryFilterDetailType[];
    };
    queries?: {
      fieldPath: QueryFieldPathType;
      value: FieldValueType | FieldValueType[];
      condition: QueryConditionEnum;
    }[];
    sorts?: { fieldHashName?: string; type: SortEnum }[];
    executorId: string;
    customerToken: string;
    ignoreToken?: boolean;
  };

  #queries: {
    fieldPath: QueryFieldPathType;
    value: FieldValueType | FieldValueType[];
    condition: QueryConditionEnum;
  }[] = [];

  #sorts: { fieldHashName?: string; type: SortEnum }[] = [];

  constructor(
    private readonly tableHashName: string,
    private readonly tds: TDSManager
  ) {
    this.#data = {
      precondition: {
        needToken: false,
        queries: []
      },
      pageCount: 100,
      pageIndex: 0,
      executorId: '',
      customerToken: ''
    };
  }

  async destroy(): Promise<string | undefined> {
    // todo 增加 query 后直接 remove 的 方法
    return Promise.resolve(undefined);
  }

  async find(): Promise<{
    message?: string;
    data?: {
      list: LiveObjectType[];
      count?: number;
    };
  }> {
    this.#prepareData();
    this.#data.ignoreToken = true;
    console.debug(this.#data, 'TOWIFY STORAGE: find method parameters.');
    const result = await this.tds.find({
      tableHashName: this.tableHashName,
      ...this.#data
    });
    this.#clear();
    return result;
  }

  async first(): Promise<{
    message?: string;
    data?: LiveObjectType;
  }> {
    this.#prepareData();
    const result = await this.tds.find({
      tableHashName: this.tableHashName,
      ...this.#data
    });
    this.#clear();
    return { message: result.message, data: result.data?.list[0] };
  }

  async count(): Promise<{ message?: string; count?: number }> {
    this.#prepareData();
    const result = await this.tds.count({
      tableHashName: this.tableHashName,
      ...this.#data
    });
    this.#clear();
    return result;
  }

  ascending(fieldHashName: string): this {
    this.#sorts.push({ fieldHashName, type: SortEnum.Ascending });
    return this;
  }

  descending(fieldHashName: string): this {
    this.#sorts.push({ fieldHashName, type: SortEnum.Descending });
    return this;
  }

  contains(fieldPath: QueryFieldPathType, value: string): this {
    this.#queries.push({
      fieldPath,
      value,
      condition: QueryConditionEnum.Contains
    });
    return this;
  }

  some(fieldPath: QueryFieldPathType, value: string): this {
    this.#queries.push({
      fieldPath,
      value,
      condition: QueryConditionEnum.Some
    });
    return this;
  }

  containsIn(fieldPath: QueryFieldPathType, value: string[]): this {
    this.#queries.push({
      fieldPath,
      value,
      condition: QueryConditionEnum.ContainsIn
    });
    return this;
  }

  doesNotContain(fieldPath: QueryFieldPathType, value: string): this {
    this.#queries.push({
      fieldPath,
      value,
      condition: QueryConditionEnum.DoesNotContain
    });
    return this;
  }

  containsAll(fieldPath: QueryFieldPathType, value: FieldValueType[]): this {
    this.#queries.push({
      fieldPath,
      value,
      condition: QueryConditionEnum.DoesNotContain
    });
    return this;
  }

  include(fieldPath: QueryFieldPathType, value: string): this {
    this.#queries.push({
      fieldPath,
      value,
      condition: QueryConditionEnum.ContainsIn
    });
    return this;
  }

  doesNotExist(fieldPath: QueryFieldPathType): this {
    this.#queries.push({
      fieldPath,
      value: '',
      condition: QueryConditionEnum.IsEmpty
    });
    return this;
  }

  exists(fieldPath: QueryFieldPathType): this {
    this.#queries.push({
      fieldPath,
      value: '',
      condition: QueryConditionEnum.IsNotEmpty
    });
    return this;
  }

  equalTo(fieldPath: QueryFieldPathType, value: FieldValueType): this {
    this.#queries.push({ fieldPath, value, condition: QueryConditionEnum.Is });
    return this;
  }

  greaterThan(fieldPath: QueryFieldPathType, value: number | Date): this {
    this.#queries.push({
      fieldPath,
      value,
      condition: QueryConditionEnum.GreaterThan
    });
    return this;
  }

  greaterThanOrEqualTo(
    fieldPath: QueryFieldPathType,
    value: number | Date
  ): this {
    this.#queries.push({
      fieldPath,
      value,
      condition: QueryConditionEnum.GreaterThanOrEqualTo
    });
    return this;
  }

  lessThan(fieldPath: QueryFieldPathType, value: number | Date): this {
    this.#queries.push({
      fieldPath,
      value,
      condition: QueryConditionEnum.LessThan
    });
    return this;
  }

  lessThanOrEqualTo(fieldPath: QueryFieldPathType, value: number | Date): this {
    this.#queries.push({
      fieldPath,
      value,
      condition: QueryConditionEnum.LessThanOrEqualTo
    });
    return this;
  }

  notEqualTo(fieldPath: QueryFieldPathType, value: FieldValueType): this {
    this.#queries.push({
      fieldPath,
      value,
      condition: QueryConditionEnum.IsNot
    });
    return this;
  }

  startWith(fieldPath: QueryFieldPathType, value: string): this {
    this.#queries.push({
      fieldPath,
      value,
      condition: QueryConditionEnum.StartWith
    });
    return this;
  }

  endWith(fieldPath: QueryFieldPathType, value: string): this {
    this.#queries.push({
      fieldPath,
      value,
      condition: QueryConditionEnum.EndWith
    });
    return this;
  }

  pageIndex(count: number): this {
    this.#data.pageIndex = count;
    return this;
  }

  skip(count: number): this {
    if (count < 1) throw new Error('TDS ERROR: Invalid Skip Count');
    this.#data.pageCount = count;
    return this;
  }

  #clear() {
    this.#data = {
      pageCount: 100,
      pageIndex: 0,
      executorId: NanoIdHelper.short(),
      customerToken: ''
    };
    this.#queries = [];
    this.#sorts = [];
  }

  #prepareData() {
    this.#data.queries = this.#queries;
    this.#data.sorts = this.#sorts;
  }
}
