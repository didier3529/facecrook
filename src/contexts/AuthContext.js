import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import storageService from '../services/storageService';

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
            // Check if user is logging in or signing up
            let user;
            
            if (credentials.isSignup) {
                // Create new user account
                try {
                    user = storageService.createUser({
                        name: credentials.name,
                        email: credentials.email || `${credentials.name.toLowerCase().replace(/\s+/g, '')}@facecrook.com`,
                        identity: credentials.identity || 'Member',
                        aka: credentials.aka || '',
                        profilePicture: credentials.profilePicture || '/default-avatar.jpg',
                        bio: credentials.bio || ''
                    });
                } catch (error) {
                    // User might already exist, try to get them
                    user = storageService.getUserByEmail(credentials.email || credentials.name);
                    if (!user) {
                        throw error;
                    }
                }
            } else {
                // Login existing user
                user = storageService.getUserByEmail(credentials.email || credentials.name);
                if (!user) {
                    throw new Error('User not found. Please sign up first.');
                }
            }

            const mockToken = `token_${btoa(JSON.stringify({ userId: user.id, exp: Date.now() + 86400000 }))}`;

            // Set as current user
            storageService.setCurrentUser(user);
            localStorage.setItem('facecrook_token', mockToken);

            dispatch({
                type: AUTH_ACTIONS.LOGIN_SUCCESS,
                payload: { user, token: mockToken }
            });

            return { success: true, user };
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