import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const defaultCompanies = ['TCS', 'Tech Mahindra', 'If not Above,Click this and enter company'];
const years = [2025, 2024, 2023, 2022];
const statuses = ['Accepted', 'Rejected', 'Pending'];

const WriteReview = () => {
  const [form, setForm] = useState({
    name: '',
    anonymous: false,
    year: years[0],
    company: defaultCompanies[0],
    otherCompany: '',
    role: '',
    technicalRounds: '',
    hrRounds: '',
    technicalQuestions: '',
    hrQuestions: '',
    status: statuses[0],
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [companies, setCompanies] = useState(defaultCompanies);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const backendCompanies = await apiService.getAllCompanies();
        const backendCompanyNames = backendCompanies.map(c =>
          typeof c === 'string' ? c : (c && c.company ? c.company : String(c))
        );
        // Remove defaults and 'If not Above...' from backend companies
        const userCompanies = backendCompanyNames.filter(
          c => !['TCS', 'Tech Mahindra', 'If not Above,Click this and enter company'].includes(c)
        );
        // Optionally sort user companies alphabetically
        userCompanies.sort((a, b) => a.localeCompare(b));
        // Compose the final list
        const uniqueCompanies = [
          'TCS',
          'Tech Mahindra',
          ...Array.from(new Set(userCompanies)),
          'If not Above,Click this and enter company'
        ];
        setCompanies(uniqueCompanies);
      } catch {
        setCompanies(defaultCompanies);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'anonymous' && checked ? { name: 'Anonymous' } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Prepare the data for the backend
      const companyName = form.company === 'If not Above,Click this and enter company'
        ? form.otherCompany
        : form.company;
      const experienceData = {
        name: form.anonymous ? 'Anonymous' : form.name,
        anonymous: form.anonymous,
        year: parseInt(form.year),
        company: companyName,
        role: form.role,
        technicalRounds: parseInt(form.technicalRounds) || 0,
        hrRounds: parseInt(form.hrRounds) || 0,
        technicalQuestions: form.technicalQuestions,
        hrQuestions: form.hrQuestions || '',
        status: form.status
      };

      // Send to backend
      const result = await apiService.createExperience(experienceData);
      console.log('Review submitted successfully:', result);
      setSubmitted(true);
      
      // Reset form after successful submission
      setForm({
        name: '',
        anonymous: false,
        year: years[0],
        company: defaultCompanies[0],
        otherCompany: '',
        role: '',
        technicalRounds: '',
        hrRounds: '',
        technicalQuestions: '',
        hrQuestions: '',
        status: statuses[0],
      });
      
      // Refetch companies after submission
      const backendCompanies = await apiService.getAllCompanies();
      const backendCompanyNames = backendCompanies.map(c =>
        typeof c === 'string' ? c : (c && c.company ? c.company : String(c))
      );
      const userCompanies = backendCompanyNames.filter(
        c => !['TCS', 'Tech Mahindra', 'If not Above,Click this and enter company'].includes(c)
      );
      userCompanies.sort((a, b) => a.localeCompare(b));
      const uniqueCompanies = [
        'TCS',
        'Tech Mahindra',
        ...Array.from(new Set(userCompanies)),
        'If not Above,Click this and enter company'
      ];
      setCompanies(uniqueCompanies);
      
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4 px-2 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">Share Your Interview Experience</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {/* Name & Anonymous */}
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.anonymous ? 'Anonymous' : form.name}
            onChange={handleChange}
            disabled={form.anonymous}
            placeholder="Enter your name"
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
            required={!form.anonymous}
          />
          <label className="inline-flex items-center mt-2">
            <input
              type="checkbox"
              name="anonymous"
              checked={form.anonymous}
              onChange={handleChange}
              className="mr-2"
            />
            Post as Anonymous
          </label>
        </div>
        
        {/* Year */}
        <div>
          <label className="block font-semibold mb-1">Year</label>
          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        
        {/* Company */}
        <div>
          <label className="block font-semibold mb-1">Company</label>
          <select
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            {companies.map((c) => {
              const value = typeof c === 'string' ? c : (c && c.company ? c.company : String(c));
              return <option key={value} value={value}>{value}</option>;
            })}
          </select>
          {form.company === 'If not Above,Click this and enter company' && (
            <input
              type="text"
              name="otherCompany"
              value={form.otherCompany}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full p-2 mt-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          )}
        </div>
        
        {/* Role */}
        <div>
          <label className="block font-semibold mb-1">Role/Position</label>
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="e.g. Software Engineer, Data Scientist"
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        
        {/* Number of Rounds */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Technical Rounds (TR)</label>
            <input
              type="number"
              name="technicalRounds"
              value={form.technicalRounds}
              onChange={handleChange}
              min="0"
              className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. 2"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">HR Rounds</label>
            <input
              type="number"
              name="hrRounds"
              value={form.hrRounds}
              onChange={handleChange}
              min="0"
              className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. 1"
            />
          </div>
        </div>
        
        {/* Technical Questions */}
        <div>
          <label className="block font-semibold mb-1">Technical Questions</label>
          <textarea
            name="technicalQuestions"
            value={form.technicalQuestions}
            onChange={handleChange}
            rows={3}
            placeholder="List the main technical questions asked..."
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        
        {/* HR Questions */}
        <div>
          <label className="block font-semibold mb-1">HR Questions <span className='text-gray-400'>(optional)</span></label>
          <textarea
            name="hrQuestions"
            value={form.hrQuestions}
            onChange={handleChange}
            rows={2}
            placeholder="List the main HR questions asked..."
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        {/* Status */}
        <div>
          <label className="block font-semibold mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold shadow transition text-base mt-2 ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
        
        {submitted && (
          <div className="text-green-600 text-center font-semibold mt-2">
            Thank you for sharing your experience! Your review has been submitted successfully.
          </div>
        )}
      </form>
    </div>
  );
};

export default WriteReview; 