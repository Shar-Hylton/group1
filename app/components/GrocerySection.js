'use client';

export default function GrocerySection({ category, items, onToggleItem, onRemoveItem, onRemoveCategory }) {
  const getColorClasses = (color) => {
    const colorMap = {
      green: 'border-green-200 bg-green-50',
      red: 'border-red-200 bg-red-50',
      orange: 'border-orange-200 bg-orange-50',
      blue: 'border-blue-200 bg-blue-50',
      purple: 'border-purple-200 bg-purple-50',
      pink: 'border-pink-200 bg-pink-50'
    };
    return colorMap[color] || 'border-gray-200 bg-gray-50';
  };

  const completedItems = items.filter(item => item.checked).length;
  const totalItems = items.length;
  const defaultCategories = ['produce', 'protein', 'grains', 'dairy'];
  const canDelete = !defaultCategories.includes(category.key);

  return (
    <div className={`bg-white rounded-lg shadow-sm border-2 ${getColorClasses(category.color)} p-6`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{category.icon}</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{category.label}</h3>
              {canDelete && (
                <button
                  onClick={() => onRemoveCategory(category.key)}
                  className="text-red-500 hover:text-red-700 text-sm"
                  title="Delete category"
                >
                  ×
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600">{completedItems} of {totalItems} items</p>
          </div>
        </div>
        
        {totalItems > 0 && (
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              {Math.round((completedItems / totalItems) * 100)}%
            </div>
            <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedItems / totalItems) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center flex-1">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => onToggleItem(item.id)}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <div className="ml-3 flex-1">
                  <div className={`font-medium ${item.checked ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-600">{item.quantity}</div>
                </div>
              </div>
              
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p className="text-sm">No items in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}