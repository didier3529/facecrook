import ApiService from './ApiService';
import jwtDecode from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

function setAuthHeader(token) {
  if (typeof ApiService.setAuthHeader === 'function') {
    ApiService.setAuthHeader(token);
  } else if (ApiService.defaults && ApiService.defaults.headers) {
    if (token) {
      ApiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete ApiService.defaults.headers.common['Authorization'];
    }
  }
}

function clearAuthHeader() {
  if (typeof ApiService.setAuthHeader === 'function') {
    ApiService.setAuthHeader(null);
  } else if (ApiService.defaults && ApiService.defaults.headers) {
    delete ApiService.defaults.headers.common['Authorization'];
  }
}

const userAuthService = {
  login: async (credentials) => {
    try {
      const response = await ApiService.post('/auth/login', credentials);
      const { token, refreshToken } = response.data;
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      setAuthHeader(token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signup: (data) => {
    return ApiService.post('/auth/signup', data);
  },

  refreshToken: async () => {
    const currentRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!currentRefreshToken) {
      throw new Error('No refresh token available');
    }
    try {
      const response = await ApiService.post('/auth/refresh', { refreshToken: currentRefreshToken });
      const { token, refreshToken } = response.data;
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      setAuthHeader(token);
      return response.data;
    } catch (error) {
      userAuthService.logout();
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    clearAuthHeader();
  },

  getAccessToken: () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

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

// Initialize authorization header on load if token is valid
if (userAuthService.isAuthenticated()) {
  setAuthHeader(userAuthService.getAccessToken());
} else {
  userAuthService.logout();
}

export default userAuthService;