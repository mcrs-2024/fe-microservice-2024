import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { APIResponse } from 'src/constants/types';
import { loginRoute } from 'src/routes/routes.contants';

import envConfig from '../../config';
// Define a custom interface for your axios responses
interface CustomAxiosResponse<T = any> extends AxiosResponse {
  data: APIResponse<T>;
}

// Extend the Axios instance
interface CustomAxiosInstance extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<CustomAxiosResponse>;
}

const axiosClient: CustomAxiosInstance = axios.create({
  baseURL: envConfig.API_URL,
  headers: {
    'content-type': 'application/json',
  },
  timeout: 5 * 60 * 1000, // 5 minutes
  method: 'POST',
  paramsSerializer: params => qs.stringify(params),
});
const handleHardLogout = () => {
  if (envConfig.AUTH_DISABLE) {
    return;
  }
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = loginRoute + '?next=' + window.location.pathname;
};

axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;

    switch (error.response?.status) {
      case 401:
        handleHardLogout();
        message = 'Invalid credentials';
        break;
      case 403:
        message = 'Access Forbidden';
        break;
      case 404:
        message = 'Sorry! the data you are looking for could not be found';
        break;
    }

    message =
      error.response && error.response.data
        ? error.response.data['message']
        : error.message || error;

    return Promise.reject(message);
  },
);

export default axiosClient;
