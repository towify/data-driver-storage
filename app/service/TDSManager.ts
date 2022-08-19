/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { ScfClientManager } from '@towify/scf-engine';

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

  addToken(token: string) {
    this.scf.token = token;
  }

  resetAppKey(appKey: string) {
    this.scf.appKey = appKey;
  }
}
