import React, { useState } from 'react';
import { X, Calendar, Clock, Package, ChevronDown, MapPin, Star, CheckCircle, AlertCircle, Loader2, ShieldCheck, LogIn } from 'lucide-react';
import axios from 'axios';
import { loadRazorpay } from '../utils/loadRazorpay';
import { isJwtExpired } from '../hooks/useAuth';
import Login from './Login';
import SignUp from './SignUp';

function BookingModal({ companion, onClose, onConfirm, onShowLogin }) {
  if (!companion) return null;

  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [duration, setDuration] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const hourlyRate = companion.price;
  const totalPrice = hourlyRate * duration;
  const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080';

  // Get tomorrow's date as minimum
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Get date 60 days from now as maximum
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 60);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleOpenLogin = () => {
    if (onShowLogin) {
      onClose();
      onShowLogin();
    } else {
      setShowLoginModal(true);
    }
  };

  const handleConfirmAndPay = async () => {
    if (!date) {
      setError('Please select a date for your session');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token || isJwtExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setError('Your session has expired or you are not logged in. Please log in to continue booking.');
      handleOpenLogin();
      return;
    }

    setError('');
    setLoading(true);

    try {
      // 1. Ensure Razorpay SDK script is loaded
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection and try again.');
      }

      // 2. Create order on backend
      const orderPayload = {
        companionId: companion.id,
        companionName: companion.name,
        date,
        time,
        duration,
        hourlyRate,
      };

      const { data } = await axios.post(`${serverUrl}/bookings/create-order`, orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!data.success || !data.order) {
        throw new Error(data.message || 'Failed to initialize booking order.');
      }

      const { keyId, order, bookingId } = data;
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      // 3. Configure Razorpay Checkout options
      const options = {
        key: keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'Find Companion',
        description: `Booking with ${companion.name} (${duration} hr)`,
        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        order_id: order.id,
        handler: async function (paymentResponse) {
          try {
            setLoading(true);
            const verifyRes = await axios.post(
              `${serverUrl}/bookings/verify-payment`,
              {
                orderId: paymentResponse.razorpay_order_id,
                paymentId: paymentResponse.razorpay_payment_id,
                signature: paymentResponse.razorpay_signature,
                bookingId,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );

            if (verifyRes.data.success) {
              onConfirm(verifyRes.data.booking);
            } else {
              setError(verifyRes.data.message || 'Payment signature verification failed.');
              setLoading(false);
            }
          } catch (verifyErr) {
            console.error('Payment verification error:', verifyErr);
            setError(
              verifyErr.response?.data?.message ||
                'Payment verification failed on the server. Please contact support.'
            );
            setLoading(false);
          }
        },
        prefill: {
          name: user.fullName || '',
          email: user.email || '',
          contact: user.phone || '',
        },
        notes: {
          companionName: companion.name,
          date,
          time,
        },
        theme: {
          color: '#9333ea',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('Razorpay payment failed:', response.error);
        setError(response.error.description || 'Payment processing failed. Please try again.');
        setLoading(false);
      });

      rzp.open();
    } catch (err) {
      console.error('Booking order creation error:', err);

      if (err.response?.status === 401 || err.response?.data?.isAuthError) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setError('Your session has expired or is invalid. Please log in again to continue booking.');
        handleOpenLogin();
      } else {
        setError(
          err.response?.data?.message || err.message || 'Unable to proceed to payment. Please try again.'
        );
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-purple-50 to-pink-50 flex-shrink-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Book Your Session</h2>
              <p className="text-xs text-purple-600 font-medium flex items-center gap-1 mt-0.5">
                <ShieldCheck size={14} /> Razorpay Secure Checkout
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={loading}
              className="p-2 hover:bg-white rounded-full transition flex-shrink-0 disabled:opacity-50 cursor-pointer"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Companion Info Card */}
          <div className="px-6 pt-6 flex-shrink-0">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center text-3xl flex-shrink-0 shadow-inner">
                  {companion.emoji || '👤'}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-800 truncate">{companion.name}</h3>
                  <p className="text-sm text-purple-600 font-semibold mb-2">{companion.role}</p>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-sm text-gray-700 mb-1">
                    <MapPin size={14} className="text-purple-500 shrink-0" />
                    <span className="truncate">{companion.location}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-sm">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-800">{companion.rating || 5.0}</span>
                    <span className="text-gray-600 text-xs">({companion.reviews || 0} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Availability Status */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-purple-200">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-sm font-semibold text-green-700">Available Now</span>
                <span className="text-xs text-gray-600 ml-auto">Verified Companion</span>
              </div>
            </div>
          </div>

          {/* Error Notification with Re-login Action */}
          {error && (
            <div className="mx-6 mt-4 p-3.5 bg-red-50 border border-red-200 rounded-xl flex flex-col gap-2.5 text-sm text-red-600 animate-in fade-in">
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" />
                <span className="flex-1 font-medium">{error}</span>
              </div>
              {(error.toLowerCase().includes('expired') ||
                error.toLowerCase().includes('log in') ||
                error.toLowerCase().includes('token')) && (
                <button
                  type="button"
                  onClick={handleOpenLogin}
                  className="self-start flex items-center gap-1.5 text-xs font-bold bg-red-600 text-white px-3.5 py-1.5 rounded-lg hover:bg-red-700 transition shadow-xs cursor-pointer"
                >
                  <LogIn size={14} />
                  <span>Log In to Continue</span>
                </button>
              )}
            </div>
          )}

          {/* Body - Scrollable */}
          <div className="p-6 space-y-5 overflow-y-auto flex-1">
            {/* Date Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Calendar size={18} className="text-purple-500" />
                Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setError('');
                }}
                min={minDate}
                max={maxDateStr}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 bg-gray-50 font-medium cursor-pointer"
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Clock size={18} className="text-purple-500" />
                Start Time
              </label>
              <div className="relative">
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 bg-gray-50 font-medium appearance-none cursor-pointer"
                >
                  {[...Array(24)].map((_, i) => {
                    const hours = String(i).padStart(2, '0');
                    const label = `${i === 0 ? '12' : i > 12 ? i - 12 : i}:00 ${i < 12 ? 'AM' : 'PM'}`;
                    return (
                      <option key={i} value={`${hours}:00`}>
                        {label}
                      </option>
                    );
                  })}
                </select>
                <ChevronDown size={18} className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Duration Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Package size={18} className="text-purple-500" />
                Duration
              </label>
              <div className="relative">
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 bg-gray-50 font-medium appearance-none cursor-pointer"
                >
                  {[...Array(8)].map((_, i) => {
                    const hrs = i + 1;
                    return (
                      <option key={hrs} value={hrs}>
                        {hrs} hour{hrs > 1 ? 's' : ''}
                      </option>
                    );
                  })}
                </select>
                <ChevronDown size={18} className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 mt-6 space-y-3 border border-purple-100">
              <div className="flex items-center justify-between pb-3 border-b border-purple-200">
                <span className="text-sm text-gray-700 font-medium">Hourly Rate</span>
                <span className="font-bold text-purple-600">₹{hourlyRate}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-purple-200">
                <span className="text-sm text-gray-700 font-medium">Duration</span>
                <span className="font-semibold text-gray-800">{duration} hour{duration > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-base font-bold text-gray-900">Total Payable</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ₹{totalPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Footer with Razorpay Pay Button */}
          <div className="p-6 border-t bg-gradient-to-r from-gray-50 to-purple-50 flex gap-3 flex-shrink-0">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmAndPay}
              disabled={!date || loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Pay ₹{totalPrice} with Razorpay</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Login Modal */}
      {showLoginModal && (
        <Login
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
          onSuccess={() => {
            setShowLoginModal(false);
            setError('');
          }}
        />
      )}

      {/* Embedded SignUp Modal */}
      {showSignupModal && (
        <SignUp
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
          onSuccess={() => {
            setShowSignupModal(false);
            setError('');
          }}
        />
      )}
    </>
  );
}

export default BookingModal;
