import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const defaultCompanies = ['All', 'TCS', 'Tech Mahindra'];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [availableYears, setAvailableYears] = useState(['All']);
  const [companies, setCompanies] = useState(defaultCompanies);
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());

  // Fetch experiences from backend
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAllExperiences();
        setExperiences(data);
        
        // Get unique years for filter
        const years = ['All', ...Array.from(new Set(data.map(exp => exp.year)))];
        setAvailableYears(years);
      } catch (err) {
        console.error('Error fetching experiences:', err);
        setError('Failed to load experiences. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const backendCompanies = await apiService.getAllCompanies();
        // Map backend companies to string names
        const backendCompanyNames = backendCompanies.map(c => typeof c === 'string' ? c : (c && c.company ? c.company : String(c)));
        // Merge with defaults and deduplicate
        const uniqueCompanies = Array.from(new Set([...defaultCompanies, ...backendCompanyNames]));
        setCompanies(uniqueCompanies);
      } catch {
        setCompanies(defaultCompanies);
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Filter experiences by company, year, and search term
  const filteredExperiences = experiences.filter((exp) => {
    const matchesCompany = selectedCompany === 'All' || exp.company === selectedCompany;
    const matchesYear = selectedYear === 'All' || exp.year.toString() === selectedYear.toString();
    const matchesSearch =
      exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.year.toString().includes(searchTerm) ||
      exp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.technicalQuestions.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCompany && matchesYear && matchesSearch;
  });

  // Truncate text helper
  const truncate = (text, maxLength = 120) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Format time ago
  const getTimeAgo = (dateString, now) => {
    // Ensure UTC parsing by adding 'Z' if missing
    const date = new Date(dateString.endsWith('Z') ? dateString : dateString + 'Z');
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return (
      <div className="bg-gray-100 p-4 px-2 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading experiences...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 p-4 px-2 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 px-2">
      {/* Company Filter Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {companies.map((company) => {
          const value = typeof company === 'string' ? company : (company && company.company ? company.company : String(company));
          return (
            <button
              key={value}
              onClick={() => setSelectedCompany(value)}
              className={`px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${
                selectedCompany === value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>

      {/* Year Filter Dropdown */}
      <div className="mb-4">
        <select
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
          className="p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
        >
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by company, year, role, or questions"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
      />

      {/* Experience Cards */}
      <div className="flex flex-col gap-3">
        {filteredExperiences.length > 0 ? (
          filteredExperiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-xl p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow w-full"
              onClick={() => navigate(`/home/post/${exp.id}`)}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-600">
                  {exp.anonymous || exp.name === 'Anonymous' ? <span>👤</span> : exp.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-gray-800 text-base">
                  {exp.anonymous || exp.name === 'Anonymous' ? 'Anonymous' : exp.name}
                </span>
                <span className="text-xs text-gray-400 ml-auto">
                  {getTimeAgo(exp.createdAt, now)}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-purple-700 break-words">{exp.company} - {exp.role}</h2>
              <p className="text-sm text-gray-500">{exp.year}</p>
              <div className="mt-2 text-sm text-gray-600">
                <span className="mr-4">TR: {exp.technicalRounds}</span>
                <span>HR: {exp.hrRounds}</span>
                <span className="ml-4 px-2 py-1 bg-gray-200 rounded text-xs">
                  {exp.status}
                </span>
              </div>
              <p className="mt-2 text-gray-700 text-base break-words">
                {truncate(exp.technicalQuestions)}
                {exp.technicalQuestions && exp.technicalQuestions.length > 120 && (
                  <span className="text-blue-500 ml-1">... Read more</span>
                )}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No experiences found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
