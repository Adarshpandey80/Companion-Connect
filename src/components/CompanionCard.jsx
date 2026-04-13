import React from 'react';
import { MapPin, Star } from 'lucide-react';

function CompanionCard({ c, onOpen }) {
  return (
    <div
      onClick={() => onOpen && onOpen(c)}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
    >
      <div className="h-64 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center text-4xl">
        {c.emoji}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{c.name}</h3>
        <p className="text-sm text-purple-600 font-medium mb-2">{c.role}</p>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <MapPin size={16} /> {c.location}
        </div>

        <div className="flex items-center gap-1 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm font-semibold">{c.rating}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-purple-600">₹{c.price}/hr</span>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-600">
            Hire
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanionCard;
