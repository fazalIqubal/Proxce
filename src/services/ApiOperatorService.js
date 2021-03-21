import { requestDelete, requestGet, requestPatch, requestPost, requestPostForm } from './requests';

/**
 * Supports all operations exposed by the operator controller.
 * Since /sessions is exposed on that controller as well the login
 * and logout operations are implemented here.
 */
export class ApiOperatorService {

  constructor(operatorEndPoint) {
    this.operatorEndPoint = operatorEndPoint;
  }

  login(username, password) {
    const url = new URL(this.operatorUrl('/sessions'));
    url.searchParams.append('username', username);
    url.searchParams.append('password', password);
    return requestPost(url.toString());
  }

  logout() {
    const url = this.operatorUrl('/sessions/logout');
    return requestPost(url);
  }

  legalEntities() {
    const url = this.operatorUrl('/parties/self');
    return requestGet(url);
  }

  saveBusinessEntity(entity) {
    const url = this.operatorUrl('/parties');
    return requestPost(url, entity);
  }

  accountBalances(accountId, splitBy) {
    const url = this.operatorUrl('/account-balances');
    const params = {};
    if (accountId) {
      params.accountId = accountId;
    }
    if (splitBy) {
      params.splitBy = splitBy;
    }
    return requestGet(url, params);
  }

  invoices(filter = {}) {
    const url = this.operatorUrl('/invoices');
    return requestGet(url, filter);
  }

  chargingFiles() {
    const url = this.operatorUrl('/charging-files');
    return requestGet(url);
  }

  deleteChargingFile(batchId) {
    return requestDelete(this.operatorUrl(`/charging-files/${batchId}`));
  }

  invoicesExportUrl(type, baseEntityCode, invoiceIds) {
    if (type === 'PeopleSoftCostLedger') {
      throw new Error('Not implemented');
    }
    return this.operatorUrl(`/invoices/export/${type}?receiverEntityCodes=${baseEntityCode}&invoiceIds=${invoiceIds.join(',')}`);
  }

  invoiceDownloadUrl(invoiceId) {
    return this.operatorUrl(`/invoices/${invoiceId}/download`);
  }

  chargingFileById(chargingFileId) {
    const url = this.operatorUrl(`/charging-files/${chargingFileId}`);
    return requestGet(url);
  }

  uploadChargingFileAdditionalDetails(chargingFileId, details) {
    const url = this.operatorUrl(`/charging-files/${chargingFileId}`);
    return requestPatch(url, details);
  }

  uploadChargingFiles(files) {
    const url = this.operatorUrl('/charging-files?allowDuplicate=true');
    const data = new FormData();
    data.append('file', files);
    return requestPostForm(url, data);
  }

  fetchDocumentRequested(fetchType, fetchPeriod) {
    const url = this.operatorUrl(`/charging-file/fetch/${fetchType}?period=${fetchPeriod}`);
    return requestPost(url);
  }

  sendToCounterparties(batchId, params) {
    const url = this.operatorUrl(`/invoices?batchId=${batchId}`);
    return requestPatch(url, params);
  }

  journalEntryRecords(filter = {}, pageNum = 1, pageSize = 10) {
    const url = this.operatorUrl('/journal-entry-records');
    return requestGet(url, {...filter, pageNum, pageSize});
  }

  exportJournals(journalEntryRecords) {
    const url = this.operatorUrl('/journal-entries');
    return requestPatch(url, journalEntryRecords);
  }

  approveInvoice(approvals) {
    const url = this.operatorUrl('/invoice-approvals');
    return requestPatch(url, approvals);
  }

  markAsPaid(invoiceId) {
    const url = this.operatorUrl(`/invoices?invoiceIds=${invoiceId}`);
    return requestPatch(url, {status: 'PAID'});
  }

  markAsAwaitingPayment(invoiceId) {
    const url = this.operatorUrl(`/invoices?invoiceIds=${invoiceId}`);
    return requestPatch(url, {status: 'AWAITS_PAYMENT'});
  }

  /**
   * Fetches the current Azure API properties from the backend.
   * When the properties argument is provided these will be stored as the current properties.
   * @param properties
   */
  apiKey(properties) {
    const url = this.operatorUrl('/azure/management/apikey');
    if (properties) {
      return requestPatch(url, properties);
    } else {
      return requestGet(url);
    }
  }

  operatorUrl(append) {
    return this.operatorEndPoint + append;
  }
}
