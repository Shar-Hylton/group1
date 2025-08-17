'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useUser } from '../contexts/UserContext'; // added

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser(); // added

  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const getLinkClasses = (path) => {
    const baseClasses = "transition-colors font-medium";
    return isActive(path) 
      ? `${baseClasses} text-green-600 border-b-2 border-green-600 pb-1`
      : `${baseClasses} text-gray-700 hover:text-green-600`;
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-gray-900">SmartMeal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link href="/" className={getLinkClasses('/')}>
              Home
            </Link>
            <Link href="/dashboard" className={getLinkClasses('/dashboard')}>
              Meal Planner
            </Link>
            <Link href="/recipes" className={getLinkClasses('/recipes')}>
              Recipes
            </Link>
            <Link href="/grocery-list" className={getLinkClasses('/grocery-list')}>
              Grocery List
            </Link>
            <Link href="/profile" className={getLinkClasses('/profile')}>
              Profile
            </Link>

            {/* user greeting */}
            <div className="text-sm text-gray-700">
              {user ? `Hello, ${user.name ?? 'User'}` : 'Guest'}
            </div>

            <Link href="/get-started" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex items-center justify-center w-8 h-8"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t bg-white">
            <div className="flex flex-col space-y-4">
              <Link href="/" className={`${getLinkClasses('/')} block py-2`} onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/dashboard" className={`${getLinkClasses('/dashboard')} block py-2`} onClick={() => setIsOpen(false)}>
                Meal Planner
              </Link>
              <Link href="/recipes" className={`${getLinkClasses('/recipes')} block py-2`} onClick={() => setIsOpen(false)}>
                Recipes
              </Link>
              <Link href="/grocery-list" className={`${getLinkClasses('/grocery-list')} block py-2`} onClick={() => setIsOpen(false)}>
                Grocery List
              </Link>
              <Link href="/profile" className={`${getLinkClasses('/profile')} block py-2`} onClick={() => setIsOpen(false)}>
                Profile
              </Link>

              {/* mobile greeting */}
              <div className="text-sm text-gray-700 pt-2">
                {user ? `Hello, ${user.name ?? 'User'}` : 'Guest'}
              </div>

              <Link href="/get-started" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors w-fit" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}