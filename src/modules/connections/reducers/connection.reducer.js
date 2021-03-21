import { connectionConstants } from '../constants';
import { combineReducers } from 'redux'
import createReducer from '../../../helpers/createReducer'

const initialState = [];

const connectionReducer = createReducer([])({
  [connectionConstants.GET_ALL_CONNECTION_SUCCESS]: (state, action) => action.payload,
  [connectionConstants.GET_ALL_CONNECTION_FAILURE]: (state, action) => action.payload,
})

const copCconnectionReducer = createReducer([])({
  [connectionConstants.GET_ALL_CONNECTION_COPY_SUCCESS]: (state, action) => action.payload
})


const connectionDetailReducer = createReducer({})({
  [connectionConstants.GET_CONNECTION_DETAIL_SUCCESS]: (state, action) => action.payload,
  [connectionConstants.GET_CONNECTION_DETAIL_FAILURE]: (state, action) => action.payload,
})


export default combineReducers({
  allConnections: connectionReducer,
  allCopyConnections: copCconnectionReducer,
  connectionDetail: connectionDetailReducer
})