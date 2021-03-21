import { transactionsConstants } from '../constants';
import { transactionsService } from '../service';

export const fetchTransactionsSuccess = response => ({
  type: transactionsConstants.GET_ALL_TRANSACTIONS_SUCCESS,
  payload: response
})

export const fetchTransactionsFailure = response => ({
  type: transactionsConstants.GET_ALL_TRANSACTIONS_FAILURE,
  payload: []
})

export const getAllTransactions = () => {
  return dispatch => {
    return transactionsService.getAllTransactions()
      .then(response => {
        dispatch(fetchTransactionsSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchTransactionsFailure(error));
          return error;
        })
  }
}
export const fetchTransactionsDetailSuccess = response => ({
  type: transactionsConstants.GET_TRANSACTIONS_DETAIL_SUCCESS,
  payload: response
})

export const fetchTransactionsDetailFailure = response => ({
  type: transactionsConstants.GET_TRANSACTIONS_DETAIL_FAILURE,
  payload: {}
})

export const getTransactionsById = (id) => {
  return dispatch => {
    return transactionsService.getTransactionsById(id)
      .then(response => {
        dispatch(fetchTransactionsDetailSuccess(response));
        return response;
      },
        error => {
          dispatch(fetchTransactionsDetailFailure(error));
          return error;
        })
  }
}




