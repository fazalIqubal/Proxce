import { tenantConstants } from '../constants';
import { tenantService } from '../service';
import _ from 'lodash';

export const fetchTenantSuccess = response => ({
  type: tenantConstants.GET_ALL_TENANT_SUCCESS,
  payload: response
})

export const fetchTenantFailure = response => ({
  type: tenantConstants.GET_ALL_TENANT_FAILURE,
  payload: []
})

export const getAllTenant = () => {
  return dispatch => {
    return tenantService.getAllTenant()
      .then(response => {
        dispatch(fetchTenantSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchTenantFailure(error));
          return error;
        })
  }
}

export const fetchTenantDetailSuccess = response => ({
  type: tenantConstants.GET_TENANT_DETAIL_SUCCESS,
  payload: response || {}
})

export const fetchTenantDetailFailure = response => ({
  type: tenantConstants.GET_TENANT_DETAIL_FAILURE,
  payload: {}
})

export const getTenantById = (id) => {
  return dispatch => {
    return tenantService.getTenantById(id)
      .then(response => {
        dispatch(fetchTenantDetailSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchTenantDetailFailure(error));
          return error;
        })
  }
}


export const updateTenant = (name, tenant) => {
  return dispatch => {
    return tenantService.updateTenant(name, tenant)
      .then(response => {
        dispatch(getTenantById(name));
        dispatch(getTenantAdmins());
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const fetchTenantProductSuccess = response => ({
  type: tenantConstants.GET_TENANT_PRODUCT_SUCCESS,
  payload: response || {}
})

export const fetchTenantProductFailure = response => ({
  type: tenantConstants.GET_TENANT_PRODUCT_FAILURE,
  payload: {}
})

export const getTenantProducts = () => {
  return dispatch => {
    return tenantService.getTenantProducts()
      .then(response => {
        dispatch(fetchTenantProductSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchTenantProductFailure(error));
          return error;
        })
  }
}
export const fetchTenantAdminSuccess = response => ({
  type: tenantConstants.GET_TENANT_ADMIN_SUCCESS,
  payload: response || []
})

export const fetchTenantAdminFailure = response => ({
  type: tenantConstants.GET_TENANT_ADMIN_FAILURE,
  payload: []
})

export const getTenantAdmins = () => {
  return dispatch => {
    return tenantService.getTenantAdmins()
      .then(response => {
        let users =  (response && response.data && response.data.users) || []
        users = _.orderBy(users, ['CreatedAt'], ['desc']);
        dispatch(fetchTenantAdminSuccess(users));
        return users;
      },
        error => {
          dispatch(fetchTenantAdminFailure(error));
          return error;
        })
  }
}

export const fetchTenantSupervisorSuccess = response => ({
  type: tenantConstants.GET_TENANT_SUPERVISOR_SUCCESS,
  payload: response || {}
})

export const fetchTenantSupervisorFailure = response => ({
  type: tenantConstants.GET_TENANT_SUPERVISOR_FAILURE,
  payload: {}
})

export const getTenantSupervisors = () => {
  return dispatch => {
    return tenantService.getTenantSupervisors()
      .then(response => {
        dispatch(fetchTenantSupervisorSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchTenantSupervisorFailure(error));
          return error;
        })
  }
}