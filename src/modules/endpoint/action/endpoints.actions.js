import { endpointsConstants } from '../constants';
import { endpointsService } from '../service';
import _ from 'lodash';

export const fetchEndpointsSuccess = response => ({
  type: endpointsConstants.GET_ALL_ENDPOINTS_SUCCESS,
  payload: response
})

export const fetchEndpointTypesSuccess = response => ({
  type: endpointsConstants.GET_ALL_ENDPOINT_TYPES_SUCCESS,
  payload: response
})

export const copyEndpointsSuccess = response => ({
  type: endpointsConstants.GET_ALL_ENDPOINTS_COPY_SUCCESS,
  payload: response
})

export const fetchEndpointsFailure = response => ({
  type: endpointsConstants.GET_ALL_ENDPOINTS_FAILURE,
  payload: []
})

export const getAllEndpoints = () => {
  return dispatch => {
    return endpointsService.getAllEndpoints()
      .then(response => {
        let endpoints = (response.data && response.data.endpoints) || [];
        let endpointTypes = (response.data && response.data.endpointTypes) || [];
        endpoints = _.orderBy(endpoints, ['CreatedAt'], ['desc']);
        dispatch(fetchEndpointTypesSuccess(endpointTypes));
        dispatch(fetchEndpointsSuccess(endpoints));
        dispatch(copyEndpointsSuccess(endpoints));
        return response;
      },
        error => {
          dispatch(fetchEndpointsFailure(error));
          return error;
        })
  }
}



export const filterEndpoints = (filter) => {
  return (dispatch, state) => {
    const data = state().endpoints.allCopyEndpoints
    const allCopyEndpoints = JSON.parse(JSON.stringify(data));
    let filtered = allCopyEndpoints || [];
    if (filter.search) {
      filtered = _.filter(filtered, (res) => {
        return res.EndpointName && (
          res.EndpointName.toLowerCase().indexOf(filter.search.toLowerCase()) !== -1
          || res.EndpointID.toLowerCase().indexOf(filter.search.toLowerCase()) !== -1);
      })
    }
    if (filter.appType) {
      filtered = _.filter(filtered, (res) => {
        return res.ApplicationType === filter.appType;
      })
    }
    if (filter.endpointType) {
      filtered = _.filter(filtered, (res) => {
        return res.EndpointType === filter.endpointType;
      })
    }
    dispatch(fetchEndpointsSuccess(filtered));
  }
}

export const fetchEndpointsDetailSuccess = response => ({
  type: endpointsConstants.GET_ENDPOINTS_DETAIL_SUCCESS,
  payload: response
})

export const fetchEndpointsDetailFailure = response => ({
  type: endpointsConstants.GET_ENDPOINTS_DETAIL_FAILURE,
  payload: {}
})

export const getEndpointById = (id) => {
  return dispatch => {
    return endpointsService.getEndpointById(id)
      .then(response => {
        let endpoint = (response.data && response.data) || {};
        dispatch(fetchEndpointsDetailSuccess(endpoint));
        return response;
      },
        error => {
          dispatch(fetchEndpointsDetailFailure(error));
          return error;
        })
  }
}


export const updateEndpoint = (data) => {
  return dispatch => {
    return endpointsService.updateEndpoint(data)
      .then(response => {
        return dispatch(getEndpointById(data.EndpointID));
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const fetchIntegrationSuccess = response => ({
  type: endpointsConstants.GET_ALL_INTEGRATION_SUCCESS,
  payload: response
})

export const fetchIntegrationFailure = response => ({
  type: endpointsConstants.GET_ALL_INTEGRATION_FAILURE,
  payload: []
})

export const deleteCameraId = (id) => {
  return dispatch => {
    return endpointsService.deleteCameraId(id)
      .then(response => {
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const deleteEndpointById = (id, reason) => {
  return dispatch => {
    return endpointsService.deleteEndpointById(id, reason)
      .then(response => {
        dispatch(getAllEndpoints());
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const getAllIntegrations = () => {
  return dispatch => {
    return endpointsService.getAllIntegrations()
      .then(response => {
        dispatch(fetchIntegrationSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchIntegrationFailure(error));
          return error;
        })
  }
}

export const fetchEnabledIntegrationSuccess = response => ({
  type: endpointsConstants.GET_ALL_ENABLED_INTEGRATION_SUCCESS,
  payload: response
})

export const fetchEnabledIntegrationFailure = response => ({
  type: endpointsConstants.GET_ALL_ENABLED_INTEGRATION_FAILURE,
  payload: []
})

export const getAllEnabledIntegrations = () => {
  return dispatch => {
    return endpointsService.getAllEnabledIntegrations()
      .then(response => {
        dispatch(fetchEnabledIntegrationSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchEnabledIntegrationFailure(error));
          return error;
        })
  }
}


export const removeEndpointGroups = (EndpointID, data) => {
  return dispatch => {
    return endpointsService.removeEndpointGroups(EndpointID, data)
      .then(response => {
        dispatch(getEndpointById(EndpointID));
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}