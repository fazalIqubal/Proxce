import { transactionsConstants } from '../constants';
import { combineReducers } from 'redux'
import createReducer from '../../../helpers/createReducer'

const initialState = [];

const transactionsReducer = createReducer(initialState)({
  [transactionsConstants.GET_ALL_TRANSACTIONS_SUCCESS]: (state, action) => action.payload,
  [transactionsConstants.GET_ALL_TRANSACTIONS_FAILURE]: (state, action) => action.payload,
})

const transactionsDetailReducer = createReducer({})({
  [transactionsConstants.GET_TRANSACTIONS_DETAIL_SUCCESS]: (state, action) => action.payload,
  [transactionsConstants.GET_TRANSACTIONS_DETAIL_FAILURE]: (state, action) => action.payload,
})



export default combineReducers({
  allTransactions: transactionsReducer,
  transactionsDetail: transactionsDetailReducer,
})