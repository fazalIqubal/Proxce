import { dataSource, groupEndpoints, groupUser } from './constant';
import { requestDelete, requestGet, requestPost, requestPut } from '../../../services/requests';
import _ from 'lodash';
/**
 * Supports all operations exposed by the user controller.
 */

/* eslint eqeqeq: 0 */
export class GroupsService {

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAllGroups() {
    const url = this.operationUrl('/groups');
    return requestGet(url);
  };

  getGroupById(id) {
    const url = this.operationUrl(`/groups/${id}`);
    return requestGet(url);
  };

  deleteGroupById(id) {
    const url = this.operationUrl(`/groups/${id}`);
    return requestDelete(url);
  }

  createGroup(data) {
    const url = this.operationUrl(`/groups`);
    return requestPost(url, data);
  };

  updateGroup(data) {
    const url = this.operationUrl(`/groups/${data.GroupID}`);
    return requestPut(url, data);
  };

  addGroupUser(data) {
    const url = this.operationUrl(`/groups/${data.GroupID}/users`);
    return requestPut(url, data);
  };

  removeGroupUser(groupID, data) {
    const url = this.operationUrl(`/groups/${groupID}/users/remove`);
    return requestPut(url, data);
  };


  addGroupEndpoints(data) {
    const url = this.operationUrl(`/groups/${data.GroupID}/endpoints`);
    return requestPut(url, data);
  };

  removeGroupEndpoints(groupID, data) {
    const url = this.operationUrl(`/groups/${groupID}/endpoints/remove`);
    return requestPut(url, data);
  };
  operationUrl(append) {
    return this.endpoint + append;
  }
}

