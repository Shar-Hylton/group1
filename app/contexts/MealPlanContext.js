'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = { plans: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PLANS': return { ...state, plans: action.payload };
    case 'ADD_PLAN': return { ...state, plans: [...state.plans, action.payload] };
    case 'UPDATE_PLAN': return { ...state, plans: state.plans.map(p => p.id === action.payload.id ? action.payload : p) };
    case 'REMOVE_PLAN': return { ...state, plans: state.plans.filter(p => p.id !== action.payload) };
    default: return state;
  }
}

const MealPlanContext = createContext(null);

export function MealPlanProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('sm_mealplans');
    if (saved) dispatch({ type: 'SET_PLANS', payload: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem('sm_mealplans', JSON.stringify(state.plans));
  }, [state.plans]);

  // Helper: set a single meal text for a given day and mealType
  const setMealForDay = (day, mealType, text) => {
    // Plan shape: { id, day, meals: { breakfast, lunch, dinner } }
    const existing = state.plans.find(p => p.day === day);
    if (existing) {
      const updated = {
        ...existing,
        meals: { ...(existing.meals || {}), [mealType]: text }
      };
      dispatch({ type: 'UPDATE_PLAN', payload: updated });
    } else {
      const newPlan = {
        id: Date.now(),
        day,
        meals: { [mealType]: text }
      };
      dispatch({ type: 'ADD_PLAN', payload: newPlan });
    }
  };

  const getMealForDay = (day, mealType) => {
    const plan = state.plans.find(p => p.day === day);
    return plan?.meals?.[mealType] ?? '';
  };

  const value = {
    plans: state.plans,
    setPlans: (p) => dispatch({ type: 'SET_PLANS', payload: p }),
    addPlan: (p) => dispatch({ type: 'ADD_PLAN', payload: p }),
    updatePlan: (p) => dispatch({ type: 'UPDATE_PLAN', payload: p }),
    removePlan: (id) => dispatch({ type: 'REMOVE_PLAN', payload: id }),

    // new helpers
    setMealForDay,
    getMealForDay,
  };

  return <MealPlanContext.Provider value={value}>{children}</MealPlanContext.Provider>;
}

export const useMealPlan = () => {
  const ctx = useContext(MealPlanContext);
  if (!ctx) throw new Error('useMealPlan must be used within MealPlanProvider');
  return ctx;
};