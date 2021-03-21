
import { Map } from "immutable";
import { getDefaultPath } from "../../../helpers/urlSync";
import actions, { getView } from "../action/user.actions";
import { combineReducers } from 'redux'
import createReducer from '../../../helpers/createReducer'

const preKeys = getDefaultPath();

const initState = new Map({
  collapsed: window.innerWidth > 1220 ? false : true,
  view: getView(window.innerWidth),
  height: window.innerHeight,
  openDrawer: false,
  openKeys: preKeys,
  current: preKeys
});

const appReducer = createReducer(initState)({
  [actions.COLLPSE_CHANGE]: (state, action) => {
    return state.set("collapsed", !state.get("collapsed"));
     
  },
  [actions.COLLPSE_OPEN_DRAWER]: (state, action) => {
    return state.set("openDrawer", !state.get("openDrawer"));
 
  },
  [actions.TOGGLE_ALL]: (state, action) => {
    if (state.get("view") !== action.view || action.height !== state.height) {
      const height = action.height ? action.height : state.height;
      return state
        .set("collapsed", action.collapsed)
        .set("view", action.view)
        .set("height", height);
    }
   
  },
  [actions.CHANGE_OPEN_KEYS]: (state, action) => {
    return state.set("openDrawer", !state.get("openDrawer"));
  },
  [actions.CHANGE_CURRENT]: (state, action) => {
    return state.set("current", action.current);
  },
})


export default combineReducers({
  App: appReducer
})
