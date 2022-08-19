/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { ScfClientManager } from '@towify/scf-engine';

export class TDSManager {
  public static scf: ScfClientManager;

  constructor(params: {
    readonly appKey: string;
    readonly url: string;
    readonly language?: 'zh-CN' | 'en';
    readonly salt?: string;
  }) {
    TDSManager.scf = new ScfClientManager({
      apiUrl: params.url,
      language: params.language as any,
      appKey: params.appKey,
      salt: params.salt
    });
  }

  resetToken(token: string) {
    TDSManager.scf.token = token;
    return this;
  }

  resetAppKey(appKey: string) {
    TDSManager.scf.appKey = appKey;
    return this;
  }
}
