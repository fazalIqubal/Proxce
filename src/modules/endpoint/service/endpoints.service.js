import { dataSource, integrations, enabledintegrations, userGroup, cameras  } from './constant';
import { requestDelete, requestGet, requestPost, requestPut } from '../../../services/requests';
import _ from 'lodash';

/**
 * Supports all operations exposed by the user controller.
 */

/* eslint eqeqeq: 0 */
export class EndpointsService {

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAllEndpoints() {
    const url = this.operationUrl('/endpoint');
    return requestGet(url);
  };

  getEndpointById(id) {
    const url = this.operationUrl(`/endpoint/${id}`);
    return requestGet(url);
  };

  updateEndpoint(data) {
    const url = this.operationUrl(`/endpoint/${data.EndpointID}`);
    return requestPut(url, data);
  };

  removeEndpointGroups(endpointID, data){
    const url = this.operationUrl(`/endpoint/${endpointID}/groups/remove`);
    return requestPost(url, data);
  }
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

  getAllCameras() {
    return new Promise((resolve, reject) => {
      const res = _.filter(cameras, (res) => { return res.instaled })
      resolve(res)
    });
  };

  deleteEndpointById(endpointID, reason) {
    const url = this.operationUrl(`endpoint/pair/${endpointID}?reason=${reason}`);
    return requestDelete(url);
  }
  
  getUserGroup() {
    return new Promise((resolve) => {
      resolve(userGroup)
    });
  };

  operationUrl(append) {
    return this.endpoint + append;
  }
}

