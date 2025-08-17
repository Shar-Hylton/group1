'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '../contexts/UserContext';
import { usePreferences } from '../contexts/PreferencesContext';
import { useMealPlan } from '../contexts/MealPlanContext';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const { user } = useUser();
  const { preferences } = usePreferences();
  const { getMealForDay } = useMealPlan();

  const weekdayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const todayName = weekdayNames[new Date().getDay()];

  const todayBreakfast = getMealForDay(todayName, 'breakfast') || 'Avocado Toast';
  const todayLunch = getMealForDay(todayName, 'lunch') || 'Quinoa Salad';
  const todayDinner = getMealForDay(todayName, 'dinner') || 'Grilled Salmon';

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="lg:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {user ? `Welcome back, ${user.name ?? 'there'}!` : 'Smart Meal Planning Made '}
                <span className="text-green-600">{user ? '' : ' Simple'}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                Create personalized meal plans, discover healthy recipes, and generate smart grocery lists.
                Save time, eat better, and reduce food waste with our intelligent meal planning assistant.
              </p>

              <p className="text-sm text-gray-700 mb-6">
                Default servings: <strong>{preferences?.servings ?? 4}</strong> — Units: <strong>{preferences?.units ?? 'metric'}</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="/dashboard"
                  className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors text-center"
                >
                  Start Planning
                </Link>
                <Link 
                  href="/get-started"
                  className="border-2 border-green-500 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors text-center"
                >
                  Get Started
                </Link>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Get Weekly Meal Ideas</h3>
                {subscribed ? (
                  <div className="text-green-600 font-medium">
                    ✓ Thanks for subscribing! Check your email for meal inspiration.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
            {/* Right Column - Visual */}
            <div className="lg:pl-8">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-6 transform rotate-3">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 font-semibold">
                    Today's Menu — {todayName}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <span className="text-gray-700">Breakfast: {todayBreakfast}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-gray-700">Lunch: {todayLunch}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-700">Dinner: {todayDinner}</span>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <div className="text-2xl font-bold text-green-600">1,850</div>
                    <div className="text-sm text-gray-600">Total Calories</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Everything You Need for Smart Meal Planning
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Weekly Planning</h3>
                <p className="text-gray-600">Plan your meals for the entire week with our intuitive calendar interface.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m2 0h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m0 0V3m0 2v2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Lists</h3>
                <p className="text-gray-600">Automatically generate grocery lists based on your planned meals.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nutrition Tracking</h3>
                <p className="text-gray-600">Monitor calories, macros, and nutritional goals with detailed insights.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}