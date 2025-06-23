import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const apiService = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to include auth token
apiService.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const newConfig = { ...config };
            newConfig.headers.Authorization = `Bearer ${token}`;
            return newConfig;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor to handle token refresh
apiService.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest.retryAttempted) {
            originalRequest.retryAttempted = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const response = await axios.post(`${baseURL}/auth/refresh`, {
                    refreshToken
                });

                const { token, refreshToken: newRefreshToken } = response.data;

                localStorage.setItem('accessToken', token);
                localStorage.setItem('refreshToken', newRefreshToken);

                originalRequest.headers.Authorization = `Bearer ${token}`;
                return apiService(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiService; 