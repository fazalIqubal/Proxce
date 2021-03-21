import { combineReducers } from 'redux'
import createReducer from '../../../helpers/createReducer'

const fixSideBarReducer = createReducer({menuId :1})({
  ['SET_SELECTED_MENU']: (state, action) => {
    return {
      ...state,
      menuId: action.id
    };
  },
  ['SET_NOTE']: (state, action) => {
    return {
      ...state,
      note: action.note
    };
  },
})

export default combineReducers({
  fixSideBarReducer: fixSideBarReducer
})
