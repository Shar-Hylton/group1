'use client';

import { useState } from 'react';
import { useMealPlan } from '../contexts/MealPlanContext';

export default function MealPlanCard({ title, mealType, selectedDay, value, onUpdate }) {
  const { setMealForDay, getMealForDay } = useMealPlan();
  const [localValue, setLocalValue] = useState('');

  // derive displayed value: prefer prop 'value', otherwise take from context
  const contextValue = getMealForDay(selectedDay, mealType);
  const displayValue = value ?? (localValue !== '' ? localValue : contextValue ?? '');

  const handleInputChange = (e) => {
    const newVal = e.target.value;
    setLocalValue(newVal);
    if (typeof onUpdate === 'function') {
      onUpdate(selectedDay, mealType, newVal);
    } else {
      setMealForDay(selectedDay, mealType, newVal);
    }
  };

  const mealSuggestions = {
    breakfast: ['Oatmeal with Berries', 'Avocado Toast', 'Greek Yogurt Parfait', 'Scrambled Eggs'],
    lunch: ['Quinoa Salad', 'Chicken Wrap', 'Vegetable Soup', 'Caesar Salad'],
    dinner: ['Grilled Salmon', 'Pasta Primavera', 'Stir-fry Vegetables', 'Chicken Curry']
  };

  const suggestions = mealSuggestions[mealType] || [];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{selectedDay}</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's for {title.toLowerCase()}?
          </label>
          <input
            type="text"
            value={displayValue}
            onChange={handleInputChange}
            placeholder={`Enter ${title.toLowerCase()} meal...`}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Quick Suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() =>
                  (typeof onUpdate === 'function')
                    ? onUpdate(selectedDay, mealType, suggestion)
                    : setMealForDay(selectedDay, mealType, suggestion)
                }
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {(displayValue) && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-800 font-medium">Planned: {displayValue}</span>
              <button
                onClick={() => {
                  setLocalValue('');
                  if (typeof onUpdate === 'function') onUpdate(selectedDay, mealType, '');
                  else setMealForDay(selectedDay, mealType, '');
                }}
                className="text-xs text-red-600 hover:text-red-800"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}