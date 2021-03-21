import { connections } from './constant';
import { requestDelete, requestGet, requestPost, requestPut } from '../../../services/requests';
import _ from 'lodash';
/**
 * Supports all operations exposed by the user controller.
 */

/* eslint eqeqeq: 0 */
export class ConnectionService {

  constructor(authEndpoint) {
    this.authEndpoint = authEndpoint;
  }

  getAllConnections() {
    const url = this.authUrl('/connections');
    return requestGet(url);
  };

  getConnectionById(id) {
    const url = this.authUrl(`/connections/${id}`);
    return requestGet(url);
  };

  saveConnections(data) {
    const url = this.authUrl('/connections');
    return requestPost(url, data);
  };

  updateConnections(data) {
    const url = this.authUrl(`/connections/${data.ConnectionID}`);
    return requestPut(url, data);
  };

  deleteConnectionById(id) {
    const url = this.authUrl(`/connections/${id}`);
    return requestDelete(url);
  }

  authUrl(append) {
    return this.authEndpoint + append;
  }
}
