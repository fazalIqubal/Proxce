import { connectionConstants } from '../constants';
import { connectionService } from '../service';
import _ from 'lodash';

export const fetchConnectionSuccess = response => ({
  type: connectionConstants.GET_ALL_CONNECTION_SUCCESS,
  payload: response
})

export const copyConnectionSuccess = response => ({
  type: connectionConstants.GET_ALL_CONNECTION_COPY_SUCCESS,
  payload: response
})

export const fetchConnectionFailure = response => ({
  type: connectionConstants.GET_ALL_CONNECTION_FAILURE,
  payload: []
})

export const getAllConnection = () => {
  return dispatch => {
    return connectionService.getAllConnections()
      .then(response => {
        let result = response.data || [];
        result = _.orderBy(result, ['CreatedAt'], ['desc']);
        dispatch(fetchConnectionSuccess(result));
        dispatch(copyConnectionSuccess(result));
        return result;
      },
        error => {
          dispatch(fetchConnectionFailure(error));
          return error;
        })
  }
}

export const filterConnection = (filter) => {
  return (dispatch, state) => {
    const data = state().connection.allCopyConnections
    const allCopyConnections = JSON.parse(JSON.stringify(data));
    let filtered = allCopyConnections || [];
    if (filter.search) {
      filtered = _.filter(filtered, (res) => {
        return res.ConnectionDisplayName && (
          res.ConnectionDisplayName.toLowerCase().indexOf(filter.search.toLowerCase()) !== -1
          || res.ConnectionID.toLowerCase().indexOf(filter.search.toLowerCase()) !== -1);
      })
    }
    dispatch(fetchConnectionSuccess(filtered));
  }
}

export const fetchConnectionDetailSuccess = response => ({
  type: connectionConstants.GET_CONNECTION_DETAIL_SUCCESS,
  payload: response || {}
})

export const fetchConnectionDetailFailure = response => ({
  type: connectionConstants.GET_CONNECTION_DETAIL_FAILURE,
  payload: {}
})

export const getConnectionById = (id) => {
  return dispatch => {
    return connectionService.getConnectionById(id)
      .then(response => {
        dispatch(fetchConnectionDetailSuccess(response.data));
        return response;
      },
        error => {
          dispatch(fetchConnectionDetailFailure(error));
          return error;
        })
  }
}

export const deleteConnectionById = (id) => {
  return dispatch => {
    return connectionService.deleteConnectionById(id)
      .then(response => {
        dispatch(getAllConnection());
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const saveConnections = (data) => {
  return dispatch => {
    return connectionService.saveConnections(data)
      .then(response => {
        dispatch(getAllConnection());
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}


export const updateConnections = (data) => {
  return dispatch => {
    return connectionService.updateConnections(data)
      .then(response => {
        dispatch(getConnectionById(data.ConnectionID));
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}