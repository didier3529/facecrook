import jwtDecode from 'jwt-decode';
import apiService from './apiService';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const userAuthService = {
  login: async (credentials) => {
    const response = await apiService.post('/auth/login', credentials);
    const { token, refreshToken } = response.data;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    return response.data;
  },

  signup: async (data) => {
    const response = await apiService.post('/auth/signup', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),

  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),

  isAuthenticated: () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) return false;
    try {
      const { exp } = jwtDecode(token);
      if (typeof exp !== 'number') return false;
      return exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
};

export default userAuthService;