/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { ScfClientManager } from '@towify/scf-engine';

export class TDSManager {
<<<<<<< HEAD:app/service/tds.manager.ts
  public static scf: ScfClientManager;
=======
  public readonly scf: ScfClientManager;
>>>>>>> 34a5614f74c849426dde53010448c9bcafeae9a0:app/service/TDSManager.ts

  constructor(params: {
    readonly appKey: string;
    readonly url: string;
    readonly language?: 'zh-CN' | 'en';
    readonly salt?: string;
  }) {
<<<<<<< HEAD:app/service/tds.manager.ts
    TDSManager.scf = new ScfClientManager({
=======
    this.scf = new ScfClientManager({
>>>>>>> 34a5614f74c849426dde53010448c9bcafeae9a0:app/service/TDSManager.ts
      apiUrl: params.url,
      language: params.language as any,
      appKey: params.appKey,
      salt: params.salt
    });
<<<<<<< HEAD:app/service/tds.manager.ts
  }

  resetToken(token: string) {
    TDSManager.scf.token = token;
    return this;
=======
>>>>>>> 34a5614f74c849426dde53010448c9bcafeae9a0:app/service/TDSManager.ts
  }

  resetAppKey(appKey: string) {
    TDSManager.scf.appKey = appKey;
    return this;
  }

  resetAppKey(appKey: string) {
    this.scf.appKey = appKey;
  }
}
