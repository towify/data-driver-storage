/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { ScfClientManager } from '@towify/scf-engine';

export class TDSService {
  static instance: TDSService;
  scf!: ScfClientManager;

  private constructor() {
    // todo
  }

  static async init(params: {
    readonly appId: string;
    readonly appKey: string;
    readonly url: string;
    readonly language?: 'zh-CN' | 'en';
  }) {
    this.instance = new TDSService();
    this.instance.scf = new ScfClientManager({
      apiUrl: params.url,
      language: params.language as any,
      liveTableAccessInfo: {
        appId: params.appId,
        appKey: params.appKey
      }
    });
  }
}
