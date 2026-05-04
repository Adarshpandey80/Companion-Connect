// pages/HowItWorksPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HowItWorksPage() {
  const steps = [
    { number: "01", icon: "🔍", title: "Browse Profiles", description: "Explore our diverse community of verified companions. Filter by interests, location, and availability to find someone who matches your vibe." },
    { number: "02", icon: "⭐", title: "Choose Your Match", description: "Read authentic reviews, compare ratings, and review service offerings to select your ideal companion for the experience you want." },
    { number: "03", icon: "📅", title: "Book Instantly", description: "Confirm your booking in seconds with our secure payment system. Receive instant confirmation and connect with your companion." },
    { number: "04", icon: "🎉", title: "Enjoy Together", description: "Meet your companion and have a wonderful, memorable experience. Afterward, share your experience with a rating and review!" }
  ];

  return (
    <div className="min-h-screen pt-32 px-[6%] pb-20 bg-gradient-to-br from-[#fff9f5] to-[#f7f0ff]">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#5e3d8c] mb-8 hover:text-[#e879a0] transition-colors">
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-4">How It Works</h1>
        <p className="text-[#6b5b7a] text-lg mb-12">
          Getting started with Companion Connect is simple. Follow these four steps to find your perfect companion.
        </p>
        
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.number} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-6 flex-wrap md:flex-nowrap">
                <div className="text-center">
                  <div className="font-['Playfair_Display',serif] text-5xl font-bold bg-gradient-to-r from-[#f2a0b0] to-[#d5a8f0] bg-clip-text text-transparent mb-2">{step.number}</div>
                  <div className="text-3xl">{step.icon}</div>
                </div>
                <div>
                  <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">{step.title}</h2>
                  <p className="text-[#6b5b7a] leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/find-companions" 
            className="inline-block bg-gradient-to-r from-[#e879a0] to-[#b355e0] text-white px-8 py-3 rounded-full font-semibold hover:translate-y-[-2px] transition-transform"
          >
            Find Your Companion Now →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HowItWorksPage;