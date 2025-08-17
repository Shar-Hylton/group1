'use client';
import { useState, useEffect } from 'react';

export default function RecipeCard({ recipe, onAddToMealPlan, onRemoveFromMealPlan }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isInMealPlan, setIsInMealPlan] = useState(false);

  useEffect(() => {
    // Check if recipe is already in meal plan
    const mealPlan = JSON.parse(localStorage.getItem('mealPlan') || '{}');
    const isAdded = Object.values(mealPlan).some(day => 
      Object.values(day).some(meal => meal === recipe.title)
    );
    setIsInMealPlan(isAdded);
  }, [recipe.title]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDietaryBadgeColor = (dietary) => {
    const colors = {
      vegetarian: 'bg-green-100 text-green-800',
      vegan: 'bg-emerald-100 text-emerald-800',
      'gluten-free': 'bg-orange-100 text-orange-800',
      keto: 'bg-purple-100 text-purple-800',
      paleo: 'bg-red-100 text-red-800'
    };
    return colors[dietary] || 'bg-gray-100 text-gray-800';
  };

  const handleMealPlanAction = () => {
    if (isInMealPlan) {
      onRemoveFromMealPlan(recipe);
      setIsInMealPlan(false);
    } else {
      onAddToMealPlan(recipe);
      setIsInMealPlan(true);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Recipe Image */}
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        
        {/* Difficulty Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
          {recipe.difficulty}
        </div>
      </div>

      {/* Recipe Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{recipe.title}</h3>
        
        {/* Recipe Stats */}
        <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.cookTime}m
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {recipe.servings}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {recipe.calories} cal
          </div>
        </div>

        {/* Dietary Badges */}
        {recipe.dietary.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {recipe.dietary.map(diet => (
              <span key={diet} className={`px-2 py-1 rounded-full text-xs font-medium ${getDietaryBadgeColor(diet)}`}>
                {diet}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
          >
            {showDetails ? 'Hide Details' : 'View Recipe'}
          </button>
          <button 
            onClick={handleMealPlanAction}
            className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
              isInMealPlan 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'border border-green-500 text-green-600 hover:bg-green-50'
            }`}
          >
            {isInMealPlan ? 'Remove' : 'Add to Plan'}
          </button>
        </div>

        {/* Expandable Details */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Ingredients:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}