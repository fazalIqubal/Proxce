import axios from 'axios';
import { history } from './history';
import _ from "lodash";

/**
 * @returns Unregister callback
 */

const hideShow = (flag) => {
  if (document.getElementById("ui_block")) {
    document.getElementById("ui_block").style.display = flag;
  }
}

const isHandlerLoading = (config = {}) => {
  return config.hasOwnProperty('isLoading') && config.isLoading ?
    true : false
}

export function axiosInterceptors() {
  axios.interceptors.request.use((config) => {
    if (isHandlerLoading(config)) {
      hideShow('flex')
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.accesstoken) {
      config.headers.common['Authorization'] = user.accesstoken;
    }


    return config;
  }, (error) => {
    setTimeout(() => {
      hideShow('none')
    }, 500)
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
    setTimeout(() => {
      hideShow('none')
    }, 500)
    return response;
  }, (error) => {
    setTimeout(() => {
      hideShow('none')
    }, 500)
    if (error.response && 401 === error.response.status) {
      localStorage.clear();
      history.push('/login');
    }
    return Promise.reject(error);
  });
}
