import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

// Initial authentication state
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null
};

// Authentication action types
export const AUTH_ACTIONS = {
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    UPDATE_USER: 'UPDATE_USER',
    CLEAR_ERROR: 'CLEAR_ERROR'
};

// Authentication reducer
function authReducer(state, action) {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN_START:
            return {
                ...state,
                loading: true,
                error: null
            };

        case AUTH_ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
                error: null
            };

        case AUTH_ACTIONS.LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                loading: false,
                error: action.payload
            };

        case AUTH_ACTIONS.LOGOUT:
            return {
                ...initialState
            };

        case AUTH_ACTIONS.UPDATE_USER:
            return {
                ...state,
                user: { ...state.user, ...action.payload }
            };

        case AUTH_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}

// Create the Auth Context
const AuthContext = createContext();

// Auth Provider Component
export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load auth state from localStorage on mount
    useEffect(() => {
        const savedToken = localStorage.getItem('facecrook_token');
        const savedUser = localStorage.getItem('facecrook_user');

        if (savedToken && savedUser) {
            try {
                const user = JSON.parse(savedUser);
                dispatch({
                    type: AUTH_ACTIONS.LOGIN_SUCCESS,
                    payload: { user, token: savedToken }
                });
            } catch (error) {
                // Invalid saved data, clear it
                localStorage.removeItem('facecrook_token');
                localStorage.removeItem('facecrook_user');
            }
        }
    }, []);

    // Auth actions
    const login = async (credentials) => {
        dispatch({ type: AUTH_ACTIONS.LOGIN_START });

        try {
            // Simulate login API call (since this is a satirical app)
            await new Promise(resolve => {
                setTimeout(resolve, 1000);
            });

            // Mock successful login
            const mockUser = {
                id: `user_${Date.now()}`,
                name: credentials.name || 'Crypto Enthusiast',
                email: credentials.email || 'hodler@facecrook.com',
                identity: credentials.identity || 'Diamond Hands',
                avatar: `https://api.dicebear.com/6.x/avataaars/svg?seed=${credentials.name}`,
                joinDate: new Date().toISOString(),
                tokens: 1000, // Starting token balance
                level: 'Newbie Trader'
            };

            const mockToken = `token_${btoa(JSON.stringify({ userId: mockUser.id, exp: Date.now() + 86400000 }))}`;

            // Save to localStorage
            localStorage.setItem('facecrook_token', mockToken);
            localStorage.setItem('facecrook_user', JSON.stringify(mockUser));

            dispatch({
                type: AUTH_ACTIONS.LOGIN_SUCCESS,
                payload: { user: mockUser, token: mockToken }
            });

            return { success: true, user: mockUser };
        } catch (error) {
            dispatch({
                type: AUTH_ACTIONS.LOGIN_FAILURE,
                payload: error.message || 'Login failed'
            });
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('facecrook_token');
        localStorage.removeItem('facecrook_user');
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
    };

    const updateUser = (updates) => {
        const updatedUser = { ...state.user, ...updates };
        localStorage.setItem('facecrook_user', JSON.stringify(updatedUser));
        dispatch({
            type: AUTH_ACTIONS.UPDATE_USER,
            payload: updates
        });
    };

    const clearError = () => {
        dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
    };

    // Context value
    const contextValue = {
        ...state,
        login,
        logout,
        updateUser,
        clearError
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

// Custom hook to use the Auth Context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Export the context for direct use if needed
export { AuthContext };
export default AuthContext; 