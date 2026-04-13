// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ onBecome }) {
  const handleBecomeClick = (e) => {
    e.preventDefault();
    onBecome();
  };

  return (
    <footer className="bg-[#2d1b4e] text-white/75 py-[60px] px-[6%] pt-[60px] pb-[30px]">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12 flex-wrap">
        <div>
          <div className="font-['Playfair_Display',serif] text-[1.4rem] font-bold text-white flex items-center gap-2.5 mb-3.5">
            <span className="w-2.5 h-2.5 rounded-full bg-linear-to-r from-[#e879a0] to-[#d5a8f0] inline-block" /> 
            Companion Connect
          </div>
          <p className="text-[0.85rem] leading-[1.7] text-white/55">
            A safe, professional platform for social companionship. Bringing people together for shopping, travel, events, and more.
          </p>
          <div className="flex gap-3 mt-5">
            {["𝕏", "f", "📸", "in"].map((s, i) => (
              <button 
                key={i} 
                className="w-[38px] h-[38px] rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[0.95rem] text-white/65 cursor-pointer transition-all duration-200 hover:bg-[#e879a0]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-white text-[0.85rem] font-bold tracking-[0.08em] uppercase mb-[18px]">Platform</h4>
          <ul className="list-none">
            <li className="mb-2.5"><Link to="/find-companions" className="bg-none border-none text-white/55 text-[0.85rem] cursor-pointer p-0 transition-colors duration-200 hover:text-[#f2a0b0]">Find Companions</Link></li>
            <li className="mb-2.5"><button onClick={handleBecomeClick} className="bg-none border-none text-white/55 text-[0.85rem] cursor-pointer p-0 transition-colors duration-200 hover:text-[#f2a0b0]">Become a Companion</button></li>
            <li className="mb-2.5"><Link to="/how-it-works" className="bg-none border-none text-white/55 text-[0.85rem] cursor-pointer p-0 transition-colors duration-200 hover:text-[#f2a0b0]">How It Works</Link></li>
            <li className="mb-2.5"><Link to="/#reviews" className="bg-none border-none text-white/55 text-[0.85rem] cursor-pointer p-0 transition-colors duration-200 hover:text-[#f2a0b0]">Reviews</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white text-[0.85rem] font-bold tracking-[0.08em] uppercase mb-[18px]">Support</h4>
          <ul className="list-none">
            <li className="mb-2.5"><Link to="/help-center" className="bg-none border-none text-white/55 text-[0.85rem] cursor-pointer p-0 transition-colors duration-200 hover:text-[#f2a0b0]">Help Center</Link></li>
            <li className="mb-2.5"><Link to="/contact-us" className="bg-none border-none text-white/55 text-[0.85rem] cursor-pointer p-0 transition-colors duration-200 hover:text-[#f2a0b0]">Contact Us</Link></li>
            <li className="mb-2.5"><Link to="/safety-guidelines" className="bg-none border-none text-white/55 text-[0.85rem] cursor-pointer p-0 transition-colors duration-200 hover:text-[#f2a0b0]">Safety Guidelines</Link></li>
            <li className="mb-2.5"><Link to="/report-issue" className="bg-none border-none text-white/55 text-[0.85rem] cursor-pointer p-0 transition-colors duration-200 hover:text-[#f2a0b0]">Report an Issue</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white text-[0.85rem] font-bold tracking-[0.08em] uppercase mb-[18px]">Legal</h4>
          <ul className="list-none">
            <li className="mb-2.5"><Link to="/about" className="bg-none border-none text-white/55 text-[0.85rem] cursor-pointer p-0 transition-colors duration-200 hover:text-[#f2a0b0]">About Us</Link></li>
            <li className="mb-2.5"><Link to="/privacy-policy" className="bg-none border-none text-white/55 text-[0.85rem] cursor-pointer p-0 transition-colors duration-200 hover:text-[#f2a0b0]">Privacy Policy</Link></li>
            <li className="mb-2.5"><Link to="/terms-of-service" className="bg-none border-none text-white/55 text-[0.85rem] cursor-pointer p-0 transition-colors duration-200 hover:text-[#f2a0b0]">Terms of Service</Link></li>
            <li className="mb-2.5"><Link to="/cookie-policy" className="bg-none border-none text-white/55 text-[0.85rem] cursor-pointer p-0 transition-colors duration-200 hover:text-[#f2a0b0]">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 pt-6 flex justify-between items-center flex-wrap gap-3 text-[0.78rem] text-white/40">
        <span>© 2025 Companion Connect. All rights reserved.</span>
        <span>Made with <span className="text-[#f2a0b0]">♥</span> for safe social connections</span>
      </div>
    </footer>
  );
}

export default Footer;