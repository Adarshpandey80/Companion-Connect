import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

function BecomeCompanionForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    age: '',
    bio: '',
    experience: '',
    services: [],
    availability: '',
    rates: '',
    documents: null,
    agreeTerms: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const serviceOptions = [
    'Shopping',
    'Travel Companion',
    'Event Attendance',
    'Dining',
    'Entertainment',
    'Museum Visits',
    'City Tours',
    'Social Events'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    if (formData.services.length === 0) {
      setError('Please select at least one service');
      return;
    }

    if (formData.bio.length < 20) {
      setError('Bio must be at least 20 characters');
      return;
    }

    setLoading(true);
    try {
      const apiUrl = `${import.meta.env.VITE_SERVER_URL}/user/become-companion`;
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        age: parseInt(formData.age),
        bio: formData.bio,
        experience: formData.experience,
        services: formData.services,
        availability: formData.availability,
        hourlyRate: parseFloat(formData.rates),
        agreeTerms: formData.agreeTerms
      };

      const response = await axios.post(apiUrl, payload);
      
      if (response.data && response.data.companion) {
        setSubmitted(true);
        onSuccess(formData.fullName);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
      console.error('Error submitting companion form:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#e879a0] to-[#d5a8f0] flex items-center justify-center">
              <CheckCircle size={32} className="text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-[#2d1b4e] mb-2">Success!</h2>
          <p className="text-gray-600 mb-4">
            Thank you {formData.fullName}! Your application has been submitted successfully.
          </p>
          <p className="text-sm text-gray-500">
            We'll review your profile and get back to you within 24-48 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 border-b flex justify-between items-center p-6 bg-gradient-to-r from-[#2d1b4e] to-[#6b5b7a]">
          <h2 className="text-2xl font-bold text-white">Become a Professional Companion</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-bold text-[#2d1b4e] mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#e879a0]"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  name="age"
                  min="18"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#e879a0]"
                  placeholder="Must be 18+"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#e879a0]"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#e879a0]"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#e879a0]"
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>

          {/* Professional Details Section */}
          <div>
            <h3 className="text-lg font-bold text-[#2d1b4e] mb-4">Professional Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">About You *</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#e879a0]"
                  placeholder="Tell us about yourself, your interests, and what makes you a great companion..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Experience in Companion Services</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#e879a0]"
                >
                  <option value="">Select experience level</option>
                  <option value="none">No experience</option>
                  <option value="1">0-1 year</option>
                  <option value="2">1-2 years</option>
                  <option value="5">2-5 years</option>
                  <option value="more">More than 5 years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Hourly Rate ($) *</label>
                <input
                  type="number"
                  name="rates"
                  value={formData.rates}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#e879a0]"
                  placeholder="Enter your hourly rate"
                />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-lg font-bold text-[#2d1b4e] mb-4">Services You Offer *</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {serviceOptions.map(service => (
                <button
                  key={service}
                  type="button"
                  onClick={() => handleServiceToggle(service)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    formData.services.includes(service)
                      ? 'bg-gradient-to-r from-[#e879a0] to-[#d5a8f0] text-white'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:border-[#e879a0]'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Section */}
          <div>
            <h3 className="text-lg font-bold text-[#2d1b4e] mb-4">Availability *</h3>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#e879a0]"
            >
              <option value="">Select your availability</option>
              <option value="weekday">Weekdays only</option>
              <option value="weekend">Weekends only</option>
              <option value="both">Weekdays & Weekends</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          {/* Terms Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-1 w-5 h-5 accent-[#e879a0] rounded"
              />
              <span className="text-sm text-gray-700">
                I agree to the terms and conditions, privacy policy, and consent to background verification. I confirm I am 18+ years old. *
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#e879a0] to-[#d5a8f0] text-white py-3 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BecomeCompanionForm;
