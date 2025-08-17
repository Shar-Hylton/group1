// Spoonacular Recipe Search API integration (via RapidAPI)
const SPOONACULAR_API_KEY = '0487b8560dmsh6ce8fcdb701e6e7p1646d1jsna56ac0195db4';
const SPOONACULAR_BASE_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

export async function searchRecipes(query, options = {}) {
  try {
    // Spoonacular doesn't have strict length requirements but we'll keep a minimum
    if (query && query.length < 2) {
      throw new Error('Search term must be at least 2 characters');
    }

    const {
      diet = [],
      type = '',
      number = 12
    } = options;

    const headers = {
      'x-rapidapi-key': SPOONACULAR_API_KEY,
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    let url, params;
    
    if (query) {
      // Search endpoint
      url = `${SPOONACULAR_BASE_URL}/recipes/complexSearch`;
      params = new URLSearchParams();
      params.append('query', encodeURIComponent(query));
      params.append('number', Math.min(100, parseInt(number)).toString());
      
      if (diet.length) params.append('diet', diet.join(','));
      if (type) params.append('type', type);
      
      params.append('addRecipeInformation', 'true');
      params.append('instructionsRequired', 'true');
      params.append('fillIngredients', 'true');
    } else {
      // Random recipes endpoint
      url = `${SPOONACULAR_BASE_URL}/recipes/random`;
      params = new URLSearchParams();
      params.append('number', Math.min(100, parseInt(number)).toString());
      
      if (diet.length) params.append('tags', diet.join(','));
      if (type) params.append('tags', type);
    }

    const fullUrl = `${url}?${params}`;
    console.debug('Spoonacular API Request:', { url: fullUrl, headers });

    const response = await fetch(fullUrl, { headers });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('Spoonacular API Error:', {
        status: response.status,
        error: error.message || 'Unknown error',
        details: error
      });
      throw new Error(error.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    let recipes = [];
    if (query) {
      if (!data?.results || !Array.isArray(data.results)) {
        throw new Error('Invalid response format from Spoonacular API');
      }
      recipes = data.results;
    } else {
      if (!data?.recipes || !Array.isArray(data.recipes)) {
        throw new Error('Invalid response format from Spoonacular API');
      }
      recipes = data.recipes;
    }

    return recipes.map(recipe => ({
      id: recipe.id || crypto.randomUUID(),
      title: recipe.title || 'Untitled Recipe',
      image: recipe.image || '/placeholder-recipe.jpg',
      cookTime: recipe.readyInMinutes || 30,
      servings: recipe.servings || 1,
      calories: recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 0,
      category: recipe.dishTypes?.[0]?.toLowerCase() || 'main course',
      dietary: [
        ...(recipe.diets || []),
        ...(recipe.intolerances || [])
      ].map(label => label.toLowerCase().replace(/\s+/g, '-')).slice(0, 3),
      ingredients: recipe.extendedIngredients?.map(ing => ing.original) || [],
      instructions: recipe.instructions || '',
      source: recipe.sourceName || 'Unknown',
      url: recipe.sourceUrl || `https://spoonacular.com/recipes/${recipe.title?.toLowerCase().replace(/\s+/g, '-')}-${recipe.id}`
    }));

  } catch (error) {
    console.error('Spoonacular API Failure:', error);
    throw error;
  }
}