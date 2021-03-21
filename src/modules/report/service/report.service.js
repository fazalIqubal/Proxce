import { dataSource } from './constant';
import _ from 'lodash';
/**
 * Supports all operations exposed by the user controller.
 */

/* eslint eqeqeq: 0 */
export class ReportService {

  constructor(authEndpoint) {
    this.authEndpoint = authEndpoint;
  }

  getAllReport() {
    return new Promise((resolve, reject) => {
      resolve(dataSource)
    });
  };
}
