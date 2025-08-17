'use client';
import React from 'react';
import { UserProvider } from './contexts/UserContext';
import { PreferencesProvider } from './contexts/PreferencesContext';
import { MealPlanProvider } from './contexts/MealPlanContext';

export default function Providers({ children }) {
  return (
    <UserProvider>
      <PreferencesProvider>
        <MealPlanProvider>{children}</MealPlanProvider>
      </PreferencesProvider>
    </UserProvider>
  );
}