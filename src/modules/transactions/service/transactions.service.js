import { dataSource } from './constant';
import _ from 'lodash';
//import userGroup from '../component/userGroup';
/**
 * Supports all operations exposed by the user controller.
 */

/* eslint eqeqeq: 0 */
export class TransactionsService {

  constructor(authEndpoint) {
    this.authEndpoint = authEndpoint;
  }

  getAllTransactions() {
    return new Promise((resolve) => {
      resolve(dataSource)
    });
  };

  getTransactionsById(id) {
    return new Promise((resolve) => {
      const res = _.find(dataSource, (res) => { return res.userId == id })
      resolve(res)
    });
  };

}
