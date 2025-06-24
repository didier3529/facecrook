import axios from 'axios';
import AuthService from './userAuthService';

const baseURL = process.env.REACT_APP_API_URL || '';

const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  config => {
    const token = AuthService.getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      const refreshToken = AuthService.getRefreshToken();
      if (!refreshToken) {
        AuthService.logout();
        return Promise.reject(error);
      }
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }
      originalRequest._retry = true;
      isRefreshing = true;
      return new Promise((resolve, reject) => {
        AuthService.refreshToken()
          .then(({ data }) => {
            const newToken = data.accessToken;
            AuthService.setAuthHeader(newToken);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            processQueue(null, newToken);
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          })
          .catch(err => {
            processQueue(err, null);
            AuthService.logout();
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;