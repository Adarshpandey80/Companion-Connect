// components/CTA.js
import React from 'react';
import Reveal from './Reveal';
import SectionTag from './SectionTag';

function CTA({ onFind, onBecome }) {
  return (
    <section className="py-[100px] px-[6%] text-center bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,#fce4ec_0%,#ede7f6_50%,#e3f2fd_100%)] rounded-[40px] mx-[3%]">
      <div className="animate-[sway_3s_ease-in-out_infinite] text-5xl mb-6 flex justify-center gap-2">🌟 👥 🌟</div>
      <Reveal>
        <SectionTag>Start Today</SectionTag>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-[clamp(2rem,4vw,3.2rem)] my-4 mb-[18px] text-[#2d1b4e]">
          Your Perfect Experience <span className="text-[#e879a0]">Awaits</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-[1.05rem] text-[#6b5b7a] mb-10 max-w-[500px] mx-auto">
          Join thousands of people already enjoying meaningful connections and memorable experiences through Companion Connect.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="flex gap-4 justify-center flex-wrap">
          <button 
            onClick={onFind} 
            className="bg-gradient-to-r from-[#e879a0] to-[#b355e0] text-white px-[34px] py-[15px] rounded-full text-base font-bold border-none cursor-pointer shadow-[0_6px_24px_rgba(232,121,160,0.4)] transition-transform duration-200 hover:translate-y-[-3px]"
          >
            🔍 Hire Now
          </button>
          <button 
            onClick={onBecome} 
            className="bg-white/60 border border-white/80 text-[#2d1b4e] px-[34px] py-[15px] rounded-full text-base font-bold cursor-pointer transition-all duration-200 hover:bg-white/85"
          >
            ✨ Join as Companion
          </button>
        </div>
      </Reveal>
      <style>{`
        @keyframes sway {
          0%,100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
      `}</style>
    </section>
  );
}

export default CTA;