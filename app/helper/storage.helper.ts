/*
 * @author kaysaith
 * @date 2022/7/25
 */

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
<<<<<<< HEAD
import { TDSManager } from '../service/tds.manager';
=======
import { TDSManager } from '../service/TDSManager';
>>>>>>> 34a5614f74c849426dde53010448c9bcafeae9a0

export class StorageHelper {
  static async find(params: {
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
<<<<<<< HEAD
    const response = await TDSManager.scf.call<SCF.LiveTableFindTableItems>({
      path: '/livetable/data/find',
      params: {
        content: findContent,
        executorId: params.executorId,
        token: params.customerToken
      },
      method: 'post',
      ignoreToken: params.ignoreToken === true
    });
=======
    const response =
      await TDSManager.instance.scf.call<SCF.LiveTableFindTableItems>({
        path: '/livetable/data/find',
        params: {
          content: findContent,
          executorId: params.executorId,
          token: params.customerToken
        },
        method: 'post',
        ignoreToken: params.ignoreToken === true
      });
>>>>>>> 34a5614f74c849426dde53010448c9bcafeae9a0
    if (response.errorMessage || !response.data) {
      return { message: response.errorMessage };
    }
    if (!response.data.list.length && params.pageIndex === 0) {
      return { data: { list: [], count: 0 } };
    }
    return { data: response.data };
  }

  static async count(params: {
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
<<<<<<< HEAD
    const response = await TDSManager.scf.call<SCF.LiveTableCountTableItems>({
      path: '/livetable/data/count',
      params: {
        content: {
          precondition: findContent.precondition,
          executor: {
            query: findContent.executor.query
          }
=======
    const response =
      await TDSManager.instance.scf.call<SCF.LiveTableCountTableItems>({
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
>>>>>>> 34a5614f74c849426dde53010448c9bcafeae9a0
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

  static async removeRow(params: {
    tableHashName: string;
    ids: string[];
    ignoreToken?: boolean;
  }): Promise<string | undefined> {
    const filter: { [id: string]: { [condition: string]: string[] } } = {};
    // 删除多条拼出一个 in 的查找 filter
    const condition: { [condition: string]: string[] } = {};
    condition.$in = params.ids;
    filter._id = condition;
<<<<<<< HEAD
    const response = await TDSManager.scf.call<SCF.LiveTableDeleteItem>({
      path: '/livetable/data/delete',
      params: {
        tableId: params.tableHashName,
        filter
      },
      method: 'post',
      ignoreToken: params.ignoreToken === true
    });
=======
    const response =
      await TDSManager.instance.scf.call<SCF.LiveTableDeleteItem>({
        path: '/livetable/data/delete',
        params: {
          tableId: params.tableHashName,
          filter
        },
        method: 'post',
        ignoreToken: params.ignoreToken === true
      });
>>>>>>> 34a5614f74c849426dde53010448c9bcafeae9a0
    return response?.errorMessage;
  }

  static async updateRowsWithQueries(params: {
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
<<<<<<< HEAD
    const response = await TDSManager.scf.call<SCF.LiveTableUpdateItem>({
      path: '/livetable/data/update',
      params: {
        ...findContent.executor.query,
        data,
        incrementData
      },
      method: 'post',
      ignoreToken: params.ignoreToken === true
    });
=======
    const response =
      await TDSManager.instance.scf.call<SCF.LiveTableUpdateItem>({
        path: '/livetable/data/update',
        params: {
          ...findContent.executor.query,
          data,
          incrementData
        },
        method: 'post',
        ignoreToken: params.ignoreToken === true
      });
>>>>>>> 34a5614f74c849426dde53010448c9bcafeae9a0
    return response.errorMessage;
  }

  static async updateRow(params: {
    tableHashName: string;
    rowId: string;
    fieldInfo: {
      hashName: string;
      isIncrement?: boolean;
      content: FieldValueType;
    }[];
    ignoreToken?: boolean;
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
<<<<<<< HEAD
    const response = await TDSManager.scf.call<SCF.LiveTableUpdateItem>({
      path: '/livetable/data/update',
      params: {
        tableId: params.tableHashName,
        filter,
        data,
        incrementData
      },
      method: 'post',
      ignoreToken: params.ignoreToken === true
    });
=======
    const response =
      await TDSManager.instance.scf.call<SCF.LiveTableUpdateItem>({
        path: '/livetable/data/update',
        params: {
          tableId: params.tableHashName,
          filter,
          data,
          incrementData
        },
        method: 'post',
        ignoreToken: params.ignoreToken === true
      });
>>>>>>> 34a5614f74c849426dde53010448c9bcafeae9a0
    return response.errorMessage;
  }
}
