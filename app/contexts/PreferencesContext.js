'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultPrefs = { dietary: [], servings: 4, units: 'metric' };

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(defaultPrefs);

  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('sm_prefs');
    if (saved) setPreferences(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('sm_prefs', JSON.stringify(preferences));
  }, [preferences]);

  const update = (patch) => setPreferences(prev => ({ ...prev, ...patch }));

  return (
    <PreferencesContext.Provider value={{ preferences, update }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export const usePreferences = () => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used within PreferencesProvider');
  return ctx;
};