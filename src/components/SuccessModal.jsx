import React from 'react';

function SuccessModal({ name, onClose }) {
  if (!name) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 text-center max-w-md">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome, {name}!</h2>
        <p className="text-gray-600 mb-6">You've successfully joined Companion Connect.</p>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
