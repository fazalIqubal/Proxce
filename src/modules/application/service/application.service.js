import { dataSource, connections, integrations, enabledintegrations } from './constant';
import { requestDelete, requestGet, requestPost, requestPut } from '../../../services/requests';
import _ from 'lodash';
/**
 * Supports all operations exposed by the user controller.
 */

/* eslint eqeqeq: 0 */
export class ApplicationService {

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAllApplication(fitler) {
    const url = this.operationUrl('/applications');
    return requestGet(url, fitler);
  };

  getApplicationById(id) {
    const url = this.operationUrl(`/applications/${id}`);
    return requestGet(url);
  };

  saveApplication(data) {
    const url = this.operationUrl(`/applications`);
    return requestPost(url, data);
  };

  updateApplication(data) {
    const url = this.operationUrl(`/applications/${data.ApplicationID}`);
    return requestPut(url, data);
  };

  deleteApplicationById(id, reason) {
    const url = this.operationUrl(`/applications/${id}?reason=${reason}`);
    return requestDelete(url);
  }

  deleteEnabledIntegrationByName(name) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  updateApplicationLogo(data) {
    const url = this.operationUrl(`/applications/${data.ApplicationID}/logo`);
    return requestPut(url, data);
  };

  getAllConnections() {
    return new Promise((resolve, reject) => {
      resolve(connections)
    });
  };

  getAllIntegrations() {
    return new Promise((resolve, reject) => {
      resolve(integrations)
    });
  };
  getAllEnabledIntegrations() {
    return new Promise((resolve, reject) => {
      const res = _.filter(integrations, (res) => { return res.instaled })
      resolve(res)
    });
  };

  operationUrl(append) {
    return this.endpoint + append;
  }
}
