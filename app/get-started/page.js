'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Notification from '../components/Notification';

export default function GetStarted() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    weight: '',
    height: '',
    goal: 'maintain',
    dietary: [],
    experience: 'beginner'
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const hideNotification = () => {
    setNotification({ show: false, message: '', type: 'success' });
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.age || formData.age < 1 || formData.age > 120) newErrors.age = 'Valid age is required';
      if (!formData.weight || formData.weight < 1) newErrors.weight = 'Valid weight is required';
      if (!formData.height || formData.height < 1) newErrors.height = 'Valid height is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDietaryToggle = (preference) => {
    setFormData(prev => ({
      ...prev,
      dietary: prev.dietary.includes(preference)
        ? prev.dietary.filter(p => p !== preference)
        : [...prev.dietary, preference]
    }));
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (!validateStep(currentStep)) {
      showNotification('Please fill in all required fields correctly', 'error');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (validateStep(currentStep)) {
      // Save user data to users array
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser = {
        ...formData,
        id: Date.now(),
        age: parseInt(formData.age),
        weight: parseInt(formData.weight),
        height: parseInt(formData.height)
      };
      
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      localStorage.setItem('userProfile', JSON.stringify(formData));
      
      showNotification('Profile created successfully! Redirecting...', 'success');
      setTimeout(() => {
        router.push('/profile');
      }, 2000);
    } else {
      showNotification('Please complete all required fields', 'error');
    }
  };

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian', color: 'green' },
    { id: 'vegan', label: 'Vegan', color: 'emerald' },
    { id: 'gluten-free', label: 'Gluten-Free', color: 'orange' },
    { id: 'dairy-free', label: 'Dairy-Free', color: 'blue' },
    { id: 'keto', label: 'Keto', color: 'purple' },
    { id: 'paleo', label: 'Paleo', color: 'red' }
  ];

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
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Step {currentStep} of 3</span>
              <span className="text-sm font-medium text-gray-600">{Math.round((currentStep / 3) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us about yourself</h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.age ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="25"
                      />
                      {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                      <input
                        type="number"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.weight ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="70"
                      />
                      {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                      <input
                        type="number"
                        value={formData.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.height ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="175"
                      />
                      {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Health Goals */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What's your health goal?</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Primary Goal</label>
                    <div className="grid gap-3">
                      {[
                        { value: 'lose', label: 'Lose Weight', desc: 'Create a calorie deficit to lose weight' },
                        { value: 'maintain', label: 'Maintain Weight', desc: 'Keep your current weight stable' },
                        { value: 'gain', label: 'Gain Weight', desc: 'Build muscle and increase weight' }
                      ].map(goal => (
                        <button
                          key={goal.value}
                          onClick={() => handleInputChange('goal', goal.value)}
                          className={`p-4 border-2 rounded-lg text-left transition-colors ${
                            formData.goal === goal.value
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-green-300'
                          }`}
                        >
                          <div className="font-medium text-gray-900">{goal.label}</div>
                          <div className="text-sm text-gray-600">{goal.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Cooking Experience</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="beginner">Beginner - Simple recipes</option>
                      <option value="intermediate">Intermediate - Moderate complexity</option>
                      <option value="advanced">Advanced - Complex recipes</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Dietary Preferences */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Any dietary preferences?</h2>
                <div className="space-y-6">
                  <p className="text-gray-600">Select all that apply to you:</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {dietaryOptions.map(option => (
                      <button
                        key={option.id}
                        onClick={() => handleDietaryToggle(option.id)}
                        className={`px-4 py-3 rounded-lg text-left font-medium transition-colors ${
                          formData.dietary.includes(option.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                        }`}
                      >
                        {formData.dietary.includes(option.id) && '✓ '}
                        {option.label}
                      </button>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Summary</h4>
                    <p className="text-blue-800 text-sm">
                      We'll create personalized meal plans based on your {formData.goal} goal
                      {formData.dietary.length > 0 && ` and ${formData.dietary.length} dietary preference${formData.dietary.length > 1 ? 's' : ''}`}.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  Complete Setup
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
