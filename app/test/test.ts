/**
 * @author kaysaith
 * @date 24 Jul, 2022
 */
import { TDS } from '../tds.namespace';
import { SCF } from '@towify-serverless/scf-api';
import { TDSService } from '../service/tds.service';

const getSecret = async () => {
  const response =
    await TDSService.instance.scf.call<SCF.LiveTableGetAccessInfo>({
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
