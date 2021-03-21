import { usersConstants } from '../constants';
import { usersService } from '../service';
import _ from 'lodash';

export const fetchUsersSuccess = response => ({
  type: usersConstants.GET_ALL_USERS_SUCCESS,
  payload: response
})

export const copyApplicationSuccess = response => ({
  type: usersConstants.GET_ALL_USERS_COPY_SUCCESS,
  payload: response
})

export const fetchUsersFailure = response => ({
  type: usersConstants.GET_ALL_USERS_FAILURE,
  payload: []
})

export const getAllUsers = (filter, isLoading = true) => {
  return dispatch => {
    return usersService.getAllUsers(filter, isLoading)
      .then(response => {
        let users =  (response && response.data && response.data.users) || []
        users = _.orderBy(users, ['CreatedAt'], ['desc']);

        dispatch(fetchUsersSuccess(users));
        dispatch(copyApplicationSuccess(users));
        return response;
      },
        error => {
          dispatch(fetchUsersFailure(error));
          return error;
        })
  }
}


export const filterUsers = (filter) => {
  return (dispatch, state) => {
    const data = state().users.allCopyUsers
    const allcopyUsers = JSON.parse(JSON.stringify(data));
    let filtered = allcopyUsers || [];
    if (filter.connection) {
      filtered = _.filter(filtered, (res) => {
        return res.ConnectionDisplayName === filter.connection;
      })
    }
    dispatch(fetchUsersSuccess(filtered));
  }
}


export const fetchUsersDetailSuccess = response => ({
  type: usersConstants.GET_USERS_DETAIL_SUCCESS,
  payload: (response && response.data) || {}
})

export const fetchUsersDetailFailure = response => ({
  type: usersConstants.GET_USERS_DETAIL_FAILURE,
  payload: {}
})

export const getUsersById = (id) => {
  return dispatch => {
    return usersService.getUsersById(id)
      .then(response => {
        dispatch(fetchUsersDetailSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchUsersDetailFailure(error));
          return error;
        })
  }
}

export const fetchUserEndPointSuccess = response => ({
  type: usersConstants.GET_ALL_USER_END_POINT_SUCCESS,
  payload: response
})

export const fetchUserEndPointFailure = response => ({
  type: usersConstants.GET_ALL_USER_END_POINT_FAILURE,
  payload: []
})


export const createUser = (data) => {
  return dispatch => {
    return usersService.createUser(data)
      .then(response => {
        dispatch(getAllUsers());
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const updateUser = (id, data) => {
  return dispatch => {
    return usersService.updateUser(id, data)
      .then(response => {
        dispatch(getUsersById(id));
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const deleteUserById = (id) => {
  return dispatch => {
    return usersService.deleteUserById(id)
      .then(response => {
        dispatch(getAllUsers());
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const addUserFace = (id, data) => {
  return dispatch => {
    return usersService.addUserFace(id, data)
      .then(response => {
        dispatch(getUsersById(id));
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const removeUserFace = (id, data) => {
  return dispatch => {
    return usersService.removeUserFace(id, data)
      .then(response => {
        dispatch(getUsersById(id));
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const removeUserGroups = (oloID, data) => {
  return dispatch => {
    return usersService.removeUserGroups(oloID, data)
      .then(response => {
        dispatch(getUsersById(oloID));
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const getUserEndPoints = () => {
  return dispatch => {
    return usersService.getUserEndPoints()
      .then(response => {
        dispatch(fetchUserEndPointSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchUserEndPointFailure(error));
          return error;
        })
  }
}

export const fetchUserHistorySuccess = response => ({
  type: usersConstants.GET_ALL_USER_HISTORY_SUCCESS,
  payload: response
})

export const fetchUserHistoryFailure = response => ({
  type: usersConstants.GET_ALL_USER_HISTORY_FAILURE,
  payload: []
})

export const getUserHistory = () => {
  return dispatch => {
    return usersService.getUserHistory()
      .then(response => {
        dispatch(fetchUserHistorySuccess(response));
        return response;
      },
        error => {
          dispatch(fetchUserHistoryFailure(error));
          return error;
        })
  }
}

export const fetchUserFacesSuccess = response => ({
  type: usersConstants.GET_ALL_USER_FACES_SUCCESS,
  payload: response
})

export const fetchUserFacesFailure = response => ({
  type: usersConstants.GET_ALL_USER_FACES_FAILURE,
  payload: []
})

export const getUserFaces = () => {
  return dispatch => {
    return usersService.getUserFaces()
      .then(response => {
        dispatch(fetchUserFacesSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchUserFacesFailure(error));
          return error;
        })
  }
}

export const fetchUserGroupSuccess = response => ({
  type: usersConstants.GET_ALL_USER_GROUP_SUCCESS,
  payload: response
})

export const fetchUserGroupFailure = response => ({
  type: usersConstants.GET_ALL_USER_GROUP_FAILURE,
  payload: []
})

export const getUserGroup = () => {
  return dispatch => {
    return usersService.getUserGroup()
      .then(response => {
        dispatch(fetchUserGroupSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchUserGroupFailure(error));
          return error;
        })
  }
}

export const fetchUserImportSuccess = response => ({
  type: usersConstants.GET_ALL_USER_IMPORT_SUCCESS,
  payload: response
})

export const fetchUserImportFailure = response => ({
  type: usersConstants.GET_ALL_USER_IMPORT_FAILURE,
  payload: []
})

export const getUserImport = () => {
  return dispatch => {
    return usersService.getUserImport()
      .then(response => {
        dispatch(fetchUserImportSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchUserImportFailure(error));
          return error;
        })
  }
}


export const fetchUserRawJsonSuccess = response => ({
  type: usersConstants.GET_ALL_USER_JSON_SUCCESS,
  payload: response
})

export const fetchUserRawJsonFailure = response => ({
  type: usersConstants.GET_ALL_USER_JSON_FAILURE,
  payload: []
})

export const getUserRawJson = () => {
  return dispatch => {
    return usersService.getUserRawJson()
      .then(response => {
        dispatch(fetchUserRawJsonSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchUserRawJsonFailure(error));
          return error;
        })
  }
}


export const fetchUserConsentSuccess = response => ({
  type: usersConstants.GET_ALL_USER_CONSENT_SUCCESS,
  payload: response
})

export const fetchUserConsentFailure = response => ({
  type: usersConstants.GET_ALL_USER_CONSENT_FAILURE,
  payload: []
})

export const getUserConsent = () => {
  return dispatch => {
    return usersService.getUserConsent()
      .then(response => {
        dispatch(fetchUserConsentSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchUserConsentFailure(error));
          return error;
        })
  }
}

export const setPrimaryUser = (item) => {
  return dispatch => {
    return usersService.setPrimaryUser(item)
      .then(response => {
        dispatch(fetchUserFacesSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchUserFacesFailure(error));
          return error;
        })
  }
}

export const fetchUserSpoofAtemptsSuccess = response => ({
  type: usersConstants.GET_ALL_SPOOF_ATEMPTS_SUCCESS,
  payload: response
})

export const fetchUserSpoofAtemptsFailure = response => ({
  type: usersConstants.GET_ALL_SPOOF_ATEMPTS_FAILURE,
  payload: []
})

export const getUserSpoofAtempts = () => {
  return dispatch => {
    return usersService.getUserSpoofAtempts()
      .then(response => {
        dispatch(fetchUserSpoofAtemptsSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchUserSpoofAtemptsFailure(error));
          return error;
        })
  }
}

export const UserSpoofAtemptsByIdSuccess = response => ({
  type: usersConstants.GET_SPOOF_ATEMPTS_DETAIL_SUCCESS,
  payload: response
})

export const UserSpoofAtemptsByIdFailure = response => ({
  type: usersConstants.GET_SPOOF_ATEMPTS_DETAIL_FAILURE,
  payload: {}
})

export const getUserSpoofAtemptsById = (id) => {
  return dispatch => {
    return usersService.getUserSpoofAtemptsById(id)
      .then(response => {
        dispatch(UserSpoofAtemptsByIdSuccess(response));
        return response;
      },
        error => {
          dispatch(UserSpoofAtemptsByIdFailure(error));
          return error;
        })
  }
}



export const resetUserPassword = (id, data) => {
  return dispatch => {
    return usersService.resetUserPassword(id, data)
      .then(response => {
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}


export const getUsersForDropdown = (filter, isLoading) => {
  return dispatch => {
    return usersService.getAllUsers(filter, isLoading)
      .then(response => {
        return (response && response.data && response.data.users) || [];
      })
  }
}

export const inviteCognitoUser = (data) => {
  return dispatch => {
    return usersService.inviteCognitoUser(data)
      .then(response => {
        dispatch(getAllUsers({ role: 'admin' }));
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const deleteCognitoUser = (id, email) => {
  return dispatch => {
    return usersService.deleteCognitoUser(id, email)
      .then(response => {
        dispatch(getAllUsers({ role: 'admin' }));
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const ImportUserFace = (data) => {
  return dispatch => {
    return usersService.ImportUserFace(data)
      .then(response => {
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const downloadUserFaceLog = (data) => {
  return dispatch => {
    return usersService.downloadUserFaceLog(data)
      .then(response => {
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}