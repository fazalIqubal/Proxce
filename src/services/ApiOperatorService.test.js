import { assert } from 'chai';
import { ApiOperatorService } from './ApiOperatorService';

describe('API Operator Service', () => {
  const operatorUrl = 'http://insettle.com/api/operator';
  const service = new ApiOperatorService(operatorUrl);
  const ucode = 'U2000';

  describe('invoicesExportUrl', () => {
    it('Should return correct URL with no invoice ID', () => {
      const url = operatorUrl + '/invoices/export/PeopleSoftAccountsPayable?receiverEntityCodes=U2000&invoiceIds=';
      assert.equal(url, service.invoicesExportUrl('PeopleSoftAccountsPayable', ucode, []));
    });
    it('Should return correct URL with one invoice ID', () => {
      const url = operatorUrl + '/invoices/export/PeopleSoftAccountsPayable?receiverEntityCodes=U2000&invoiceIds=NL-1';
      assert.equal(url, service.invoicesExportUrl('PeopleSoftAccountsPayable', ucode, ['NL-1']));
    });
    it('Should return correct URL with multiple invoice IDs', () => {
      const url = operatorUrl + '/invoices/export/PeopleSoftAccountsPayable?receiverEntityCodes=U2000&invoiceIds=NL-1,NL-3,NL-100';
      assert.equal(url, service.invoicesExportUrl('PeopleSoftAccountsPayable', ucode, ['NL-1', 'NL-3', 'NL-100']));
    });
  });
});
