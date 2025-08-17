'use client';
import { useState } from 'react';

export default function DietaryPreferences({ preferences, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  
  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian', color: 'green' },
    { id: 'vegan', label: 'Vegan', color: 'emerald' },
    { id: 'gluten-free', label: 'Gluten-Free', color: 'orange' },
    { id: 'dairy-free', label: 'Dairy-Free', color: 'blue' },
    { id: 'keto', label: 'Keto', color: 'purple' },
    { id: 'paleo', label: 'Paleo', color: 'red' },
    { id: 'low-carb', label: 'Low Carb', color: 'indigo' },
    { id: 'high-protein', label: 'High Protein', color: 'pink' }
  ];

  const handlePreferenceToggle = (preferenceId) => {
    const updatedPreferences = preferences.includes(preferenceId)
      ? preferences.filter(p => p !== preferenceId)
      : [...preferences, preferenceId];
    
    onUpdate(updatedPreferences);
  };

  const getColorClasses = (color, isSelected) => {
    const colorMap = {
      green: isSelected ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200',
      emerald: isSelected ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
      orange: isSelected ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200',
      blue: isSelected ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      purple: isSelected ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200',
      red: isSelected ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200',
      indigo: isSelected ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
      pink: isSelected ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
    };
    return colorMap[color] || colorMap.green;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Dietary Preferences</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          {isEditing ? 'Done' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Select all dietary preferences that apply to you:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {dietaryOptions.map(option => (
              <button
                key={option.id}
                onClick={() => handlePreferenceToggle(option.id)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  getColorClasses(option.color, preferences.includes(option.id))
                }`}
              >
                {preferences.includes(option.id) && '✓ '}
                {option.label}
              </button>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Selected Preferences:</h4>
            {preferences.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {preferences.map(pref => {
                  const option = dietaryOptions.find(opt => opt.id === pref);
                  return (
                    <span key={pref} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {option?.label}
                    </span>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No preferences selected</p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {preferences.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {preferences.map(pref => {
                const option = dietaryOptions.find(opt => opt.id === pref);
                return (
                  <div
                    key={pref}
                    className={`px-4 py-3 rounded-lg text-sm font-medium ${
                      getColorClasses(option?.color || 'green', true)
                    }`}
                  >
                    ✓ {option?.label}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No dietary preferences set</p>
              <button
                onClick={() => setIsEditing(true)}
                className="text-orange-600 hover:text-orange-800 font-medium"
              >
                Add Preferences
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}