'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = { user: null, loading: false };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER': return { ...state, user: action.payload };
    case 'CLEAR_USER': return { ...state, user: null };
    case 'SET_LOADING': return { ...state, loading: action.payload };
    default: return state;
  }
}

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('sm_user');
    if (saved) dispatch({ type: 'SET_USER', payload: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    if (state.user) localStorage.setItem('sm_user', JSON.stringify(state.user));
    else localStorage.removeItem('sm_user');
  }, [state.user]);

  const value = {
    user: state.user,
    loading: state.loading,
    setUser: (u) => dispatch({ type: 'SET_USER', payload: u }),
    clearUser: () => dispatch({ type: 'CLEAR_USER' }),
    setLoading: (v) => dispatch({ type: 'SET_LOADING', payload: v }),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};