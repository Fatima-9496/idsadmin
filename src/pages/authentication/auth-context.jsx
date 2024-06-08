// auth-context.js
import React, { createContext, useReducer, useEffect } from 'react';

// Define the initial state and action types
const initialState = {
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
    user: JSON.parse(localStorage.getItem('user')) || null,
};

const AUTH_ACTIONS = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
};

// Create the auth reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case AUTH_ACTIONS.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated));
        localStorage.setItem('user', JSON.stringify(state.user));
    }, [state.isAuthenticated, state.user]);

    const login = (user) => {
        dispatch({ type: AUTH_ACTIONS.LOGIN, payload: user });
    };

    const logout = () => {
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const AuthContext = createContext();
