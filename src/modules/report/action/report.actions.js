import { reportConstants } from '../constants';
import { reportService } from '../service';

export const fetchReportSuccess = response => ({
    type: reportConstants.GET_ALL_REPORT_SUCCESS,
    payload: response
  })
  
  export const fetchReportFailure = response => ({
    type: reportConstants.GET_ALL_REPORT_FAILURE,
    payload: []
  })
  
  export const getAllReport = () => {
    return dispatch => {
      return reportService.getAllReport()
        .then(response => {
          dispatch(fetchReportSuccess(response));
          return response;
        },
          error => {
            dispatch(fetchReportFailure(error));
            return error;
          })
    }
  }