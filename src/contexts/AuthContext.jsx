import React, { createContext, useReducer, useCallback } from 'react';

// Action types
const SIGN_IN_START = 'SIGN_IN_START';
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
const SIGN_UP_START = 'SIGN_UP_START';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
const SIGN_OUT = 'SIGN_OUT';

// Initial state
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN_START:
    case SIGN_UP_START:
      return { ...state, loading: true, error: null };
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return { ...state, currentUser: action.payload, loading: false, error: null };
    case SIGN_IN_FAILURE:
    case SIGN_UP_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case SIGN_OUT:
      return { ...initialState };
    default:
      return state;
  }
};


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signIn = useCallback((email, password) => {
    dispatch({ type: SIGN_IN_START });
   
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password') {
        dispatch({ type: SIGN_IN_SUCCESS, payload: { email } });
      } else {
        dispatch({ type: SIGN_IN_FAILURE, payload: 'Invalid email or password' });
      }
    }, 1000);
  }, []);

  const signUp = useCallback((username, email, password) => {
    dispatch({ type: SIGN_UP_START });
   
    setTimeout(() => {
    
      if (email && password) {
        dispatch({ type: SIGN_UP_SUCCESS, payload: { email, username } });
      } else {
        dispatch({ type: SIGN_UP_FAILURE, payload: 'Registration failed' });
      }
    }, 1000);
  }, []);

  const signOut = useCallback(() => {
    dispatch({ type: SIGN_OUT });
  }, []);

  const value = {
    ...state,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};