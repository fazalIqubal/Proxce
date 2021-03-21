import { userConstants } from '../constants';
import { userService } from '../service';
import _ from 'lodash';
import { setItem, removeItem } from '../../../helpers';


export const fetchLoginRequest = request => ({
  type: userConstants.LOGIN_REQUEST,
  payload: {
    loggingIn: true,
    user: request
  }
})

export const fetchLoginSuccess = request => ({
  type: userConstants.LOGIN_SUCCESS,
  payload: { user: { ...request } }
})
export const fetchLoginFailure = error => ({
  type: userConstants.LOGIN_FAILURE,
  payload: {}
})


export const login = (username, password, type) => {
  return dispatch => {
    dispatch(fetchLoginRequest({ username }));
    return userService.login(username, password, type)
      .then(response => {
        response.accesstoken = _.get(response, 'signInUserSession.idToken.jwtToken');
        var user = { username: username, accesstoken: response.accesstoken };
        if (response.attributes) {
          user["email"] = response.attributes["email"];
          user["role"] = response.attributes["custom:role"];
          user["tenantName"] = response.attributes["custom:tenantName"];
          user["tenantID"] = response.attributes["custom:tenantID"];
          user["username"] = response.username;
        }
        if (response.pool && response.pool.userPoolId) {
          user["region"] = _.first(response.pool.userPoolId.split('_'));
        }

        setItem('user', user);
        dispatch(fetchLoginSuccess(user));
        return response;
      },
        error => {
          dispatch(fetchLoginFailure(error));
          return error
        })
  }
}

export const setNewPassword = (user, newPassword) => {
  return dispatch => {
    return userService.setNewPassword(user, newPassword)
      .then(response => {
        response.accesstoken = _.get(response, 'signInUserSession.accessToken.jwtToken');
        var userObj = { username: user.username, accesstoken: response.accesstoken };
        if (response.attributes) {
          userObj["email"] = response.attributes["email"];
          userObj["role"] = response.attributes["custom:role"];
          userObj["tenantName"] = response.attributes["custom:tenantName"];
          userObj["tenantID"] = response.attributes["custom:tenantID"];
          userObj["username"] = response.username;
        }
        if (response.pool && response.pool.userPoolId) {
          userObj["region"] = _.first(response.pool.userPoolId.split('_'));
        }
        setItem('user', userObj);
        dispatch(fetchLoginSuccess(user));
        return response;
      },
        error => {
          dispatch(fetchLoginFailure(error));
          return error
        })
  }
}

export const forgotPasswordSubmit = (username, code, new_password) => {
  return dispatch => {
    return userService.forgotPasswordSubmit(username, code, new_password)
      .then(response => {
        return dispatch(login(username, new_password))
          .then((response) => {
            return response;
          })
      },
        error => {
          dispatch(fetchLoginFailure(error));
          return error
        })
  }
}

export const userlogout = () => ({
  type: userConstants.LOGOUT,
  payload: {}
})


export const logout = () => {
  return dispatch => {
    userService.logout();
    return dispatch(userlogout());
  }
}