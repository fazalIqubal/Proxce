import { endpointsConstants } from '../constants';
import { combineReducers } from 'redux'
import createReducer from '../../../helpers/createReducer'

const initialState = [];

const endpointsReducer = createReducer(initialState)({
  [endpointsConstants.GET_ALL_ENDPOINTS_SUCCESS]: (state, action) => action.payload,
  [endpointsConstants.GET_ALL_ENDPOINTS_FAILURE]: (state, action) => action.payload,
})

const copyEndpointsReducer = createReducer(initialState)({
  [endpointsConstants.GET_ALL_ENDPOINTS_COPY_SUCCESS]: (state, action) => action.payload,
})

const endpointTypesReducer = createReducer(initialState)({
  [endpointsConstants.GET_ALL_ENDPOINT_TYPES_SUCCESS]: (state, action) => action.payload,
})


const endpointDetailReducer = createReducer({})({
  [endpointsConstants.GET_ENDPOINTS_DETAIL_SUCCESS]: (state, action) => action.payload,
  [endpointsConstants.GET_ENDPOINTS_DETAIL_FAILURE]: (state, action) => action.payload,
})

const IntegrationReducer = createReducer(initialState)({
  [endpointsConstants.GET_ALL_INTEGRATION_SUCCESS]: (state, action) => action.payload,
  [endpointsConstants.GET_ALL_INTEGRATION_FAILURE]: (state, action) => action.payload,
})

const EnabledIntegrationReducer = createReducer(initialState)({
  [endpointsConstants.GET_ALL_ENABLED_INTEGRATION_SUCCESS]: (state, action) => action.payload,
  [endpointsConstants.GET_ALL_ENABLED_INTEGRATION_FAILURE]: (state, action) => action.payload,
})

const CameraReducer = createReducer(initialState)({
  [endpointsConstants.GET_ALL_CAMERA_SUCCESS]: (state, action) => action.payload,
  [endpointsConstants.GET_ALL_CAMERA_FAILURE]: (state, action) => action.payload,
})

const usersGroupReducer = createReducer([])({
  [endpointsConstants.GET_ALL_USER_GROUP_SUCCESS]: (state, action) => action.payload,
  [endpointsConstants.GET_ALL_USER_GROUP_FAILURE]: (state, action) => action.payload,
})

export default combineReducers({
  allEndpoints: endpointsReducer,
  endpointTypes: endpointTypesReducer,
  allCopyEndpoints: copyEndpointsReducer,
  endpointDetail: endpointDetailReducer,
  allIntegrations: IntegrationReducer,
  allEnabledIntegrations: EnabledIntegrationReducer,
  allCameras: CameraReducer,
  userGroup: usersGroupReducer,
})