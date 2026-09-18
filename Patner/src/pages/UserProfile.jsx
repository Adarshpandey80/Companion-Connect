import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Clock, Star, Edit2, LogOut, ShieldCheck, ShoppingBag, Loader2 } from 'lucide-react';
import axios from 'axios';

function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080';

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error('Failed to parse user data:', err);
      }
    }
    setLoading(false);

    if (token) {
      fetchBookings(token);
    } else {
      setLoadingBookings(false);
    }
  }, []);

  const fetchBookings = async (token) => {
    try {
      setLoadingBookings(true);
      const res = await axios.get(`${serverUrl}/bookings/my-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data && res.data.bookings) {
        setBookings(res.data.bookings);
      }
    } catch (err) {
      console.error('Failed to fetch user bookings:', err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
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
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full">
          <h2 className="text-2xl font-bold text-[#2d1b4e] mb-2">Not Logged In</h2>
          <p className="text-gray-600 mb-6">Please login to view your profile and bookings.</p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-linear-to-r from-[#e879a0] to-[#b355e0] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Calculate dynamic stats from real bookings
  const todayStr = new Date().toISOString().split('T')[0];
  const totalServices = bookings.length;
  const upcomingServices = bookings.filter((b) => b.date >= todayStr).length;
  const completedServices = bookings.filter((b) => b.date < todayStr).length;
  const totalHours = bookings.reduce((acc, b) => acc + (b.duration || 0), 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white rounded-lg transition-colors cursor-pointer"
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
              <p className="text-center text-gray-500 text-sm mb-6">
                {user.userType === 'companion' ? 'Companion Account' : 'Client Member'}
              </p>

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

              {/* Browse Companions Button */}
              <button
                onClick={() => navigate('/find-companions')}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-linear-to-r from-[#e879a0] to-[#b355e0] text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <ShoppingBag size={16} />
                Find Companions
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full mt-3 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2.5 rounded-xl font-semibold hover:bg-red-100 transition-all cursor-pointer"
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
              {/* Total Bookings */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#e879a0]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Total Bookings</p>
                    <p className="text-3xl font-bold text-[#2d1b4e]">{totalServices}</p>
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
                    <p className="text-3xl font-bold text-[#2d1b4e]">{totalHours}</p>
                  </div>
                  <div className="w-12 h-12 bg-linear-to-br from-[#b355e0]/20 to-[#e879a0]/20 rounded-full flex items-center justify-center">
                    <Clock size={24} className="text-[#b355e0]" />
                  </div>
                </div>
              </div>

              {/* Upcoming Services */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Upcoming</p>
                    <p className="text-3xl font-bold text-[#2d1b4e]">{upcomingServices}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar size={24} className="text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Completed Services */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Completed</p>
                    <p className="text-3xl font-bold text-[#2d1b4e]">{completedServices}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Star size={24} className="text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Booked Sessions History */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#2d1b4e]">Booked Sessions</h2>
                <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                  Razorpay Integrated
                </span>
              </div>

              {loadingBookings ? (
                <div className="text-center py-12">
                  <Loader2 size={32} className="animate-spin mx-auto text-purple-500 mb-2" />
                  <p className="text-gray-500 text-sm">Loading your bookings...</p>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                  <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">No bookings yet</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Book your first companion session with secure Razorpay payment.
                  </p>
                  <button
                    onClick={() => navigate('/find-companions')}
                    className="bg-linear-to-r from-[#e879a0] to-[#b355e0] text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:shadow-md transition"
                  >
                    Browse Companions
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((service) => (
                    <div
                      key={service.id}
                      className="p-5 border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all bg-linear-to-r from-white to-purple-50/20"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="font-bold text-[#2d1b4e] text-lg">
                              {service.companionName}
                            </h3>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                service.paymentStatus === 'paid'
                                  ? 'bg-green-100 text-green-700 border border-green-200'
                                  : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                              }`}
                            >
                              {service.paymentStatus === 'paid' ? '✓ Paid' : 'Pending Payment'}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                              {service.bookingStatus === 'confirmed' ? 'Confirmed' : service.bookingStatus}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1.5 font-medium">
                              <Calendar size={15} className="text-purple-500" />
                              {new Date(service.date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                            <span className="flex items-center gap-1.5 font-medium">
                              <Clock size={15} className="text-purple-500" />
                              {service.time} ({service.duration} hour{service.duration > 1 ? 's' : ''})
                            </span>
                          </div>

                          {service.paymentId && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 font-mono">
                              <ShieldCheck size={14} className="text-emerald-500" />
                              <span>Txn: {service.paymentId}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0">
                          <p className="text-2xl font-bold bg-linear-to-r from-[#e879a0] to-[#b355e0] bg-clip-text text-transparent">
                            ₹{service.totalPrice || service.totalAmount}
                          </p>
                          <span className="text-xs text-gray-500">Razorpay Verified</span>
                        </div>
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
