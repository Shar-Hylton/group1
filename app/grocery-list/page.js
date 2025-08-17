'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GrocerySection from '../components/GrocerySection';
import Notification from '../components/Notification';

export default function GroceryList() {
  const [groceryItems, setGroceryItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', category: 'produce' });
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', icon: '🥕', color: 'green' });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const defaultCategories = [
    { key: 'produce', label: 'Produce', icon: '🥕', color: 'green' },
    { key: 'protein', label: 'Protein', icon: '🥩', color: 'red' },
    { key: 'grains', label: 'Grains & Bread', icon: '🍞', color: 'orange' },
    { key: 'dairy', label: 'Dairy', icon: '🥛', color: 'blue' }
  ];

  const availableIcons = [
    '🥕', '🥩', '🍞', '🥛', '🍎', '🥬', '🧄', '🧅', '🥔', '🍅',
    '🥒', '🌶️', '🥑', '🍌', '🍊', '🍇', '🍓', '🥝', '🥭', '🍍',
    '🥥', '🌽', '🥦', '🍆', '🥕', '🫐', '🍑', '🍒', '🥨', '🧀',
    '🥚', '🍗', '🥓', '🐟', '🦐', '🍖', '🌮', '🍕', '🍝', '🍜'
  ];

  const colorOptions = [
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'pink', label: 'Pink', class: 'bg-pink-500' }
  ];

  useEffect(() => {
    // Load data from localStorage
    const savedItems = JSON.parse(localStorage.getItem('groceryItems') || '[]');
    const savedCategories = JSON.parse(localStorage.getItem('groceryCategories') || '[]');
    
    setGroceryItems(savedItems);
    setCategories([...defaultCategories, ...savedCategories]);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const hideNotification = () => {
    setNotification({ show: false, message: '', type: 'success' });
  };

  const addItem = () => {
    if (newItem.name && newItem.quantity) {
      const item = {
        id: Date.now(),
        ...newItem,
        checked: false
      };
      const updatedItems = [...groceryItems, item];
      setGroceryItems(updatedItems);
      localStorage.setItem('groceryItems', JSON.stringify(updatedItems));
      setNewItem({ name: '', quantity: '', category: 'produce' });
      setShowAddItem(false);
      showNotification(`${item.name} added to grocery list!`);
    }
  };

  const toggleItem = (itemId) => {
    const updatedItems = groceryItems.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setGroceryItems(updatedItems);
    localStorage.setItem('groceryItems', JSON.stringify(updatedItems));
    
    const item = updatedItems.find(i => i.id === itemId);
    showNotification(`${item.name} ${item.checked ? 'completed' : 'unchecked'}!`);
  };

  const removeItem = (itemId) => {
    const item = groceryItems.find(i => i.id === itemId);
    const updatedItems = groceryItems.filter(item => item.id !== itemId);
    setGroceryItems(updatedItems);
    localStorage.setItem('groceryItems', JSON.stringify(updatedItems));
    showNotification(`${item.name} removed from list!`, 'error');
  };

  const addCategory = () => {
    if (newCategory.name) {
      const category = {
        key: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
        label: newCategory.name,
        icon: newCategory.icon,
        color: newCategory.color
      };
      
      const savedCategories = JSON.parse(localStorage.getItem('groceryCategories') || '[]');
      const updatedCategories = [...savedCategories, category];
      localStorage.setItem('groceryCategories', JSON.stringify(updatedCategories));
      
      setCategories([...defaultCategories, ...updatedCategories]);
      setNewCategory({ name: '', icon: '🥕', color: 'green' });
      setShowAddCategory(false);
      showNotification(`${category.label} category added!`);
    }
  };

  const removeCategory = (categoryKey) => {
    if (defaultCategories.some(cat => cat.key === categoryKey)) {
      showNotification('Cannot delete default categories!', 'error');
      return;
    }

    const savedCategories = JSON.parse(localStorage.getItem('groceryCategories') || '[]');
    const updatedCategories = savedCategories.filter(cat => cat.key !== categoryKey);
    localStorage.setItem('groceryCategories', JSON.stringify(updatedCategories));
    
    setCategories([...defaultCategories, ...updatedCategories]);
    
    // Remove items in this category
    const updatedItems = groceryItems.filter(item => item.category !== categoryKey);
    setGroceryItems(updatedItems);
    localStorage.setItem('groceryItems', JSON.stringify(updatedItems));
    
    const category = categories.find(cat => cat.key === categoryKey);
    showNotification(`${category.label} category deleted!`, 'error');
  };

  const getItemsByCategory = (categoryKey) => {
    return groceryItems.filter(item => item.category === categoryKey);
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Smart Grocery List</h1>
              <p className="text-gray-600 mt-2">Organize your shopping by categories</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddCategory(true)}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Add Category
              </button>
              <button
                onClick={() => setShowAddItem(true)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Add Item
              </button>
            </div>
          </div>

          {/* Add Item Modal */}
          {showAddItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Add Grocery Item</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Item name"
                    value={newItem.name}
                    onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Quantity (e.g., 2 lbs, 1 dozen)"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.key} value={category.key}>
                        {category.icon} {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={addItem}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Add Item
                  </button>
                  <button
                    onClick={() => setShowAddItem(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Category Modal */}
          {showAddCategory && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Add Category</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Category name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Choose Icon</label>
                    <div className="grid grid-cols-8 gap-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-2">
                      {availableIcons.map(icon => (
                        <button
                          key={icon}
                          onClick={() => setNewCategory(prev => ({ ...prev, icon }))}
                          className={`p-2 text-xl rounded hover:bg-gray-100 ${
                            newCategory.icon === icon ? 'bg-purple-100 ring-2 ring-purple-500' : ''
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Choose Color</label>
                    <div className="flex gap-2">
                      {colorOptions.map(color => (
                        <button
                          key={color.value}
                          onClick={() => setNewCategory(prev => ({ ...prev, color: color.value }))}
                          className={`w-8 h-8 rounded-full ${color.class} ${
                            newCategory.color === color.value ? 'ring-2 ring-gray-400' : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={addCategory}
                    className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Add Category
                  </button>
                  <button
                    onClick={() => setShowAddCategory(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Grocery Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <GrocerySection
                key={category.key}
                category={category}
                items={getItemsByCategory(category.key)}
                onToggleItem={toggleItem}
                onRemoveItem={removeItem}
                onRemoveCategory={removeCategory}
              />
            ))}
          </div>

          {/* Shopping Summary */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Shopping Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{groceryItems.length}</div>
                <div className="text-sm text-gray-600">Total Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {groceryItems.filter(item => item.checked).length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {groceryItems.length > 0 ? Math.round((groceryItems.filter(item => item.checked).length / groceryItems.length) * 100) : 0}%
                </div>
                <div className="text-sm text-gray-600">Progress</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}