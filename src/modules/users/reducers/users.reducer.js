import { usersConstants } from '../constants';
import { combineReducers } from 'redux'
import createReducer from '../../../helpers/createReducer'

const initialState = [];

const usersReducer = createReducer(initialState)({
  [usersConstants.GET_ALL_USERS_SUCCESS]: (state, action) => action.payload,
  [usersConstants.GET_ALL_USERS_FAILURE]: (state, action) => action.payload,
})

const copyUsersReducer = createReducer(initialState)({
  [usersConstants.GET_ALL_USERS_COPY_SUCCESS]: (state, action) => action.payload,
})

const usersDetailReducer = createReducer({})({
  [usersConstants.GET_USERS_DETAIL_SUCCESS]: (state, action) => action.payload,
  [usersConstants.GET_USERS_DETAIL_FAILURE]: (state, action) => action.payload,
})

const usersEndPointReducer = createReducer({})({
  [usersConstants.GET_ALL_USER_END_POINT_SUCCESS]: (state, action) => action.payload,
  [usersConstants.GET_ALL_USER_END_POINT_FAILURE]: (state, action) => action.payload,
})

const usersHistoryReducer = createReducer({})({
  [usersConstants.GET_ALL_USER_HISTORY_SUCCESS]: (state, action) => action.payload,
  [usersConstants.GET_ALL_USER_HISTORY_FAILURE]: (state, action) => action.payload,
})

const usersFacesReducer = createReducer({})({
  [usersConstants.GET_ALL_USER_FACES_SUCCESS]: (state, action) => action.payload,
  [usersConstants.GET_ALL_USER_FACES_FAILURE]: (state, action) => action.payload,
})

const usersJsonReducer = createReducer({})({
  [usersConstants.GET_ALL_USER_JSON_SUCCESS]: (state, action) => action.payload,
  [usersConstants.GET_ALL_USER_JSON_FAILURE]: (state, action) => action.payload,
})

const usersConsentReducer = createReducer([])({
  [usersConstants.GET_ALL_USER_CONSENT_SUCCESS]: (state, action) => action.payload,
  [usersConstants.GET_ALL_USER_CONSENT_FAILURE]: (state, action) => action.payload,
})

const usersImportReducer = createReducer([])({
  [usersConstants.GET_ALL_USER_IMPORT_SUCCESS]: (state, action) => action.payload,
  [usersConstants.GET_ALL_USER_IMPORT_FAILURE]: (state, action) => action.payload,
})
const usersGroupReducer = createReducer([])({
  [usersConstants.GET_ALL_USER_GROUP_SUCCESS]: (state, action) => action.payload,
  [usersConstants.GET_ALL_USER_GROUP_FAILURE]: (state, action) => action.payload,
})
const usersSpoofAtemptsReducer = createReducer([])({
  [usersConstants.GET_ALL_SPOOF_ATEMPTS_SUCCESS]: (state, action) => action.payload,
  [usersConstants.GET_ALL_SPOOF_ATEMPTS_FAILURE]: (state, action) => action.payload,
})
const userSpoofAtemptsDetailReducer = createReducer([])({
  [usersConstants.GET_SPOOF_ATEMPTS_DETAIL_SUCCESS]: (state, action) => action.payload,
  [usersConstants.GET_SPOOF_ATEMPTS_DETAIL_FAILURE]: (state, action) => action.payload,
})

export default combineReducers({
  allUsers: usersReducer,
  allCopyUsers: copyUsersReducer,
  usersDetail: usersDetailReducer,
  userEndPoint: usersEndPointReducer,
  userHistory: usersHistoryReducer,
  userFaces: usersFacesReducer,
  userRawJson: usersJsonReducer,
  userConsent: usersConsentReducer,
  userImports: usersImportReducer,
  userGroup: usersGroupReducer,
  userSpoofAtempts: usersSpoofAtemptsReducer,
  userSpoofAtemptsDetail: userSpoofAtemptsDetailReducer,
})