import React from 'react';
import { X, Check, Calendar, Clock, User } from 'lucide-react';

function BookingConfirmation({ booking, onClose }) {
  if (!booking) return null;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white">Booking Confirmed!</h2>
          <p className="text-green-50 text-sm mt-2">Your session has been booked successfully</p>
        </div>

        {/* Booking Details */}
        <div className="p-6 space-y-4">
          {/* Companion */}
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
            <User size={20} className="text-purple-500" />
            <div>
              <p className="text-xs text-gray-600 font-medium">Companion</p>
              <p className="font-bold text-gray-800">{booking.companionName}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <Calendar size={20} className="text-blue-500" />
            <div>
              <p className="text-xs text-gray-600 font-medium">Date</p>
              <p className="font-bold text-gray-800">{formatDate(booking.date)}</p>
            </div>
          </div>

          {/* Time & Duration */}
          <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
            <Clock size={20} className="text-orange-500" />
            <div>
              <p className="text-xs text-gray-600 font-medium">Time & Duration</p>
              <p className="font-bold text-gray-800">
                {booking.time} • {booking.duration} hour{booking.duration > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-200">
            <p className="text-sm text-gray-600 mb-2">Total Amount</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ₹{booking.totalPrice}
            </p>
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Confirmation email</span> has been sent to your registered email address with all the session details.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t bg-gray-50 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
