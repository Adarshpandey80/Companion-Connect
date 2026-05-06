import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Users, TrendingUp, Shield, Award, Clock } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

function BecomeCompanionPage({ onBecomeClick, onShowToast }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setShowSignup(true);
  };

  const handleLoginSuccess = (msg) => {
    onShowToast?.(msg || 'Login successful! Welcome back.');
  };

  const handleSignupSuccess = (msg) => {
    onShowToast?.(msg || 'Account created successfully!');
  };

  const closeLogin = () => setShowLogin(false);
  const closeSignup = () => setShowSignup(false);

  const benefits = [
    {
      icon: <TrendingUp size={28} />,
      title: "Grow Your Income",
      description: "Earn competitive rates for your time and expertise as a companion"
    },
    {
      icon: <Users size={28} />,
      title: "Meet New People",
      description: "Connect with interesting individuals from diverse backgrounds"
    },
    {
      icon: <Shield size={28} />,
      title: "Safe & Secure",
      description: "Verified clients and comprehensive safety protocols for your peace of mind"
    },
    {
      icon: <Award size={28} />,
      title: "Build Your Brand",
      description: "Create a professional profile and build your reputation"
    },
    {
      icon: <Clock size={28} />,
      title: "Flexible Schedule",
      description: "Work on your own terms with complete control over your availability"
    },
    {
      icon: <CheckCircle size={28} />,
      title: "Easy Management",
      description: "Simple booking system and payment processing"
    }
  ];

  const requirements = [
    { text: "Must be 18 years or older" },
    { text: "Valid government-issued ID" },
    { text: "Pass background verification" },
    { text: "Professional and courteous demeanor" },
    { text: "Reliable and punctual" },
    { text: "Commitment to client safety and confidentiality" }
  ];

  return (
    <>
      <Nav onBecome={onBecomeClick} scrollToSection={() => {}} />
      
      <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white pt-20 pb-12">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2d1b4e] mb-4">
              Join Our Network of
              <span className="block bg-gradient-to-r from-[#e879a0] to-[#d5a8f0] text-transparent bg-clip-text">
                Professional Companions
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Become part of a thriving community and earn competitive income by providing meaningful companionship services. We connect you with clients who value your time and expertise.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-[#e879a0] to-[#d5a8f0] text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Get Started Today
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl font-bold text-[#e879a0] mb-2">5000+</div>
              <p className="text-gray-600">Active Companions</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl font-bold text-[#e879a0] mb-2">$50K+</div>
              <p className="text-gray-600">Monthly Earnings Potential</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl font-bold text-[#e879a0] mb-2">4.9/5</div>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d1b4e] text-center mb-12">
            Why Join Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-[#e879a0] mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-[#2d1b4e] mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d1b4e] text-center mb-12">
            Getting Started is Easy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Sign Up", desc: "Create your professional profile" },
              { step: 2, title: "Verify", desc: "Complete background verification" },
              { step: 3, title: "Set Availability", desc: "Choose your working hours" },
              { step: 4, title: "Start Earning", desc: "Receive and accept bookings" }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#e879a0] to-[#d5a8f0] flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-[#2d1b4e] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                {item.step < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#e879a0] to-[#d5a8f0]"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Requirements Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d1b4e] text-center mb-12">
            Requirements
          </h2>
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-4">
                  <CheckCircle size={24} className="text-[#e879a0] flex-shrink-0" />
                  <span className="text-gray-700">{req.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-[#e879a0] to-[#d5a8f0] rounded-2xl p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform Your Income?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of professional companions earning competitive income. Sign up today and start accepting bookings!
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-white text-[#e879a0] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300 hover:shadow-lg"
            >
              Create Your Profile
            </button>
          </div>
        </div>
      </div>

      <Footer onBecome={onBecomeClick} />

      {/* Modals */}
      {showLogin && (
        <Login
          onClose={closeLogin}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          onSuccess={handleLoginSuccess}
        />
      )}
      {showSignup && (
        <SignUp
          onClose={closeSignup}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
          onSuccess={handleSignupSuccess}
        />
      )}
    </>
  );
}

export default BecomeCompanionPage;
