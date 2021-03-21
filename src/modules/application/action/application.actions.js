import { applicationConstants } from '../constants';
import { applicationService } from '../service';
import _ from 'lodash';

export const fetchApplicationSuccess = response => ({
  type: applicationConstants.GET_ALL_APPLICATION_SUCCESS,
  payload: response
})

export const copyApplicationSuccess = response => ({
  type: applicationConstants.GET_ALL_APPLICATION_COPY_SUCCESS,
  payload: response
})

export const fetchApplicationFailure = response => ({
  type: applicationConstants.GET_ALL_APPLICATION_FAILURE,
  payload: []
})

export const getAllApplication = (filter) => {
  return dispatch => {
    return applicationService.getAllApplication(filter)
      .then(response => {
        let apps = response.data && response.data.Applications || []
        apps = _.orderBy(apps, ['CreatedAt'], ['desc']);
        dispatch(fetchApplicationSuccess(apps));
        dispatch(copyApplicationSuccess(apps));
        return response;
      },
        error => {
          dispatch(fetchApplicationFailure(error));
          return error;
        })
  }
}

export const filterApplication = (filter) => {
  return (dispatch, state) => {
    const data = state().application.allCopyApplication
    const allcopyApplication = JSON.parse(JSON.stringify(data));
    let filtered = allcopyApplication || [];
    if (filter.search) {
      filtered = _.filter(filtered, (res) => {
        return res.ApplicationName && (
          res.ApplicationName.toLowerCase().indexOf(filter.search.toLowerCase()) !== -1
          || res.ApplicationID.toLowerCase().indexOf(filter.search.toLowerCase()) !== -1);
      })
    }
    if (filter.type) {
      filtered = _.filter(filtered, (res) => {
        return res.ApplicationType === filter.type;
      })
    }
    dispatch(fetchApplicationSuccess(filtered));
  }
}


export const fetchApplicationDetailSuccess = response => ({
  type: applicationConstants.GET_APPLICATION_DETAIL_SUCCESS,
  payload: response
})

export const fetchApplicationDetailFailure = response => ({
  type: applicationConstants.GET_APPLICATION_DETAIL_FAILURE,
  payload: {}
})

export const getApplicationById = (id) => {
  return dispatch => {
    return applicationService.getApplicationById(id)
      .then(response => {
        let result = response.data || {};
        dispatch(fetchApplicationDetailSuccess(result));
        return result;
      },
        error => {
          dispatch(fetchApplicationDetailFailure(error));
          return error;
        })
  }
}

export const saveApplication = (data) => {
  return dispatch => {
    return applicationService.saveApplication(data)
      .then(response => {
        if (data.ApplicationID) {
          dispatch(getApplicationById(data.ApplicationID));
        }
        else {
          dispatch(getAllApplication());
        }
        return response;
      })
  }
}

export const updateApplication = (data) => {
  return dispatch => {
    return applicationService.updateApplication(data)
      .then(response => {
        return dispatch(getApplicationById(data.ApplicationID));
      })
  }
}

export const deleteApplicationById = (id, reason) => {
  return dispatch => {
    return applicationService.deleteApplicationById(id, reason)
      .then(response => {
        dispatch(getAllApplication());
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const deleteEnabledIntegrationByName = (name) => {
  return dispatch => {
    return applicationService.deleteEnabledIntegrationByName(name)
      .then(response => {
        // dispatch(getAllApplication());
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const updateApplicationLogo = (data) => {
  return dispatch => {
    return applicationService.updateApplicationLogo(data)
      .then(response => {
        return dispatch(getApplicationById(data.ApplicationID));
      })
  }
}

export const fetchConnectionSuccess = response => ({
  type: applicationConstants.GET_ALL_CONNECTION_SUCCESS,
  payload: response
})

export const fetchConnectionFailure = response => ({
  type: applicationConstants.GET_ALL_CONNECTION_FAILURE,
  payload: []
})

export const getAllConnections = () => {
  return dispatch => {
    return applicationService.getAllConnections()
      .then(response => {
        dispatch(fetchConnectionSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchConnectionFailure(error));
          return error;
        })
  }
}



export const updateApplicationDetailSuccess = response => ({
  type: applicationConstants.UPDATE_APPLICATION_DETAIL,
  payload: response
})

export const updateApplicationById = (id, data) => {
  return dispatch => {

    dispatch(updateApplicationDetailSuccess(data));

  }
}

export const fetchIntegrationSuccess = response => ({
  type: applicationConstants.GET_ALL_INTEGRATION_SUCCESS,
  payload: response
})

export const fetchIntegrationFailure = response => ({
  type: applicationConstants.GET_ALL_INTEGRATION_FAILURE,
  payload: []
})

export const getAllIntegrations = () => {
  return dispatch => {
    return applicationService.getAllIntegrations()
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
  type: applicationConstants.GET_ALL_ENABLED_INTEGRATION_SUCCESS,
  payload: response
})

export const fetchEnabledIntegrationFailure = response => ({
  type: applicationConstants.GET_ALL_ENABLED_INTEGRATION_FAILURE,
  payload: []
})

export const getAllEnabledIntegrations = () => {
  return dispatch => {
    return applicationService.getAllEnabledIntegrations()
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
