import { activityLogConstants } from '../constants';
import { activityLogService } from '../service';
import _ from 'lodash';
export const fetchActivityLogSuccess = response => ({
  type: activityLogConstants.GET_ALL_ACTIVITY_SUCCESS,
  payload: response
})

export const fetchActivityLogFailure = response => ({
  type: activityLogConstants.GET_ALL_ACTIVITY_FAILURE,
  payload: []
})

export const getAllActivityLog = () => {
  return dispatch => {
    return activityLogService.getAllActivityLog()
      .then(response => {
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
        events = _.orderBy(events, ['date'], ['desc']);
        dispatch(fetchActivityLogSuccess(events));
        return events;
      },
        error => {
          dispatch(fetchActivityLogFailure(error));
          return error;
        })
  }
}

export const fetchActivityLogDetailSuccess = response => ({
  type: activityLogConstants.GET_ACTIVITY_DETAIL_SUCCESS,
  payload: response || {}
})

export const fetchActivityLogDetailFailure = response => ({
  type: activityLogConstants.GET_ACTIVITY_DETAIL_FAILURE,
  payload: {}
})

export const getActivityLogById = (id) => {
  return dispatch => {
    return activityLogService.getActivityLogById(id)
      .then(response => {
        dispatch(fetchActivityLogDetailSuccess(response || {}));
        return response;
      },
        error => {
          dispatch(fetchActivityLogDetailFailure(error));
          return error;
        })
  }
}
