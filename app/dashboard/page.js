'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MealPlanCard from '../components/MealPlanCard';
import { useMealPlan } from '../contexts/MealPlanContext'; // added

export default function Dashboard() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const defaultMealPlans = {
    Monday: { breakfast: '', lunch: '', dinner: '' },
    Tuesday: { breakfast: '', lunch: '', dinner: '' },
    Wednesday: { breakfast: '', lunch: '', dinner: '' },
    Thursday: { breakfast: '', lunch: '', dinner: '' },
    Friday: { breakfast: '', lunch: '', dinner: '' },
    Saturday: { breakfast: '', lunch: '', dinner: '' },
    Sunday: { breakfast: '', lunch: '', dinner: '' },
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // use context instead of local state
  const { plans, setPlans, setMealForDay } = useMealPlan();

  // On mount: migrate any existing legacy localStorage key ("mealPlan") into context (only if context empty)
  useEffect(() => {
    try {
      const savedLegacy = localStorage.getItem('mealPlan');
      if (savedLegacy && (!plans || plans.length === 0)) {
        const savedObj = JSON.parse(savedLegacy || '{}');
        // convert mapping -> array of plan objects
        const migrated = days.map((day, idx) => ({
          id: Date.now() + idx,
          day,
          meals: {
            breakfast: (savedObj[day]?.breakfast) || '',
            lunch: (savedObj[day]?.lunch) || '',
            dinner: (savedObj[day]?.dinner) || '',
          },
        }));
        setPlans(migrated);
      }
    } catch (error) {
      console.error('Failed to migrate legacy mealPlan:', error);
    }
    // run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateMeal = (day, mealType, value) => {
    // delegate to context helper which will persist
    setMealForDay(day, mealType, value);
  };

  // derive simple stats from context plans
  const daysPlanned = (plans || []).filter(p => Object.values(p.meals || {}).some(Boolean)).length;
  const totalMeals = (plans || []).reduce((acc, p) => acc + Object.values(p.meals || {}).filter(Boolean).length, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Weekly Meal Planner</h1>
          
          {/* Day Selector */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 max-w-none">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Day</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3">
              {days.map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-3 rounded-lg font-medium transition-colors text-sm min-w-0 ${
                    selectedDay === day
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                  }`}
                >
                  <span className="block">{day}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Meal Plan for Selected Day */}
          <div className="grid md:grid-cols-3 gap-6">
            <MealPlanCard
              title="Breakfast"
              mealType="breakfast"
              selectedDay={selectedDay}
              onUpdate={updateMeal} // keep explicit update handler to be safe
            />
            <MealPlanCard
              title="Lunch"
              mealType="lunch"
              selectedDay={selectedDay}
              onUpdate={updateMeal}
            />
            <MealPlanCard
              title="Dinner"
              mealType="dinner"
              selectedDay={selectedDay}
              onUpdate={updateMeal}
            />
          </div>

          {/* Quick Stats */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Week Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{daysPlanned}</div>
                <div className="text-sm text-gray-600">Days Planned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{totalMeals}</div>
                <div className="text-sm text-gray-600">Total Meals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2100</div>
                <div className="text-sm text-gray-600">Est. Calories/Day</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">$45</div>
                <div className="text-sm text-gray-600">Weekly Budget</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}