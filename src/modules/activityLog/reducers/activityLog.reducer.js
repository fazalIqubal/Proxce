import { activityLogConstants } from '../constants';
import { combineReducers } from 'redux'
import createReducer from '../../../helpers/createReducer'

const initialState = [];

const activityLogReducer = createReducer(initialState)({
  [activityLogConstants.GET_ALL_ACTIVITY_SUCCESS]: (state, action) => action.payload,
  [activityLogConstants.GET_ALL_ACTIVITY_FAILURE]: (state, action) => action.payload,
})


const activityLogDetailReducer = createReducer({})({
  [activityLogConstants.GET_ACTIVITY_DETAIL_SUCCESS]: (state, action) => action.payload,
  [activityLogConstants.GET_ACTIVITY_DETAIL_FAILURE]: (state, action) => action.payload,
})


export default combineReducers({
  allActivityLog: activityLogReducer,
  activityLogDetail: activityLogDetailReducer
})