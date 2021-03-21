import { tenantConstants } from '../constants';
import { combineReducers } from 'redux'
import createReducer from '../../../helpers/createReducer'

const initialState = [];

const tenantReducer = createReducer(initialState)({
  [tenantConstants.GET_ALL_TENANT_SUCCESS]: (state, action) => action.payload,
  [tenantConstants.GET_ALL_TENANT_FAILURE]: (state, action) => action.payload,
})


const tenantDetailReducer = createReducer({})({
  [tenantConstants.GET_TENANT_DETAIL_SUCCESS]: (state, action) => action.payload,
  [tenantConstants.GET_TENANT_DETAIL_FAILURE]: (state, action) => action.payload,
})

const tenantProductReducer = createReducer({})({
  [tenantConstants.GET_TENANT_PRODUCT_SUCCESS]: (state, action) => action.payload,
  [tenantConstants.GET_TENANT_PRODUCT_FAILURE]: (state, action) => action.payload,
})

const tenantAdminReducer = createReducer([])({
  [tenantConstants.GET_TENANT_ADMIN_SUCCESS]: (state, action) => action.payload,
  [tenantConstants.GET_TENANT_ADMIN_FAILURE]: (state, action) => action.payload,
})

const tenantSupervisorReducer = createReducer({})({
  [tenantConstants.GET_TENANT_SUPERVISOR_SUCCESS]: (state, action) => action.payload,
  [tenantConstants.GET_TENANT_SUPERVISOR_FAILURE]: (state, action) => action.payload,
})


export default combineReducers({
  allTenant: tenantReducer,
  tenantDetail: tenantDetailReducer,
  tenantProduct: tenantProductReducer,
  tenantAdmin: tenantAdminReducer,
  tenantSupervisor: tenantSupervisorReducer,
})