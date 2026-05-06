// components/Nav.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import useNav from '../hooks/useNav';

function Nav({ onBecome, scrollToSection }) {
  const scrolled = useNav();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    if (scrollToSection) {
      scrollToSection(sectionId);
    }
    setMobileOpen(false);
  };

  const handleBecomeClick = () => {
    onBecome();
    setMobileOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-5 transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_4px_30px_rgba(94,61,140,0.1)]' : ''
      }`}
      style={{
        background: "rgba(255,249,245,0.78)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.6)",
      }}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          {/* Logo Icon */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#e879a0] to-[#b355e0] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <span className="text-lg sm:text-xl font-bold text-white">♦</span>
          </div>
          {/* Logo Text */}
          <div className="flex flex-col gap-0">
            <span className="font-['Playfair_Display',serif] text-base sm:text-lg font-bold text-[#2d1b4e] leading-none">
              Companion
            </span>
            <span className="font-['DM_Sans',sans-serif] text-xs sm:text-sm font-semibold text-[#e879a0] tracking-wider uppercase">
              Connect
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-desktop hidden items-center gap-6 xl:gap-8">
          <Link 
            to="/how-it-works" 
            className="text-xs sm:text-sm text-[#2d1b4e] font-medium cursor-pointer transition-colors duration-200 no-underline hover:text-[#e879a0]"
          >
            How It Works
          </Link>
          <Link 
            to="/find-companions" 
            className="text-xs sm:text-sm text-[#2d1b4e] font-medium cursor-pointer transition-colors duration-200 no-underline hover:text-[#e879a0]"
          >
            Find Companions
          </Link>
          <Link 
            to="/become-companion" 
            className="text-xs sm:text-sm text-[#2d1b4e] font-medium cursor-pointer transition-colors duration-200 no-underline hover:text-[#e879a0]"
          >
            Become Companion
          </Link>
          <Link 
            to="/reviews" 
            className="text-xs sm:text-sm text-[#2d1b4e] font-medium cursor-pointer transition-colors duration-200 no-underline hover:text-[#e879a0]"
          >
            Reviews
          </Link>
          <Link 
            to="/safety-guidelines" 
            className="text-xs sm:text-sm text-[#2d1b4e] font-medium cursor-pointer transition-colors duration-200 no-underline hover:text-[#e879a0]"
          >
            Safety
          </Link>
          <button 
            onClick={handleBecomeClick} 
            className="bg-linear-to-r from-[#e879a0] to-[#d5a8f0] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold cursor-pointer shadow-[0_4px_16px_rgba(232,121,160,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(232,121,160,0.5)] whitespace-nowrap"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileOpen(o => !o)} 
          className="hamburger flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/30 transition-colors flex-shrink-0"
        >
          {mobileOpen ? (
            <X size={24} className="text-[#2d1b4e]" />
          ) : (
            <Menu size={24} className="text-[#2d1b4e]" />
          )}
        </button>
      </nav>
      
      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="fixed top-16 sm:top-20 left-0 w-full bg-[rgba(255,249,245,0.97)] backdrop-blur-[20px] px-4 sm:px-6 py-4 flex flex-col gap-3 z-40 border-b border-white/60 animate-fadeDown lg:hidden">
          <Link 
            to="/how-it-works" 
            onClick={() => setMobileOpen(false)} 
            className="text-sm sm:text-base text-[#2d1b4e] font-medium cursor-pointer text-left no-underline hover:text-[#e879a0] transition-colors"
          >
            How It Works
          </Link>
          <Link 
            to="/find-companions" 
            onClick={() => setMobileOpen(false)} 
            className="text-sm sm:text-base text-[#2d1b4e] font-medium cursor-pointer text-left no-underline hover:text-[#e879a0] transition-colors"
          >
            Find Companions
          </Link>
          <Link 
            to="/become-companion" 
            onClick={() => setMobileOpen(false)} 
            className="text-sm sm:text-base text-[#2d1b4e] font-medium cursor-pointer text-left no-underline hover:text-[#e879a0] transition-colors"
          >
            Become Companion
          </Link>
          <Link 
            to="/reviews" 
            onClick={() => setMobileOpen(false)} 
            className="text-sm sm:text-base text-[#2d1b4e] font-medium cursor-pointer text-left no-underline hover:text-[#e879a0] transition-colors"
          >
            Reviews
          </Link>
          <Link 
            to="/safety-guidelines" 
            onClick={() => setMobileOpen(false)} 
            className="text-sm sm:text-base text-[#2d1b4e] font-medium cursor-pointer text-left no-underline hover:text-[#e879a0] transition-colors"
          >
            Safety
          </Link>
          <button 
            onClick={() => { handleBecomeClick(); setMobileOpen(false); }} 
            className="bg-linear-to-r from-[#e879a0] to-[#d5a8f0] text-white px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer w-full mt-2 hover:shadow-lg transition-all"
          >
            Get Started
          </button>
        </div>
      )}
      
      <style>{`
        @media(max-width:860px){
          .nav-desktop{display:none!important}
          .hamburger{display:flex!important}
        }
        @media(min-width:861px){
          .nav-desktop{display:flex!important}
          .hamburger{display:none!important}
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadeDown {
          animation: fadeDown 0.3s ease;
        }
      `}</style>
    </>
  );
}

export default Nav;