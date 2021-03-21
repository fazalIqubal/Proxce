import { tenantProduct, tenantAdminJson, tenantSupervisor } from './constant';
import { requestDelete, requestGet, requestPost, requestPut } from '../../../services/requests';
import _ from 'lodash';
import tenantAdmin from '../component/tenantAdmin';
/**
 * Supports all operations exposed by the user controller.
 */

/* eslint eqeqeq: 0 */
export class TenantService {

  constructor(authEndpoint, apiEndpoint) {
    this.authEndpoint = authEndpoint;
    this.portalEndpoint = apiEndpoint;
  }

  getTenantById(id) {
    const url = this.authUrl(`/tenants/${id}`);
    return requestGet(url)
      .then((res) => {
        return res.data
      });
  };

  updateTenant(name, tenant) {
    const url = this.authUrl(`/tenants/${name}`);
    return requestPut(url, tenant)
      .then((res) => {
        return res
      });
  };



  getTenantProducts() {
    return new Promise((resolve, reject) => {
      resolve(tenantProduct)
    });
  };

  getTenantSupervisors() {
    return new Promise((resolve, reject) => {
      resolve(tenantSupervisor)
    });
  };

  getTenantAdmins() {
    const url = this.operationUrl('/users/tenant/admin');
    return requestGet(url);
  };

  authUrl(append) {
    return this.authEndpoint + append;
  }
  operationUrl(append) {
    return this.portalEndpoint + append;
  }

}
