import { lazy, Suspense } from 'react';

const RecipeCard = lazy(() => import('./RecipeCard'));

export default function LazyRecipeCard(props) {
  return (
    <Suspense fallback={
      <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded mb-3 w-3/4"></div>
          <div className="flex gap-2">
            <div className="h-8 bg-gray-200 rounded flex-1"></div>
            <div className="h-8 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>
    }>
      <RecipeCard {...props} />
    </Suspense>
  );
}