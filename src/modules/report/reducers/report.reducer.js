import { reportConstants } from '../constants';
import { combineReducers } from 'redux'
import createReducer from '../../../helpers/createReducer'

const initialState = [];

const reportReducer = createReducer(initialState)({
  [reportConstants.GET_ALL_REPORT_SUCCESS]: (state, action) => action.payload,
  [reportConstants.GET_ALL_REPORT_FAILURE]: (state, action) => action.payload,
})

export default combineReducers({
  allReport: reportReducer,
})