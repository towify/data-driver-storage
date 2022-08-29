/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { ScfClientManager } from '@towify/scf-engine';

import {
  FieldValueType,
  LiveObjectType,
  QueryConditionEnum,
  QueryFieldPathType,
  QueryFilterDetailType,
  QueryFilterType,
  SortEnum
} from '@towify-types/live-data';
import { EventQueryHelper } from '@towify/event-query-helper';
import { SCF } from '@towify-serverless/scf-api';
import { Md5 } from 'soid-data';

export class TDSManager {
  public readonly scf: ScfClientManager;

  constructor(params: {
    readonly appKey: string;
    readonly url: string;
    readonly language?: 'zh-CN' | 'en';
    readonly salt?: string;
  }) {
    this.scf = new ScfClientManager({
      apiUrl: params.url,
      language: params.language as any,
      appKey: params.appKey,
      salt: params.salt
    });
  }

  resetToken(token: string) {
    this.scf.token = token;
    return this;
  }

  resetAppKey(appKey: string) {
    this.scf.appKey = appKey;
    return this;
  }

  /**
   * @param params.needEncrypted
   * 如果是 password 或其他需要加密的值这里传 true
   * */
  public async add(params: {
    tableHashName: string;
    row: LiveObjectType;
    client?: 'Simulator' | 'DataDriver';
    needEncrypted?: boolean;
  }): Promise<{ message?: string; row?: LiveObjectType }> {
    const response = await this.scf.call<SCF.LiveTableCreateItem>({
      path: '/livetable/data/createOne',
      params: {
        tableId: params.tableHashName,
        data: this.#formatRowValue(params.row, params.needEncrypted),
        client: params.client
      },
      method: 'post',
      ignoreToken: false
    });
    if (response.errorMessage || !response.data)
      return { message: response.errorMessage };
    return { row: response.data };
  }

  public async bulkAdd(params: {
    tableHashName: string;
    rows: LiveObjectType[];
    client?: 'Simulator' | 'DataDriver';
  }): Promise<{ message?: string; data?: LiveObjectType[] }> {
    const { errorMessage, data } =
      await this.scf.call<SCF.LiveTableCreateBulkItems>({
        path: '/livetable/data/createMany',
        params: {
          tableId: params.tableHashName,
          data: params.rows.map(row => this.#formatRowValue(row))
        },
        method: 'post',
        ignoreToken: false
      });
    // eslint-disable-next-line no-console
    console.debug('TOWIFY DEBUG: from tds engine', data);
    if (errorMessage || !data) return { message: errorMessage };
    else return { data };
  }

  async find(params: {
    tableHashName: string;
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
    client?: 'Simulator' | 'DataDriver';
  }): Promise<{
    message?: string;
    data?: { list: LiveObjectType[]; count?: number };
  }> {
    const findContent = EventQueryHelper.convertToScfFindContent({
      tableHashName: params.tableHashName,
      preconditions: params.precondition,
      executor: {
        queries: params.queries || [],
        sort: params.sorts?.map(sort => [
          sort.fieldHashName || 'createdAt',
          sort.type
        ]),
        limit: params.pageCount,
        skip: params.pageCount * params.pageIndex
      }
    });
    const response = await this.scf.call<SCF.LiveTableFindTableItems>({
      path: '/livetable/data/find',
      params: {
        content: findContent,
        executorId: params.executorId,
        token: params.customerToken,
        client: params.client
      },
      method: 'post',
      ignoreToken: params.ignoreToken === true
    });
    if (response.errorMessage || !response.data) {
      return { message: response.errorMessage };
    }
    if (!response.data.list.length && params.pageIndex === 0) {
      return { data: { list: [], count: 0 } };
    }
    return { data: response.data };
  }

  async count(params: {
    tableHashName: string;
    precondition?: {
      needToken: boolean;
      queries: QueryFilterDetailType[];
    };
    queries?: {
      fieldPath: QueryFieldPathType;
      value: FieldValueType | FieldValueType[];
      condition: QueryConditionEnum;
    }[];
    executorId: string;
    customerToken: string;
    ignoreToken?: boolean;
  }): Promise<{
    message?: string;
    count?: number;
  }> {
    const findContent = EventQueryHelper.convertToScfFindContent({
      tableHashName: params.tableHashName,
      preconditions: params.precondition,
      executor: {
        queries: params.queries || [],
        sort: [],
        limit: 0,
        skip: 0
      }
    });
    const response = await this.scf.call<SCF.LiveTableCountTableItems>({
      path: '/livetable/data/count',
      params: {
        content: {
          precondition: findContent.precondition,
          executor: {
            query: findContent.executor.query
          }
        },
        executorId: params.executorId,
        token: params.customerToken
      },
      method: 'post',
      ignoreToken: params.ignoreToken === true
    });
    if (response.errorMessage || response.data?.count === undefined)
      return { message: response.errorMessage };
    return { count: response.data.count };
  }

  async removeRow(params: {
    tableHashName: string;
    ids: string[];
    ignoreToken?: boolean;
    client?: 'Simulator' | 'DataDriver';
  }): Promise<string | undefined> {
    const filter: { [id: string]: { [condition: string]: string[] } } = {};
    // 删除多条拼出一个 in 的查找 filter
    const condition: { [condition: string]: string[] } = {};
    condition.$in = params.ids;
    filter._id = condition;
    const response = await this.scf.call<SCF.LiveTableDeleteItem>({
      path: '/livetable/data/delete',
      params: {
        tableId: params.tableHashName,
        filter,
        client: params.client
      },
      method: 'post',
      ignoreToken: params.ignoreToken === true
    });
    return response?.errorMessage;
  }

  async updateRowsWithQueries(params: {
    tableHashName: string;
    queries?: {
      fieldPath: QueryFieldPathType;
      value: FieldValueType | FieldValueType[];
      condition: QueryConditionEnum;
    }[];
    fieldInfo: {
      hashName: string;
      isIncrement?: boolean;
      content: FieldValueType;
    }[];
    ignoreToken?: boolean;
    client?: 'Simulator' | 'DataDriver';
  }) {
    const data: LiveObjectType = {};
    let incrementData: { [fieldHashName: string]: number } | undefined;
    params.fieldInfo.forEach(info => {
      if (info.isIncrement) {
        incrementData ??= {};
        incrementData[info.hashName] = <number>info.content;
      } else {
        data[info.hashName] = info.content;
      }
    });
    const findContent = EventQueryHelper.convertToScfFindContent({
      tableHashName: params.tableHashName,
      executor: {
        queries: params.queries || []
      }
    });
    const response = await this.scf.call<SCF.LiveTableUpdateItem>({
      path: '/livetable/data/update',
      params: {
        ...findContent.executor.query,
        data,
        incrementData,
        client: params.client
      },
      method: 'post',
      ignoreToken: params.ignoreToken === true
    });
    return response.errorMessage;
  }

  async updateRow(params: {
    tableHashName: string;
    rowId: string;
    fieldInfo: {
      hashName: string;
      isIncrement?: boolean;
      content: FieldValueType;
    }[];
    ignoreToken?: boolean;
    client?: 'Simulator' | 'DataDriver';
  }): Promise<string | undefined> {
    const filter: QueryFilterType = {};
    const data: LiveObjectType = {};
    let incrementData: { [fieldHashName: string]: number } | undefined;
    params.fieldInfo.forEach(info => {
      filter._id = { $eq: params.rowId };
      if (info.isIncrement) {
        incrementData ??= {};
        incrementData[info.hashName] = <number>info.content;
      } else {
        data[info.hashName] = info.content;
      }
    });
    const response = await this.scf.call<SCF.LiveTableUpdateItem>({
      path: '/livetable/data/update',
      params: {
        tableId: params.tableHashName,
        filter,
        data,
        incrementData,
        client: params.client
      },
      method: 'post',
      ignoreToken: params.ignoreToken === true
    });
    return response.errorMessage;
  }

  /**
   * 有些 Row 的 Value 在 LiveTable 中的显示需要特殊处理，例如密码，这里要做的就是
   * 把这些特殊显示的值甄别出来并加以加工
   * */
  #formatRowValue(row: LiveObjectType, needEncrypt?: boolean) {
    for (const [fieldHashName, value] of Object.entries(row)) {
      if (needEncrypt) {
        row[fieldHashName] = <string>Md5.hashStr(<string>value);
      }
    }
    return row;
  }
}
