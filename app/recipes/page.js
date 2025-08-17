'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeFilters from '../components/RecipeFilters';
import Notification from '../components/Notification';
import { searchRecipes } from '../lib/spoonacular';

// Lazy load the RecipeCard component
const LazyRecipeCard = dynamic(() => import('../components/RecipeCard'), {
  loading: () => <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>,
  ssr: false
});

export default function Recipes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDietary, setSelectedDietary] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [useAPI, setUseAPI] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  // Mock recipe data
  const mockRecipes = [
    {
      id: 1,
      title: 'Avocado Toast with Poached Egg',
      image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg',
      cookTime: 15,
      servings: 2,
      calories: 320,
      category: 'breakfast',
      dietary: ['vegetarian'],
      difficulty: 'easy',
      ingredients: ['Bread', 'Avocado', 'Eggs', 'Salt', 'Pepper']
    },
    {
      id: 2,
      title: 'Quinoa Buddha Bowl',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      cookTime: 25,
      servings: 2,
      calories: 450,
      category: 'lunch',
      dietary: ['vegetarian', 'gluten-free'],
      difficulty: 'medium',
      ingredients: ['Quinoa', 'Chickpeas', 'Avocado', 'Sweet Potato', 'Spinach', 'Tahini']
    },
    {
      id: 3,
      title: 'Grilled Salmon with Vegetables',
      image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg',
      cookTime: 20,
      servings: 4,
      calories: 380,
      category: 'dinner',
      dietary: ['keto', 'paleo'],
      difficulty: 'medium',
      ingredients: ['Salmon', 'Broccoli', 'Bell Peppers', 'Olive Oil', 'Lemon', 'Garlic']
    },
    {
      id: 4,
      title: 'Vegan Chocolate Smoothie',
      image: 'https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg',
      cookTime: 5,
      servings: 1,
      calories: 280,
      category: 'snack',
      dietary: ['vegan', 'gluten-free'],
      difficulty: 'easy',
      ingredients: ['Banana', 'Cocoa Powder', 'Almond Milk', 'Dates', 'Vanilla']
    },
    {
      id: 5,
      title: 'Mediterranean Pasta Salad',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
      cookTime: 15,
      servings: 6,
      calories: 320,
      category: 'lunch',
      dietary: ['vegetarian'],
      difficulty: 'easy',
      ingredients: ['Pasta', 'Olives', 'Tomatoes', 'Feta Cheese', 'Cucumber', 'Red Onion']
    },
    {
      id: 6,
      title: 'Chicken Stir Fry',
      image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
      cookTime: 18,
      servings: 3,
      calories: 340,
      category: 'dinner',
      dietary: ['gluten-free'],
      difficulty: 'medium',
      ingredients: ['Chicken Breast', 'Mixed Vegetables', 'Soy Sauce', 'Ginger', 'Garlic', 'Rice']
    }
  ];

  useEffect(() => {
    setRecipes(mockRecipes);
  }, []);

  const handleAPISearch = async () => {
    if (!searchTerm.trim()) {
      showNotification('Please enter a search term', 'warning');
      return;
    }

    setLoading(true);
    try {
      const options = {};
      if (selectedDietary && selectedDietary !== '') {
        options.diet = [selectedDietary];
      }
      if (selectedCategory && selectedCategory !== 'all') {
        options.type = selectedCategory;
      }

      const apiRecipes = await searchRecipes(searchTerm, options);
      setRecipes(apiRecipes);
      setUseAPI(true);
      showNotification(`Found ${apiRecipes.length} recipes from Spoonacular API!`);
    } catch (error) {
      console.error('API search failed:', error);
      showNotification(`API Error: ${error.message}. Using local data.`, 'error');
      setRecipes(mockRecipes);
      setUseAPI(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLocalSearch = () => {
    setRecipes(mockRecipes);
    setUseAPI(false);
    showNotification('Switched to local recipe data');
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesDietary = selectedDietary === '' || recipe.dietary.includes(selectedDietary);
    
    return matchesSearch && matchesCategory && matchesDietary;
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const hideNotification = () => {
    setNotification({ show: false, message: '', type: 'success' });
  };

  const handleAddToMealPlan = (recipe) => {
    const currentMealPlan = JSON.parse(localStorage.getItem('mealPlan') || '{}');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['breakfast', 'lunch', 'dinner'];
    
    let added = false;
    for (const day of days) {
      if (!currentMealPlan[day]) currentMealPlan[day] = {};
      for (const meal of meals) {
        if (!currentMealPlan[day][meal]) {
          currentMealPlan[day][meal] = {
            title: recipe.title,
            id: recipe.id,
            image: recipe.image
          };
          localStorage.setItem('mealPlan', JSON.stringify(currentMealPlan));
          showNotification(`${recipe.title} added to ${day} ${meal}!`);
          added = true;
          break;
        }
      }
      if (added) break;
    }
    
    if (!added) {
      showNotification('Meal plan is full! Please remove some meals first.', 'warning');
    }
  };

  const handleRemoveFromMealPlan = (recipe) => {
    const currentMealPlan = JSON.parse(localStorage.getItem('mealPlan') || '{}');
    Object.keys(currentMealPlan).forEach(day => {
      Object.keys(currentMealPlan[day]).forEach(meal => {
        if (currentMealPlan[day][meal]?.id === recipe.id) {
          delete currentMealPlan[day][meal];
        }
      });
    });
    localStorage.setItem('mealPlan', JSON.stringify(currentMealPlan));
    showNotification(`${recipe.title} removed from meal plan!`, 'error');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Notification 
        message={notification.message}
        type={notification.type}
        show={notification.show}
        onClose={hideNotification}
      />
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Recipe Collection</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover delicious and healthy recipes tailored to your dietary preferences.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search recipes or ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAPISearch()}
                />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleAPISearch}
                  disabled={loading}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Search API'}
                </button>
                <button 
                  onClick={handleLocalSearch}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Local Recipes
                </button>
              </div>
            </div>

            <RecipeFilters
              selectedCategory={selectedCategory}
              selectedDietary={selectedDietary}
              onCategoryChange={setSelectedCategory}
              onDietaryChange={setSelectedDietary}
            />
          </div>

          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} 
              {useAPI && <span className="text-green-600 font-medium"> (from Spoonacular API)</span>}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : filteredRecipes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <LazyRecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onAddToMealPlan={handleAddToMealPlan}
                  onRemoveFromMealPlan={handleRemoveFromMealPlan}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}