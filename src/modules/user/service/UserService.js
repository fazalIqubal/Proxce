import { requestDelete, requestGet, requestPost, requestPut } from '../../../services/requests';
import Auth from '@aws-amplify/auth';
/**
 * Supports all operations exposed by the user controller.
 */


export class UserService {

  constructor(authEndpoint) {
    this.authEndpoint = authEndpoint;
  }

  // login(username, password, type) {
  //   const url = this.authUrl('/users/sign_in_candidate');
  //   return requestPost(url, { email: username, password: password });
  // }

  login(username, password, type) {
    // const url = this.authUrl('/login');
    // return requestPost(url, { name: username, password: password });
    return new Promise((resolve, reject) => {
      Auth.signIn(username, password)
        .then(success => resolve(success))
        .catch(err => reject(err));
    });
  }

  setNewPassword(user, newPassword) {
    return new Promise((resolve, reject) => {
      Auth.completeNewPassword(user, newPassword)
        .then(success => resolve(success))
        .catch(err => reject(err));
    });
  }

  forgotPasswordSubmit(username, code, new_password) {
    return new Promise((resolve, reject) => {
      Auth.forgotPasswordSubmit(username, code, new_password)
        .then(success => resolve(success))
        .catch(err => reject(err));
    });
  }

  logout() {
    // remove user from local storage to log user out
    Auth.signOut();
    localStorage.clear();
    localStorage.removeItem('user');
  }

  users() {
    const url = this.authUrl('/users');
    return requestGet(url);
  };

  /**
   * Returns the new user or a string containing the error message.
   */
  createUser(user) {
    const url = this.authUrl('/users');
    return requestPost(url, user);
  };

  /**
   * Returns the updated user or a string containing the error message.
   */
  updateUser(user) {
    const url = this.authUrl('/users/' + user.id);
    return requestPut(url, user);
  };

  /**
   * Returns a string message on success.
   */
  deleteUser(userId) {
    const url = this.authUrl('/users/' + userId);
    return requestDelete(url);
  };

  roles() {
    const url = this.authUrl('/roles');
    return requestGet(url);
  };

  authUrl(append) {
    return this.authEndpoint + append;
  }
}
