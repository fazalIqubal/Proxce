import { groupsConstants } from '../constants';
import { groupsService } from '../service';
import _ from 'lodash';

export const fetchGroupsSuccess = response => ({
  type: groupsConstants.GET_ALL_GROUPS_SUCCESS,
  payload: response
})
export const copyGroupsSuccess = response => ({
  type: groupsConstants.GET_ALL_COPY_GROUPS_SUCCESS,
  payload: response
})

export const fetchGroupsFailure = response => ({
  type: groupsConstants.GET_ALL_GROUPS_FAILURE,
  payload: []
})

export const getAllGroups = () => {
  return dispatch => {
    return groupsService.getAllGroups()
      .then(response => {
        let groups = (response.data && response.data.groups) || [];
        groups = _.orderBy(groups, ['CreatedAt'], ['desc']);
        dispatch(fetchGroupsSuccess(groups));
        dispatch(copyGroupsSuccess(groups));
        return response;
      },
        error => {
          dispatch(fetchGroupsFailure(error));
          return error;
        })
  }
}

export const filterGroups = (filter) => {
  return (dispatch, state) => {
    const data = state().groups.allCopyGroups
    const allCopyGroups = JSON.parse(JSON.stringify(data));
    let filtered = allCopyGroups || [];
    if (filter.search) {
      filtered = _.filter(filtered, (res) => {
        return res.GroupName && (
          res.GroupName.toLowerCase().indexOf(filter.search.toLowerCase()) !== -1
          || res.GroupID.toLowerCase().indexOf(filter.search.toLowerCase()) !== -1);
      })
    }
    dispatch(fetchGroupsSuccess(filtered));
  }
}

export const fetchGroupsDetailSuccess = response => ({
  type: groupsConstants.GET_GROUPS_DETAIL_SUCCESS,
  payload: response
})

export const fetchGroupsDetailFailure = response => ({
  type: groupsConstants.GET_GROUPS_DETAIL_FAILURE,
  payload: {}
})

export const getGroupById = (id) => {
  return dispatch => {
    return groupsService.getGroupById(id)
      .then(response => {
        let group = (response.data && response.data) || {};
        dispatch(fetchGroupsDetailSuccess(group));
        return response;
      },
        error => {
          dispatch(fetchGroupsDetailFailure(error));
          return error;
        })
  }
}

export const deleteGroupById = (id) => {
  return dispatch => {
    return groupsService.deleteGroupById(id)
      .then(response => {
        dispatch(getAllGroups());
        return response;
      },
        error => {
          error.error = true;
          return error;
        })
  }
}

export const createGroup = (data) => {
  return dispatch => {
    return groupsService.createGroup(data)
      .then(response => {
        dispatch(getAllGroups());
        return response;
      },
        error => {
          return error;
        })
  }
}

export const updateGroup = (data) => {
  return dispatch => {
    return groupsService.updateGroup(data)
      .then(response => {
        dispatch(getGroupById(data.GroupID));
        return response;
      },
        error => {
          return error;
        })
  }
}

export const addGroupUser = (data) => {
  return dispatch => {
    return groupsService.addGroupUser(data)
      .then(response => {
        dispatch(getGroupById(data.GroupID));
        return response;
      },
        error => {
          return error;
        })
  }
}

export const removeGroupUser = (groupID, data) => {
  return dispatch => {
    return groupsService.removeGroupUser(groupID, data)
      .then(response => {
        dispatch(getGroupById(groupID));
        return response;
      },
        error => {
          return error;
        })
  }
}


export const addGroupEndpoints = (data) => {
  return dispatch => {
    return groupsService.addGroupEndpoints(data)
      .then(response => {
        dispatch(getGroupById(data.GroupID));
        return response;
      },
        error => {
          return error;
        })
  }
}

export const removeGroupEndpoints = (groupID, data) => {
  return dispatch => {
    return groupsService.removeGroupEndpoints(groupID, data)
      .then(response => {
        dispatch(getGroupById(groupID));
        return response;
      },
        error => {
          return error;
        })
  }
}