# SmartMeal Planner - Phase 2
# SmartMeal Planner - Phase 3 (Final)

A comprehensive meal planning and grocery management web application built with Next.js and Tailwind CSS.

## Project Overview

SmartMeal Planner helps users create personalized meal plans based on their dietary preferences, health goals, and budget. The application provides an intuitive interface for meal planning, recipe discovery, and grocery list management.

## Features Implemented in Phase 3 (Final)

### API Integration
- **Edamam Recipe API**: Real-time recipe search with 2M+ recipes
- **Advanced Filtering**: Diet, health, cuisine, and meal type filters
- **Fallback System**: Graceful fallback to local data if API fails
- **Rate Limiting**: Proper API usage with error handling

### Performance Optimizations
- **Lazy Loading**: Recipe cards are lazy-loaded to improve initial page load times
- **Code Splitting**: Components are split for better performance
- **Image Optimization**: Optimized image loading and caching
- **Console Removal**: Production builds remove console logs
- **CSS Optimization**: Experimental CSS optimization enabled

### 1. Routing and Navigation
- **Multi-page routing** using Next.js App Router
- **Smooth navigation** between all pages with proper link setups
- **Dynamic routing preparation** for future user profiles and recipe details
- **Functional navigation bar** with responsive mobile menu
- **Active page indicators** with visual highlighting
- **Improved tablet responsiveness** with better breakpoints

### 2. Component Layout and Structuring
- **Modular component architecture** following React composition patterns
- **Reusable UI components**: Navbar, Footer, Hero, Cards, Forms
- **Compound components** for complex UI sections (RecipeCard, GrocerySection)
- **Clear separation of concerns** between layout and business logic components
- **Lazy loading components** for better performance
- **Reusable notification system** across all pages

### 3. Styling and Theming
- **Responsive design** optimized for desktop, tablet, and mobile
- **Consistent design system** with unified color palette and typography
- **Conditional styling** based on component state and props
- **Interactive hover effects** and smooth transitions
- **Modern UI patterns** with cards, badges, and progress indicators
- **Consistent visual feedback** with notifications and loading states
- **Accessibility improvements** with proper focus states

### 4. State Management
- **React hooks** (useState, useEffect) for local component state
- **Props drilling** for data flow between parent and child components
- **State lifting** to share data across sibling components
- **Dynamic content updates** based on user interactions
- **Form state management** with controlled inputs
- **Data persistence** using localStorage across all pages
- **Multi-user state management** with user switching capabilities

### 5. Project Organization
- **Clean file structure** with organized component folders
- **Consistent naming conventions** following React best practices
- **Modular code organization** for easy maintenance and scalability
- **API integration** with Edamam Recipe Database
- **Performance optimizations** with lazy loading and code splitting
- **Production-ready configuration** with optimized builds

## Pages and Components

### Pages
1. **Home (/)** - Landing page with hero section and feature overview
2. **Get Started (/get-started)** - Multi-step onboarding form with progress tracking
3. **Dashboard (/dashboard)** - Weekly meal planning interface with interactive calendar
4. **Recipes (/recipes)** - Recipe discovery with search and filtering capabilities
5. **Grocery List (/grocery-list)** - Smart shopping list with category organization
6. **Profile (/profile)** - User profile management with dietary preferences

All pages feature:
- **Form validation** with real-time error feedback
- **Data persistence** across page navigation
- **Responsive design** for all device sizes
- **Interactive notifications** for user actions

### Key Components
- **Navbar** - Responsive navigation with mobile menu
- **Footer** - Site-wide footer with links and branding
- **Hero** - Landing page hero section with call-to-action
- **MealPlanCard** - Interactive meal planning component
- **RecipeCard** - Recipe display with expandable details
- **RecipeFilters** - Search and filter interface for recipes
- **GrocerySection** - Categorized grocery list management
- **DietaryPreferences** - Multi-select dietary preference manager
- **Notification** - Reusable toast notification system
- **LazyRecipeCard** - Performance-optimized recipe card with lazy loading

## State Management Structure

### Local State (useState)
- Form inputs and validation
- UI state (modals, dropdowns, toggles)
- Component-specific data (selected items, filters)
- Multi-user profile management
- Category creation and deletion

### Lifted State
- Meal planning data shared between calendar and meal cards
- User profile information used across multiple components
- Grocery list items managed at page level
- Cross-page data synchronization

### Data Persistence
- **localStorage integration** for all user data
- **Form data validation** and error handling
- **Cross-page state sharing** for seamless user experience
- **Multi-user support** with individual progress tracking

### Props Flow
- Parent components pass data and handlers to children
- Event handlers bubble up from child to parent components
- Consistent prop interfaces across similar components
- Notification system integration across all components

## Responsive Design

- **Mobile-first approach** with progressive enhancement
- **Flexible grid layouts** that adapt to screen size
- **Touch-friendly interfaces** for mobile users
- **Optimized typography** and spacing for all devices
- **Improved tablet support** with better breakpoint management
- **Active navigation states** for better user orientation

## Technical Implementation

### Technologies Used
- **Next.js 13** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - Modern React state management
- **JavaScript (ES6+)** - No TypeScript for Phase 2 simplicity
- **Edamam API** - Real-time recipe data with 2M+ recipes
- **Lazy Loading** - Performance optimization for components
- **localStorage** - Client-side data persistence

### Code Quality
- **Consistent formatting** and indentation
- **Meaningful variable names** and function names
- **Modular component structure** for reusability
- **Clean separation** between UI and logic
- **Performance optimizations** throughout the application
- **Error handling** and user feedback systems

### Performance Features
- **Code splitting** with dynamic imports
- **Lazy loading** for heavy components
- **Optimized builds** with console removal in production
- **Image optimization** and caching
- **CSS optimization** for smaller bundle sizes

## Future Enhancements (Post-Phase 3)
- User authentication and data persistence
- Advanced meal planning algorithms
- Nutritional analysis and tracking
- Social features and recipe sharing
- PWA capabilities for offline usage
- Push notifications for meal reminders
- Backend database integration
- User accounts and cloud sync

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Performance Optimizations

The application includes several performance optimizations:
- Lazy loading of recipe components
- Code splitting for better load times
- Optimized CSS and JavaScript bundles
- Efficient state management with minimal re-renders
- Image optimization and caching strategies

## Project Structure

```
app/
├── components/          # Reusable UI components
├── dashboard/          # Meal planning page
├── get-started/        # Onboarding flow
├── grocery-list/       # Shopping list management
├── profile/           # User profile page
├── recipes/           # Recipe discovery
├── contexts/          # Future state management
├── lib/              # Utility functions
├── hooks/            # Custom React hooks
└── types/            # Type definitions
```

## Key Features Completed

✅ **Edamam API Integration** - Real-time recipe search with 2M+ recipes
✅ **Advanced Recipe Filtering** - Diet, health, cuisine, and meal type filters
✅ **API Fallback System** - Graceful handling of API failures
✅ **Multi-user Profile System** - Add, edit, delete users with individual tracking
✅ **BMI Calculation** - Real-time BMI calculation with health status indicators  
✅ **Recipe Management** - Add/remove recipes from meal plans with notifications
✅ **Smart Grocery Lists** - Categorized shopping with custom category creation
✅ **Form Validation** - Comprehensive validation with real-time feedback
✅ **Data Persistence** - All data saved across page navigation
✅ **Responsive Design** - Optimized for all device sizes
✅ **Performance Optimization** - Lazy loading and code splitting implemented
✅ **Notification System** - User feedback for all actions
✅ **Category Management** - Add/delete custom grocery categories with icon selection

This Phase 3 implementation demonstrates production-ready React patterns, API integration, performance optimization techniques, comprehensive state management, and professional user experience design suitable for real-world deployment.

## API Integration Details

### Edamam Recipe Database API
- **Application ID**: f6ed2103
- **Endpoint**: https://api.edamam.com/api/recipes/v2
- **Features**: 2M+ recipes, nutrition data, dietary filters
- **Rate Limits**: 10 requests/minute (developer plan)
- **Fallback**: Local mock data when API unavailable

### API Usage Examples
```javascript
// Search recipes with filters
const recipes = await searchRecipes('chicken', {
  health: 'gluten-free',
  mealType: 'dinner',
  from: 0,
  to: 20
});

// Get detailed recipe information
const recipe = await getRecipeById('recipe_id');
```