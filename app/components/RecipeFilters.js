'use client';
import { getHealthOptions } from '../lib/spoonacular';

export default function RecipeFilters({ 
  selectedCategory, 
  selectedDietary, 
  onCategoryChange, 
  onDietaryChange 
}) {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snacks' }
  ];

  const dietaryOptions = [
    { value: '', label: 'All Dietary Preferences' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten-Free' },
    { value: 'dairy-free', label: 'Dairy-Free' },
    { value: 'keto-friendly', label: 'Keto-Friendly' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'low-carb', label: 'Low-Carb' },
    { value: 'low-fat', label: 'Low-Fat' },
    { value: 'low-sodium', label: 'Low-Sodium' }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preference</label>
        <select
          value={selectedDietary}
          onChange={(e) => onDietaryChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {dietaryOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}