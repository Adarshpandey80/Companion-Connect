// pages/ReviewsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { REVIEWS } from '../data/reviews';

function ReviewsPage() {
  const stats = [
    { number: "50K+", label: "Happy Clients" },
    { number: "12K+", label: "Verified Companions" },
    { number: "4.9★", label: "Average Rating" },
    { number: "200K+", label: "Total Reviews" }
  ];

  return (
    <div className="min-h-screen pt-32 px-[6%] pb-20 bg-gradient-to-br from-[#fff9f5] to-[#f7f0ff]">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-[#5e3d8c] mb-8 hover:text-[#e879a0] transition-colors font-semibold">
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-4">
            Real Experiences from Real Users
          </h1>
          <p className="text-[#6b5b7a] text-lg max-w-2xl">
            Read authentic reviews from thousands of happy clients who've found wonderful companions through our platform.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl md:text-3xl font-['Playfair_Display',serif] text-[#e879a0] mb-2">
                {stat.number}
              </div>
              <div className="text-[#6b5b7a] font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {REVIEWS.map((review, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:translate-y-[-4px]"
            >
              {/* Quote Mark */}
              <div className="text-5xl text-[#f2a0b0] opacity-30 mb-2 leading-none">"</div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.stars)].map((_, j) => (
                  <span key={j} className="text-lg">★</span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#6b5b7a] leading-relaxed mb-6">
                {review.text}
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#f0e8ff]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f3e5fb] to-[#fce4ec] flex items-center justify-center text-lg">
                  {review.emoji}
                </div>
                <div>
                  <div className="font-semibold text-[#2d1b4e]">{review.name}</div>
                  <div className="text-sm text-[#9478ab]">
                    📍 {review.city} • Hired {review.companion}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#e879a0] to-[#b355e0] rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display',serif] mb-4">
            Ready to Have Your Own Great Experience?
          </h2>
          <p className="text-white/85 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients and find your perfect companion today.
          </p>
          <Link 
            to="/find-companions" 
            className="inline-block bg-white text-[#e879a0] px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all hover:translate-y-[-2px]"
          >
            Find a Companion →
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center shadow-md">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-semibold text-[#2d1b4e] mb-2">Verified Reviews</h3>
            <p className="text-sm text-[#6b5b7a]">All reviews are from verified bookings</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-md">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-[#2d1b4e] mb-2">Safe & Trustworthy</h3>
            <p className="text-sm text-[#6b5b7a]">Your privacy and safety matter to us</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-md">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="font-semibold text-[#2d1b4e] mb-2">Quality Assured</h3>
            <p className="text-sm text-[#6b5b7a]">Premium experiences guaranteed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewsPage;
