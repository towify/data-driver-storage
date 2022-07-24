/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { TDS } from '../tds.namespace';
import { ScfClientService } from '@towify/scf-engine';
import { SCF } from '@towify-serverless/scf-api';

const projectId = 'anbeiyLiqOXFqRq8';
const salt = 'c0a191e8-7e98-47f9-a859-81f6258b964c';
const service = async () => {
  localStorage.setItem('towify-dynamic-salt', salt);
  ScfClientService.init({
    apiUrl: 'https://api-test.towify.com',
    token: '4a2e761b-467e-4bd0-a483-cb95a52f4cd2',
    language: 'en' as any
  });
  const response =
    await ScfClientService.getInstance().call<SCF.LiveTableGetAccessInfo>({
      path: '/livetable/access/get',
      params: { projectId },
      method: 'post',
      ignoreToken: false
    });
  if (response.errorMessage) console.log(response.errorMessage);
  ScfClientService.getInstance().liveTableAccessInfo = response.data!;
  return TDS.init({
    url: 'https://api-test.towify.com',
    appId: response.data!.appId,
    appKey: response.data!.appKey
  });
};

describe('data driver storage', () => {
  it('table', async () => {
    await service();
    const table = new TDS.Table('62daee655891cb65044515f4');
    const result = await table.query
      .equalTo(
        {
          fieldHashName: 'oRiPFptLZjAdAGKV',
          referenceTableHashName: ''
        },
        '13777777777'
      )
      .ascending('createdAt')
      .find();
    console.log(result, 'result');
  }, 10000);
});
