import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Calendar, Clock, User, ShieldCheck, ArrowRight, X } from 'lucide-react';

function BookingConfirmation({ booking, onClose }) {
  const navigate = useNavigate();

  if (!booking) return null;

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const handleGoToProfile = () => {
    onClose();
    navigate('/user-profile');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-7 text-center relative text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/20 transition"
          >
            <X size={20} className="text-white" />
          </button>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
            <Check size={32} className="text-emerald-600 stroke-[3]" />
          </div>
          <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
          <p className="text-emerald-100 text-sm mt-1">Payment verified & session scheduled</p>
        </div>

        {/* Booking Details */}
        <div className="p-6 space-y-3.5 max-h-[60vh] overflow-y-auto">
          {/* Payment ID Badge */}
          {booking.paymentId && (
            <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
              <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <ShieldCheck size={16} className="text-emerald-600" />
                <span>Razorpay Payment ID</span>
              </div>
              <span className="font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                {booking.paymentId}
              </span>
            </div>
          )}

          {/* Companion */}
          <div className="flex items-center gap-3 p-3.5 bg-purple-50 rounded-xl border border-purple-100">
            <div className="w-10 h-10 rounded-lg bg-purple-200 flex items-center justify-center text-purple-700 font-bold shrink-0">
              <User size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500 font-medium">Companion</p>
              <p className="font-bold text-gray-800 truncate">{booking.companionName}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 p-3.5 bg-blue-50 rounded-xl border border-blue-100">
            <div className="w-10 h-10 rounded-lg bg-blue-200 flex items-center justify-center text-blue-700 font-bold shrink-0">
              <Calendar size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500 font-medium">Session Date</p>
              <p className="font-bold text-gray-800 truncate">{formatDate(booking.date)}</p>
            </div>
          </div>

          {/* Time & Duration */}
          <div className="flex items-center gap-3 p-3.5 bg-orange-50 rounded-xl border border-orange-100">
            <div className="w-10 h-10 rounded-lg bg-orange-200 flex items-center justify-center text-orange-700 font-bold shrink-0">
              <Clock size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500 font-medium">Time & Duration</p>
              <p className="font-bold text-gray-800 truncate">
                {booking.time} • {booking.duration} hour{booking.duration > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 font-medium">Amount Paid</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ₹{booking.totalPrice || booking.totalAmount}
              </p>
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
              ✓ Paid
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t bg-gray-50 flex gap-3">
          <button
            onClick={handleGoToProfile}
            className="flex-1 px-4 py-3 bg-purple-100 text-purple-700 rounded-xl font-semibold hover:bg-purple-200 transition flex items-center justify-center gap-1.5 text-sm"
          >
            <span>My Bookings</span>
            <ArrowRight size={16} />
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-md hover:shadow-lg text-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
