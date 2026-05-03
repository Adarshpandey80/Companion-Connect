import React, { useState } from 'react';
import { X, Calendar, Clock, Package, ChevronDown } from 'lucide-react';

function BookingModal({ companion, onClose, onConfirm }) {
  if (!companion) return null;

  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [duration, setDuration] = useState(1);

  const hourlyRate = companion.price;
  const totalPrice = hourlyRate * duration;

  const handleConfirm = () => {
    if (!date) {
      alert('Please select a date');
      return;
    }
    onConfirm({
      companionId: companion.id,
      companionName: companion.name,
      date,
      time,
      duration,
      totalPrice,
    });
  };

  // Get tomorrow's date as minimum
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Get date 60 days from now as maximum
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 60);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-purple-50 to-pink-50 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Book Your Session</h2>
            <p className="text-sm text-gray-600 mt-1">with {companion.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition flex-shrink-0">
            <X size={24} className="text-gray-600" />
          </button>
        </div>

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
              onChange={(e) => setDate(e.target.value)}
              min={minDate}
              max={maxDateStr}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 bg-gray-50 font-medium"
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
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 mt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Rate per hour</span>
              <span className="font-semibold text-gray-800">₹{hourlyRate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Duration</span>
              <span className="font-semibold text-gray-800">{duration} hour{duration > 1 ? 's' : ''}</span>
            </div>
            {duration > 1 && (
              <div className="border-t border-purple-200 pt-3 flex justify-between">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ₹{totalPrice}
                </span>
              </div>
            )}
            {duration === 1 && (
              <div className="border-t border-purple-200 pt-3 flex justify-between">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ₹{totalPrice}
                </span>
              </div>
            )}
          </div>

          {/* Session Summary */}
          {date && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs font-semibold text-blue-900 mb-2">SESSION DETAILS</p>
              <p className="text-sm text-blue-800">
                <span className="font-semibold">{companion.name}</span> on {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {time}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!date}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
