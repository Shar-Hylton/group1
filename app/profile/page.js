'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DietaryPreferences from '../components/DietaryPreferences';
import Notification from '../components/Notification';

export default function Profile() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    age: '',
    weight: '',
    height: '',
    goal: 'maintain',
    dietary: []
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    // Load users from localStorage
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (savedUsers.length === 0) {
      // Add default user if none exist
      const defaultUser = {
        id: 1,
        name: 'Gabriel Albu',
        email: 'Gabrielalbu@gmail.com',
        age: 25,
        weight: 70,
        height: 175,
        goal: 'maintain',
        dietary: []
      };
      savedUsers.push(defaultUser);
      localStorage.setItem('users', JSON.stringify(savedUsers));
    }
    setUsers(savedUsers);
    setSelectedUserId(savedUsers[0]?.id || null);
  }, []);

  const selectedUser = users.find(user => user.id === selectedUserId);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const hideNotification = () => {
    setNotification({ show: false, message: '', type: 'success' });
  };

  const handleInputChange = (field, value) => {
    setUsers(prev => prev.map(user => 
      user.id === selectedUserId 
        ? { ...user, [field]: value }
        : user
    ));
  };

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem('users', JSON.stringify(users));
    showNotification('Profile updated successfully!');
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user = {
        ...newUser,
        id: Date.now(),
        age: parseInt(newUser.age) || 0,
        weight: parseInt(newUser.weight) || 0,
        height: parseInt(newUser.height) || 0
      };
      const updatedUsers = [...users, user];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setSelectedUserId(user.id);
      setNewUser({
        name: '',
        email: '',
        age: '',
        weight: '',
        height: '',
        goal: 'maintain',
        dietary: []
      });
      setShowAddUser(false);
      showNotification(`${user.name} added successfully!`);
    }
  };

  const handleDeleteUser = (userId) => {
    if (users.length <= 1) {
      showNotification('Cannot delete the last user!', 'error');
      return;
    }
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setSelectedUserId(updatedUsers[0]?.id || null);
    showNotification('User deleted successfully!', 'error');
  };

  const calculateBMI = (weight, height) => {
    if (!weight || !height) return 0;
    return (weight / ((height / 100) ** 2)).toFixed(1);
  };

  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) return { status: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { status: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { status: 'Overweight', color: 'text-orange-600' };
    return { status: 'Obese', color: 'text-red-600' };
  };

  if (!selectedUser) return null;

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
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">User Profiles</h1>
            <button
              onClick={() => setShowAddUser(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add User
            </button>
          </div>

          {/* User Selector */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Select User</h2>
            <div className="flex flex-wrap gap-2">
              {users.map(user => (
                <div key={user.id} className="flex items-center">
                  <button
                    onClick={() => setSelectedUserId(user.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedUserId === user.id
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                    }`}
                  >
                    {user.name}
                  </button>
                  {users.length > 1 && (
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add User Form */}
          {showAddUser && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New User</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={newUser.age}
                  onChange={(e) => setNewUser(prev => ({ ...prev, age: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={newUser.weight}
                  onChange={(e) => setNewUser(prev => ({ ...prev, weight: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Height (cm)"
                  value={newUser.height}
                  onChange={(e) => setNewUser(prev => ({ ...prev, height: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Add User
                </button>
                <button
                  onClick={() => setShowAddUser(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">{selectedUser.name}'s Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={selectedUser.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{selectedUser.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={selectedUser.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{selectedUser.email}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={selectedUser.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{selectedUser.age} years</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={selectedUser.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{selectedUser.weight} kg</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Health Goal</label>
                  {isEditing ? (
                    <select
                      value={selectedUser.goal}
                      onChange={(e) => handleInputChange('goal', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="lose">Lose Weight</option>
                      <option value="maintain">Maintain Weight</option>
                      <option value="gain">Gain Weight</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 capitalize">
                      {selectedUser.goal === 'lose' ? 'Lose Weight' : 
                       selectedUser.goal === 'maintain' ? 'Maintain Weight' : 'Gain Weight'}
                    </p>
                  )}
                </div>

                {isEditing && (
                  <button
                    onClick={handleSave}
                    className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>

            {/* Dietary Preferences */}
            <DietaryPreferences 
              preferences={selectedUser.dietary} 
              onUpdate={(prefs) => handleInputChange('dietary', prefs)} 
            />
          </div>

          {/* Stats Dashboard */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{selectedUser.name}'s Health Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getBMIStatus(calculateBMI(selectedUser.weight, selectedUser.height)).color}`}>
                  {calculateBMI(selectedUser.weight, selectedUser.height)}
                </div>
                <div className="text-sm text-gray-600">BMI</div>
                <div className={`text-xs ${getBMIStatus(calculateBMI(selectedUser.weight, selectedUser.height)).color}`}>
                  {getBMIStatus(calculateBMI(selectedUser.weight, selectedUser.height)).status}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2100</div>
                <div className="text-sm text-gray-600">Daily Calories</div>
                <div className="text-xs text-gray-500">Recommended</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">15</div>
                <div className="text-sm text-gray-600">Meals Planned</div>
                <div className="text-xs text-gray-500">This Week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">85%</div>
                <div className="text-sm text-gray-600">Goal Progress</div>
                <div className="text-xs text-green-600">On Track</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}