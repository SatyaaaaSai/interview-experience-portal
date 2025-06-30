import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const UserExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const data = await apiService.getExperienceById(id);
        setExperience(data);
        setError('');
      } catch (err) {
        console.error('Error fetching experience:', err);
        setError('Failed to load experience');
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading experience...</p>
        </div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Experience Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The requested experience could not be found.'}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 py-12">
      <div className="bg-white rounded-xl p-6 shadow-md max-w-2xl w-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-600">
            {experience.anonymous || experience.name === 'Anonymous' ? <span>👤</span> : experience.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="font-semibold text-gray-800 text-lg">
              {experience.anonymous || experience.name === 'Anonymous' ? 'Anonymous' : experience.name}
            </span>
            <div className="text-sm text-gray-400">
              {new Date(experience.createdAt).toLocaleDateString()} at {new Date(experience.createdAt).toLocaleTimeString()}
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-purple-700 mb-2">{experience.company} - {experience.role}</h2>
        <p className="text-lg text-gray-500 mb-4">{experience.year}</p>
        
        {/* Interview Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{experience.technicalRounds}</div>
            <div className="text-sm text-gray-600">Technical Rounds</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{experience.hrRounds}</div>
            <div className="text-sm text-gray-600">HR Rounds</div>
          </div>
          <div className="text-center">
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
              experience.status === 'Accepted' ? 'bg-green-100 text-green-800' :
              experience.status === 'Rejected' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {experience.status}
            </div>
            <div className="text-sm text-gray-600 mt-1">Status</div>
          </div>
        </div>
        
        {/* Technical Questions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">T</span>
            Technical Questions & Experience
          </h3>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {experience.technicalQuestions}
            </p>
          </div>
        </div>
        
        {/* HR Questions */}
        {experience.hrQuestions && experience.hrQuestions.trim() && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">H</span>
              HR Questions & Experience
            </h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {experience.hrQuestions}
              </p>
            </div>
          </div>
        )}
        
        {/* Additional Info */}
        <div className="border-t pt-4 mt-6">
          <div className="text-sm text-gray-500">
            <p><strong>Company:</strong> {experience.company}</p>
            <p><strong>Role:</strong> {experience.role}</p>
            <p><strong>Year:</strong> {experience.year}</p>
            <p><strong>Posted:</strong> {new Date(experience.createdAt).toLocaleString()}</p>
            {experience.updatedAt !== experience.createdAt && (
              <p><strong>Last Updated:</strong> {new Date(experience.updatedAt).toLocaleString()}</p>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
          <button 
            onClick={() => navigate('/write')} 
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Share Your Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserExperience; 