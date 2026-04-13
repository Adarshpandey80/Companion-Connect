import React from 'react';
import { X, Star, MapPin, Clock } from 'lucide-react';

function ProfileModal({ companion, onClose }) {
  if (!companion) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 border-b flex justify-between items-center p-6 bg-white">
          <h2 className="text-2xl font-bold">{companion.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex gap-6">
            <div className="w-48 h-64 bg-gray-200 rounded-lg flex-shrink-0" />
            <div className="flex-1">
              <p className="text-lg text-gray-700 mb-4">{companion.role}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin size={16} /> {companion.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} /> {companion.availability}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400" />
                    ))}
                  </div>
                  {companion.rating} ({companion.reviews} reviews)
                </div>
              </div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold">
            Hire for ₹{companion.price}/hour
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
