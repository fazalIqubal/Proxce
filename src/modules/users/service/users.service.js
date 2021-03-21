import { dataSource, userEndPoints, userHistory, userFaces, userRawJson, userConsent, userImport, userGroup, userSpoofAtempts } from './constant';
import _ from 'lodash';
import { requestDelete, requestGet, requestPost, requestPut, requestFileUpload } from '../../../services/requests';


/* eslint eqeqeq: 0 */
export class UsersService {

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAllUsers(filter, isLoading) {
    const url = this.operationUrl('/users');
    filter = filter || {};
    filter.faceUrl = 1;
    return requestGet(url, filter, isLoading);
  };

  getUsersById(id) {
    const url = this.operationUrl(`/users/${id}`);
    return requestGet(url, { faceUrl: 1 });
  };

  deleteUserById(id) {
    const url = this.operationUrl(`/users/${id}`);
    return requestDelete(url);
  }

  createUser(data) {
    const url = this.operationUrl(`/users`);
    return requestPost(url, data);
  };

  updateUser(id, data) {
    const url = this.operationUrl(`/users/${id}`);
    return requestPut(url, data);
  };

  addUserFace(id, data) {
    const url = this.operationUrl(`/users/${id}/faces`);
    return requestPost(url, data);
  };

  removeUserFace(id, data) {
    const url = this.operationUrl(`/users/${id}/faces/remove`);
    return requestPut(url, data);
  };

  removeUserGroups(oloID, data) {
    const url = this.operationUrl(`/users/${oloID}/groups/remove`);
    return requestPost(url, data);
  }

  resetUserPassword(id, data) {
    const url = this.operationUrl(`/users/${id}/resetPassword`);
    return requestPut(url, data);
  };

  deleteCognitoUser(id, email) {
    const url = this.operationUrl(`/users/${id}/cognito/${email}`);
    return requestDelete(url);
  };

  inviteCognitoUser(data) {
    const url = this.operationUrl(`/users/inivte`);
    return requestPost(url, data);
  };

  getS3Url(data) {
    const url = this.operationUrl(`/users/import/s3-url`);
    return requestPost(url, data);
  };

  processImport(data) {
    const url = this.operationUrl(`/users/import/users/process`);
    return requestPut(url, data);
  };

  ImportUserFace(data) {
    const url = this.operationUrl(`/users/import/faces`);
    return requestPut(url, data, false);
  };

  downloadUserFaceLog(data) {
    const url = this.operationUrl(`/users/import/s3-url`);
    return requestPost(url, data);
  }
  getImportStatus() {
    const url = this.operationUrl(`/users/import/users/status?statusOnly=true`);
    return requestGet(url);
  };

  uploadFile(url, data) {
    return requestFileUpload(url, data);
  };

  getUserEndPoints() {
    return new Promise((resolve) => {
      resolve([])
    });
  };

  getUserHistory() {
    return new Promise((resolve) => {
      resolve([])
    });
  };

  getUserFaces(id) {
    const url = this.operationUrl(`/users/${id}/faces`);
    return requestGet(url);
  };

  getUserGroup() {
    return new Promise((resolve) => {
      resolve(userGroup)
    });
  };


  setPrimaryUser(item) {
    return new Promise((resolve) => {
      let data = _.map(userFaces, (r) => {
        r.isPrimary = false;
        if (r.id == item.id) {
          r.isPrimary = true;
        }
        return r;
      });
      resolve(data)
    });
  }

  getUserRawJson() {
    return new Promise((resolve) => {
      resolve(userRawJson)
    });
  };

  getUserConsent() {
    return new Promise((resolve) => {
      resolve([])
    });
  };

  getUserImport() {
    return new Promise((resolve) => {
      resolve(userImport)
    });
  };
  getUserSpoofAtempts() {
    return new Promise((resolve) => {
      resolve(userSpoofAtempts)
    });
  };

  getUserSpoofAtemptsById(id) {
    return new Promise((resolve) => {
      const res = _.find(userSpoofAtempts, (res) => { return res.id == id })
      resolve(res)
    });
  };

  operationUrl(append) {
    return this.endpoint + append;
  }
}
