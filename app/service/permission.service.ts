/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { LiveDataService, TableInfoModel } from '@towify/data-engine';

export class PermissionService {
  static instance: PermissionService;
  public dataService!: LiveDataService;
  private constructor() {
    // todo
  }

  static async init(params: {
    readonly appId: string;
    readonly appKey: string;
    readonly url: string;
    readonly language?: 'zh-CN' | 'en';
  }) {
    this.instance = new PermissionService();
    this.instance.dataService = await LiveDataService.init({
      projectId: 'anbeiyLiqOXFqRq8',
      token: '4a2e761b-467e-4bd0-a483-cb95a52f4cd2',
      language: (params.language ?? 'en') as any,
      serverUrl: params.url,
      provider: 'data-driver',
      secret: {
        appId: params.appId,
        appKey: params.appKey
      },
      environment: 'web'
    });
  }

  async getTable(tableHashName: string): Promise<TableInfoModel | undefined> {
    const tables = await PermissionService.instance.dataService.getTables();
    return tables.find(table => table.hashName === tableHashName);
  }
}
