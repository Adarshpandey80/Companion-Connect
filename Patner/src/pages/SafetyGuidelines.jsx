// pages/SafetyGuidelines.js
import React from 'react';
import { Link } from 'react-router-dom';

function SafetyGuidelines() {
  const guidelines = [
    {
      title: "Verified Profiles",
      description: "All companions undergo thorough identity verification and background checks before joining our platform.",
      icon: "✅"
    },
    {
      title: "Secure Payments",
      description: "All transactions are encrypted and processed through certified payment gateways. Never share financial information outside the platform.",
      icon: "🔐"
    },
    {
      title: "Privacy Protection",
      description: "Your personal information is never shared without consent. Use our in-app messaging to communicate safely.",
      icon: "🛡️"
    },
    {
      title: "Community Guidelines",
      description: "Companion Connect is strictly for professional social companionship. Any inappropriate behavior will result in immediate account termination.",
      icon: "📋"
    },
    {
      title: "24/7 Reporting System",
      description: "Our safety team is always available. Report any concerns and we'll respond immediately.",
      icon: "🚨"
    },
    {
      title: "Mutual Reviews",
      description: "Both companions and clients rate each experience, keeping our community accountable and excellent.",
      icon: "⭐"
    }
  ];

  return (
    <div className="min-h-screen pt-32 px-[6%] pb-20 bg-gradient-to-br from-[#fff9f5] to-[#f7f0ff]">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#5e3d8c] mb-8 hover:text-[#e879a0] transition-colors">
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-4">Safety Guidelines</h1>
        <p className="text-[#6b5b7a] text-lg mb-8">
          Your safety is our top priority. Follow these guidelines to ensure a secure and enjoyable experience.
        </p>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-lg">
          <div className="flex gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-bold text-[#2d1b4e] mb-2">Important Note</h3>
              <p className="text-[#6b5b7a]">
                Companion Connect is a strictly professional social companionship platform. Any form of inappropriate, illegal, 
                or adult content is absolutely prohibited and will result in immediate account termination and legal action.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {guidelines.map((guideline, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{guideline.icon}</div>
              <h2 className="text-xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-2">{guideline.title}</h2>
              <p className="text-[#6b5b7a] leading-relaxed">{guideline.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-[#2d1b4e] text-white rounded-xl p-6">
          <h2 className="text-xl font-['Playfair_Display',serif] mb-3">Emergency Contacts</h2>
          <p className="text-white/80 mb-4">
            If you feel unsafe at any time, please contact local emergency services immediately.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-bold">Police Emergency</div>
              <div className="text-lg">100</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-bold">Women's Helpline</div>
              <div className="text-lg">1091</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-bold">Companion Connect Support</div>
              <div className="text-lg">support@companionconnect.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SafetyGuidelines;