import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition">
            Campus Interview Stories
          </Link>
          <nav className="flex items-center space-x-4">
            <Link 
              to="/" 
              className={`text-sm font-medium transition ${
                location.pathname === '/' 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/view" 
              className={`text-sm font-medium transition ${
                location.pathname === '/view' 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              View Reviews
            </Link>
            <Link 
              to="/write" 
              className={`text-sm font-medium transition ${
                location.pathname === '/write' 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Write Review
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 