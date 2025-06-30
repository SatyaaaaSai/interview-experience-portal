import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4 text-center">
          Welcome to Campus Interview Stories
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Discover and share real interview experiences from your campus. Help your juniors, learn from your seniors, and get ahead in your placement journey!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <button
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition text-base"
            onClick={() => navigate('/write')}
          >
            Write a Review
          </button>
          <button
            className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700 transition text-base"
            onClick={() => navigate('/view')}
          >
            View Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage; 