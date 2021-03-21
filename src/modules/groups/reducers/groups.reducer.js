import { groupsConstants } from '../constants';
import { combineReducers } from 'redux'
import createReducer from '../../../helpers/createReducer'

const initialState = [];

const groupsReducer = createReducer(initialState)({
  [groupsConstants.GET_ALL_GROUPS_SUCCESS]: (state, action) => action.payload,
  [groupsConstants.GET_ALL_GROUPS_FAILURE]: (state, action) => action.payload,
})

const copyGroupsReducer = createReducer(initialState)({
  [groupsConstants.GET_ALL_COPY_GROUPS_SUCCESS]: (state, action) => action.payload
})

const groupDetailReducer = createReducer({})({
  [groupsConstants.GET_GROUPS_DETAIL_SUCCESS]: (state, action) => action.payload,
  [groupsConstants.GET_GROUPS_DETAIL_FAILURE]: (state, action) => action.payload,
})

const groupEndpointReducer = createReducer([])({
  [groupsConstants.GET_ALL_GROUP_ENDPOINT_SUCCESS]: (state, action) => action.payload,
  [groupsConstants.GET_ALL_GROUP_ENDPOINT_FAILURE]: (state, action) => action.payload,
})
const groupUserReducer = createReducer([])({
  [groupsConstants.GET_ALL_GROUP_USER_SUCCESS]: (state, action) => action.payload,
  [groupsConstants.GET_ALL_GROUP_USER_FAILURE]: (state, action) => action.payload,
})

export default combineReducers({
  allGroups: groupsReducer,
  allCopyGroups: copyGroupsReducer,
  groupDetail: groupDetailReducer,
  groupEndpoint: groupEndpointReducer,
  groupUser: groupUserReducer,

})