// pages/CompanionProfile.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { REVIEWS } from '../data/reviews';

function CompanionProfile({ companions, onBook, onChat }) {
  const { id } = useParams();
  const [companion, setCompanion] = useState(null);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const found = companions.find(c => c.id === parseInt(id));
    setCompanion(found);
  }, [id, companions]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const relatedReviews = REVIEWS.filter(r => r.companion.includes(companion?.name?.split(" ")[0] || ""));

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => {
      onBook(companion.name);
    }, 600);
  };

  if (!companion) {
    return (
      <div className="min-h-screen pt-32 px-[6%] pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-2xl text-[#2d1b4e] mb-2">Companion not found</h2>
          <Link to="/find-companions" className="text-[#e879a0] hover:underline">Browse other companions →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-[6%] pb-20 bg-gradient-to-br from-[#fff9f5] to-[#f7f0ff]">
      <div className="max-w-4xl mx-auto">
        <Link to="/find-companions" className="inline-flex items-center gap-2 text-[#5e3d8c] mb-8 hover:text-[#e879a0] transition-colors">
          ← Back to Companions
        </Link>
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
          <div className="flex gap-6 items-start flex-wrap">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl bg-gradient-to-r from-[#f3e5fb] to-[#fce4ec] flex-shrink-0">
              {companion.emoji}
            </div>
            <div>
              <h1 className="text-3xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-2">{companion.name}</h1>
              <div className="flex gap-4 flex-wrap text-[0.85rem] text-[#8a7499] mb-3">
                <span>🎂 {companion.age} years</span>
                <span>📍 {companion.location}</span>
                <span>⭐ {companion.rating} ({companion.reviews} reviews)</span>
              </div>
              <span className="inline-block bg-gradient-to-r from-[#e879a0] to-[#b355e0] text-white px-[18px] py-[6px] rounded-full text-[0.85rem] font-bold">
                ₹{companion.price} / hour
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-md">
          <h2 className="text-xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">About {companion.name.split(" ")[0]}</h2>
          <p className="text-[0.9rem] text-[#6b5b7a] leading-relaxed">{companion.bio}</p>
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-md">
          <h2 className="text-xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">Services Offered</h2>
          <div className="flex flex-wrap gap-2">
            {companion.services.map(s => (
              <span key={s} className="bg-[#f4eeff] text-[#5e3d8c] px-4 py-[7px] rounded-full text-[0.82rem] font-semibold border border-[rgba(94,61,140,0.15)]">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-md">
          <h2 className="text-xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">Availability This Week</h2>
          <div className="flex gap-2 flex-wrap">
            {companion.avail.map((a, i) => (
              <div key={i} className={`w-11 h-11 rounded-xl flex items-center justify-center text-[0.78rem] font-bold ${a ? 'bg-[#dcfce7] text-[#16a34a]' : 'bg-[#f4f4f5] text-[#a1a1aa]'}`}>
                {days[i]}
              </div>
            ))}
          </div>
          <p className="text-[0.75rem] text-[#9478ab] mt-2.5">🟢 Available &nbsp;⬜ Booked</p>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-md">
          <h2 className="text-xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">Recent Reviews</h2>
          {relatedReviews.length > 0 ? (
            relatedReviews.map((r, i) => (
              <div key={i} className="bg-[#faf8ff] rounded-xl p-[18px] mb-3">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-[0.88rem]">{r.name}</span>
                  <span className="text-[#f7c873] text-[0.8rem]">{'★'.repeat(r.stars)}</span>
                </div>
                <p className="text-[0.85rem] text-[#6b5b7a] leading-relaxed">{r.text}</p>
              </div>
            ))
          ) : (
            <div className="bg-[#faf8ff] rounded-xl p-[18px]">
              <p className="text-[#9478ab] text-[0.88rem]">Be the first to review {companion.name.split(" ")[0]}!</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <button 
            onClick={handleBook} 
            className={`flex-1 min-w-[140px] py-4 rounded-xl text-base font-bold cursor-pointer transition-all duration-300 ${booked ? 'bg-[#22c55e]' : 'bg-gradient-to-r from-[#e879a0] to-[#b355e0]'} text-white border-none`}
            style={{ transform: booked ? 'scale(0.98)' : 'none' }}
          >
            {booked ? "✅ Booking Sent!" : "📅 Book Now"}
          </button>
          <button 
            onClick={() => onChat(companion)} 
            className="flex-1 min-w-[140px] py-4 rounded-xl text-base font-bold cursor-pointer bg-[#f4eeff] text-[#5e3d8c] border-none hover:bg-[#ede7f6] transition-colors"
          >
            💬 Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanionProfile;