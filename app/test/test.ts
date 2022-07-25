/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { TDS } from '../tds.namespace';
import { ScfClientService } from '@towify/scf-engine';
import { SCF } from '@towify-serverless/scf-api';

const getSecret = async () => {
  ScfClientService.init({
    apiUrl: 'https://api-test.towify.com',
    token: 'e56888ac-71b0-4870-bb5c-bc6cc3930e10',
    language: 'en' as any
  });
  const response =
    await ScfClientService.getInstance().call<SCF.LiveTableGetAccessInfo>({
      path: '/livetable/access/get',
      params: { projectId: '' },
      method: 'post',
      ignoreToken: false
    });
  console.log(response, 'response');
};

const salt = '456ae299-de48-41d4-8f15-5a34a78a6101';
const service = async () => {
  localStorage.setItem('towify-dynamic-salt', salt);
  ScfClientService.init({
    apiUrl: 'https://api-test.towify.com',
    language: 'en' as any
  });
  return TDS.init({
    url: 'https://api-test.towify.com',
    appId: '39ff59b26a832b6391450df5903404fc',
    appKey: 'd9d15be509d1acd154dbe3e2fdbf0950'
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
        13777777777
      )
      .ascending('createdAt')
      .find();
    console.log(result, 'result');
  }, 10000);
});
