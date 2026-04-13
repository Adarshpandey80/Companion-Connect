// components/Hero.js
import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANIONS } from '../data/companions';

function Hero({ onFind, onBecome }) {
  return (
    <section className="min-h-screen pt-[130px] px-[6%] pb-20 flex items-center relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_70%_40%,#f8d7e8_0%,transparent_60%),radial-gradient(ellipse_60%_50%_at_10%_80%,#e8d5f8_0%,transparent_60%),radial-gradient(ellipse_50%_40%_at_90%_10%,#d4eaf8_0%,transparent_50%),#fff9f5]" />
      {[
        { w: 380, h: 380, bg: "#f2a0b0", top: "5%", right: "15%", d: 0 },
        { w: 260, h: 260, bg: "#d5a8f0", bottom: "10%", right: "5%", d: -3 },
        { w: 200, h: 200, bg: "#a8d8f0", top: "30%", right: "40%", d: -6 }
      ].map((o, i) => (
        <div 
          key={i} 
          className="absolute rounded-full blur-[60px] opacity-40"
          style={{
            width: o.w,
            height: o.h,
            background: o.bg,
            animation: `float 8s ease-in-out ${o.d}s infinite`,
            top: o.top,
            right: o.right,
            bottom: o.bottom
          }} 
        />
      ))}

      {/* Content */}
      <div className="relative z-[1] max-w-[580px]">
        <div className="inline-flex items-center gap-2 bg-white/45 border border-white/70 backdrop-blur-[10px] rounded-full px-[18px] py-[7px] text-[0.8rem] font-semibold text-[#5e3d8c] mb-7 animate-fadeDown">
          <span className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_0_3px_rgba(74,222,128,0.25)] inline-block" />
          Trusted by 50,000+ Happy Users Worldwide
        </div>
        <h1 className="text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.15] text-[#2d1b4e] mb-[22px] animate-fadeUp">
          Find Your Perfect{" "}
          <span className="bg-linear-to-r from-[#e879a0] to-[#5e3d8c] bg-clip-text text-transparent">
            Companion
          </span>{" "}
          Anytime, Anywhere
        </h1>
        <p className="text-[1.1rem] leading-[1.7] text-[#6b5b7a] mb-10 animate-fadeUp">
          Hire trusted companions for shopping, travel, events, or just good company. Safe, verified, and always professional.
        </p>
        <div className="flex gap-4 flex-wrap animate-fadeUp">
          <button 
            onClick={onFind} 
            className="bg-linear-to-r from-[#e879a0] to-[#b355e0] text-white px-[34px] py-[15px] rounded-full text-base font-bold border-none cursor-pointer shadow-[0_6px_24px_rgba(232,121,160,0.4)] transition-transform duration-200 hover:-translate-y-0.75"
          >
            🔍 Find a Companion
          </button>
          <button 
            onClick={onBecome} 
            className="bg-white/45 border border-white/70 backdrop-blur-[10px] text-[#2d1b4e] px-[34px] py-[15px] rounded-full text-base font-bold cursor-pointer transition-all duration-200 hover:bg-white/70"
          >
            ✨ Become a Companion
          </button>
        </div>
        <div className="flex gap-10 mt-12 flex-wrap animate-fadeUp">
          {[
            ["12K+", "Verified Companions"],
            ["4.9★", "Average Rating"],
            ["50K+", "Happy Clients"]
          ].map(([num, label]) => (
            <div key={label}>
              <h3 className="text-[1.8rem] text-[#e879a0] font-['Playfair_Display',serif]">{num}</h3>
              <p className="text-[0.78rem] text-[#9478ab] font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Cards */}
      <div className="hero-visual-wrap absolute right-[5%] top-1/2 -translate-y-1/2 w-[clamp(280px,38%,520px)] z-[1] animate-fadeUp">
        <div className="relative p-6">
          <div className="absolute top-0 -left-2.5 bg-white rounded-[18px] px-4 py-2.5 shadow-[0_8px_32px_rgba(94,61,140,0.18)] text-[0.8rem] font-semibold flex items-center gap-2 animate-float z-[2] text-[#2d1b4e]">
            <span>🛍️</span> Shopping Partner
          </div>
          {COMPANIONS.slice(0, 2).map((c, i) => (
            <div 
              key={c.id} 
              className="bg-white/45 border border-white/70 backdrop-blur-[16px] rounded-2xl p-5 shadow-[0_8px_40px_rgba(94,61,140,0.12)]"
              style={{ marginLeft: i === 0 ? 40 : 0, marginTop: i === 1 ? 16 : 0 }}
            >
              <div className="flex gap-3.5 items-center mb-3.5">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-[1.8rem] bg-linear-to-r from-[#fce4ec] to-[#e8d5f8] border-3 border-white shrink-0">
                  {c.emoji}
                </div>
                <div>
                  <div className="font-bold text-base mb-1">{c.name.split(" ")[0]} S.</div>
                  <div className="text-[0.8rem] text-[#9478ab]">{c.role} · {c.location}</div>
                  <div className="flex gap-1.5 mt-1.5">
                    {c.tags.slice(0, 2).map(t => (
                      <span key={t} className="bg-linear-to-r from-[rgba(232,121,160,0.12)] to-[rgba(179,85,224,0.12)] text-[#5e3d8c] text-[0.7rem] font-semibold px-2.5 py-[3px] rounded-full border border-[rgba(179,85,224,0.2)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#f7c873] tracking-[1px]">★★★★★</span>
                <strong className="text-[#e879a0]">₹{c.price}/hr</strong>
              </div>
            </div>
          ))}
          <div className="absolute bottom-5 -right-2.5 bg-white rounded-[18px] px-4 py-2.5 shadow-[0_8px_32px_rgba(94,61,140,0.18)] text-[0.8rem] font-semibold flex items-center gap-2 animate-float z-[2] text-[#2d1b4e]" style={{ animationDelay: "-3s" }}>
            <span>✅</span> Verified & Safe
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-22px) scale(1.04); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fadeUp {
          animation: fadeUp 0.9s ease both;
        }
        .animate-fadeDown {
          animation: fadeDown 0.8s ease both;
        }
        @media(max-width:600px){
          .hero-visual-wrap{display:none!important}
        }
      `}</style>
    </section>
  );
}

export default Hero;