import { activityLogs } from './constant';
import { requestDelete, requestGet, requestPost, requestPut } from '../../../services/requests';

import _ from 'lodash';
/**
 * Supports all operations exposed by the user controller.
 */

/* eslint eqeqeq: 0 */
export class ActivityLogService {

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAllActivityLog() {
    // return new Promise((resolve, reject) => {
    //   resolve(activityLogs)
    // });
    const url = this.operationUrl('/activity');
    return requestGet(url);
  };

  getActivityLogById(id) {
    return new Promise((resolve, reject) => {
      const url = this.operationUrl('/activity');
      requestGet(url).then((response) => {
        let events = (response.data && response.data.events) || [];
        events = _.map(events, (res) => {
          if (res.message) {
            if (typeof res.message == 'string') {
              try {
                res.message = JSON.parse(res.message)
              } catch (error) {

              }
            }
          }
          return res.message || {};
        })
        const res = _.find(events, (res) => { return res._id == id })
        resolve(res)
      })

    });
  };

  operationUrl(append) {
    return this.endpoint + append;
  }
}
