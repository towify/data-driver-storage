/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { ScfClientService } from '@towify/scf-engine';

export class PermissionService {
  static instance: PermissionService;
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
    ScfClientService.init({
      apiUrl: params.url,
      language: params.language as any,
      liveTableAccessInfo: {
        appId: params.appId,
        appKey: params.appKey
      }
    });
  }
}
