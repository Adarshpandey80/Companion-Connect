import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Clock, Star, Edit2, LogOut } from 'lucide-react';

function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error('Failed to parse user data:', err);
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#e879a0] border-t-[#b355e0] rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#2d1b4e] font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#2d1b4e] mb-4">Not Logged In</h2>
          <p className="text-gray-600 mb-6">Please login to view your profile.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-linear-to-r from-[#e879a0] to-[#b355e0] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Mock data for service history
  const serviceStats = {
    totalServices: 8,
    completedServices: 7,
    upcomingServices: 1,
    totalHours: 24,
    averageRating: 4.8,
    totalReviews: 12,
  };

  const serviceHistory = [
    {
      id: 1,
      companionName: 'Sarah Johnson',
      companionRole: 'Career Coach',
      serviceDate: '2024-05-20',
      duration: '2 hours',
      status: 'Completed',
      amount: '₹500',
      rating: 5,
    },
    {
      id: 2,
      companionName: 'Michael Chen',
      companionRole: 'Life Coach',
      serviceDate: '2024-05-15',
      duration: '3 hours',
      status: 'Completed',
      amount: '₹600',
      rating: 4.5,
    },
    {
      id: 3,
      companionName: 'Emma Watson',
      companionRole: 'Travel Companion',
      serviceDate: '2024-06-01',
      duration: '4 hours',
      status: 'Upcoming',
      amount: '₹800',
      rating: null,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-[#2d1b4e]" />
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2d1b4e]">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - User Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {/* Profile Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-[#e879a0] to-[#b355e0] flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                  {user.fullName
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2) || 'U'}
                </div>
              </div>

              {/* User Name */}
              <h2 className="text-2xl font-bold text-center text-[#2d1b4e] mb-1">
                {user.fullName}
              </h2>
              <p className="text-center text-gray-500 text-sm mb-6">Member since {new Date().getFullYear()}</p>

              {/* User Details */}
              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#e879a0] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-[#2d1b4e] break-all">{user.email}</p>
                  </div>
                </div>

                {user.phone && (
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-[#e879a0] shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-[#2d1b4e]">{user.phone}</p>
                    </div>
                  </div>
                )}

                {user.location && (
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-[#e879a0] shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-[#2d1b4e]">{user.location}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Edit Profile Button */}
              <button className="w-full mt-6 flex items-center justify-center gap-2 bg-linear-to-r from-[#e879a0] to-[#b355e0] text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                <Edit2 size={16} />
                Edit Profile
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full mt-3 flex items-center justify-center gap-2 bg-red-100 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-200 transition-all"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Total Services */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#e879a0]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Total Services</p>
                    <p className="text-3xl font-bold text-[#2d1b4e]">{serviceStats.totalServices}</p>
                  </div>
                  <div className="w-12 h-12 bg-linear-to-br from-[#e879a0]/20 to-[#b355e0]/20 rounded-full flex items-center justify-center">
                    <Calendar size={24} className="text-[#e879a0]" />
                  </div>
                </div>
              </div>

              {/* Total Hours */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#b355e0]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Total Hours</p>
                    <p className="text-3xl font-bold text-[#2d1b4e]">{serviceStats.totalHours}</p>
                  </div>
                  <div className="w-12 h-12 bg-linear-to-br from-[#b355e0]/20 to-[#e879a0]/20 rounded-full flex items-center justify-center">
                    <Clock size={24} className="text-[#b355e0]" />
                  </div>
                </div>
              </div>

              {/* Completed Services */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Completed</p>
                    <p className="text-3xl font-bold text-[#2d1b4e]">{serviceStats.completedServices}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Calendar size={24} className="text-green-600" />
                  </div>
                </div>
              </div>

              {/* Average Rating */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Avg Rating</p>
                    <div className="flex items-center gap-2">
                      <p className="text-3xl font-bold text-[#2d1b4e]">{serviceStats.averageRating}</p>
                      <Star size={20} className="text-yellow-400 fill-yellow-400" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">{serviceStats.totalReviews} reviews</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service History */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-[#2d1b4e] mb-6">Service History</h2>

              {serviceHistory.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No services booked yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {serviceHistory.map((service) => (
                    <div
                      key={service.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1 mb-4 sm:mb-0">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-semibold text-[#2d1b4e]">{service.companionName}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              service.status === 'Completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {service.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{service.companionRole}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(service.serviceDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {service.duration}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 sm:gap-4 min-w-max">
                        <p className="text-lg font-bold text-[#2d1b4e]">{service.amount}</p>
                        {service.rating ? (
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < Math.floor(service.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">{service.rating}</span>
                          </div>
                        ) : (
                          <button className="text-sm text-[#e879a0] font-semibold hover:text-[#b355e0]">
                            Rate Service
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
