import { applicationConstants } from '../constants';
import { combineReducers } from 'redux'
import createReducer from '../../../helpers/createReducer'

const initialState = [];

const applicationReducer = createReducer(initialState)({
  [applicationConstants.GET_ALL_APPLICATION_SUCCESS]: (state, action) => action.payload,
  [applicationConstants.GET_ALL_APPLICATION_FAILURE]: (state, action) => action.payload,
})

const copyApplicationReducer = createReducer(initialState)({
  [applicationConstants.GET_ALL_APPLICATION_COPY_SUCCESS]: (state, action) => action.payload,
})


const applicationDetailReducer = createReducer({})({
  [applicationConstants.GET_APPLICATION_DETAIL_SUCCESS]: (state, action) => action.payload,
  [applicationConstants.GET_APPLICATION_DETAIL_FAILURE]: (state, action) => action.payload,
  [applicationConstants.UPDATE_APPLICATION_DETAIL]: (state, action) => action.payload,
})

const connectionReducer = createReducer(initialState)({
  [applicationConstants.GET_ALL_CONNECTION_SUCCESS]: (state, action) => action.payload,
  [applicationConstants.GET_ALL_CONNECTION_FAILURE]: (state, action) => action.payload,
})

const IntegrationReducer = createReducer(initialState)({
  [applicationConstants.GET_ALL_INTEGRATION_SUCCESS]: (state, action) => action.payload,
  [applicationConstants.GET_ALL_INTEGRATION_FAILURE]: (state, action) => action.payload,
})

const EnabledIntegrationReducer = createReducer(initialState)({
  [applicationConstants.GET_ALL_ENABLED_INTEGRATION_SUCCESS]: (state, action) => action.payload,
  [applicationConstants.GET_ALL_ENABLED_INTEGRATION_FAILURE]: (state, action) => action.payload,
})

export default combineReducers({
  allApplication: applicationReducer,
  allCopyApplication: copyApplicationReducer,
  allConnections: connectionReducer,
  allIntegrations: IntegrationReducer,
  allEnabledIntegrations: EnabledIntegrationReducer,
  applicationDetail: applicationDetailReducer
})