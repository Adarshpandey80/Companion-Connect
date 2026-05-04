// components/HowItWorks.js
import React, { useState } from 'react';
import Reveal from './Reveal';
import SectionTag from './SectionTag';

function StepCard({ n, icon, title, desc, animDelay }) {
  const [hov, setHov] = useState(false);
  return (
    <div 
      onMouseOver={() => setHov(true)} 
      onMouseOut={() => setHov(false)} 
      className="bg-white/45 border border-white/70 backdrop-blur-[14px] rounded-[28px] p-9 text-center shadow-[0_8px_40px_rgba(94,61,140,0.12)] transition-all duration-300 relative overflow-hidden"
      style={{ transform: hov ? 'translateY(-8px)' : 'none', boxShadow: hov ? '0 20px 60px rgba(94,61,140,0.22)' : '0 8px 40px rgba(94,61,140,0.12)' }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0) 40%,rgba(255,255,255,.5) 100%)' }} />
      <div className="font-['Playfair_Display',serif] text-[3.5rem] font-bold bg-linear-to-r from-[#f2a0b0] to-[#d5a8f0] bg-clip-text text-transparent leading-none mb-4">{n}</div>
      <div 
        className="text-[2.4rem] mb-4 inline-block"
        style={{ animation: `bounce 2.5s ease-in-out ${-animDelay}s infinite` }}
      >
        {icon}
      </div>
      <h3 className="text-[1.1rem] mb-2.5">{title}</h3>
      <p className="text-[0.88rem] text-[#8a7499] leading-[1.6]">{desc}</p>
      <style>{`
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
      `}</style>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", icon: "🔍", title: "Browse Profiles", desc: "Explore our diverse community of verified companions. Filter by interests, location, and availability." },
    { n: "02", icon: "⭐", title: "Choose Your Match", desc: "Read reviews, compare ratings, view services and pricing to find your ideal companion." },
    { n: "03", icon: "📅", title: "Book Instantly", desc: "Confirm your booking in seconds with our secure payment system. Get confirmation immediately." },
    { n: "04", icon: "🎉", title: "Enjoy Together", desc: "Meet your companion and have a wonderful, memorable experience. Rate and review afterward!" },
  ];
  
  return (
    <section className="py-[100px] px-[6%] bg-linear-to-br from-[#f9f1ff] via-[#fff5f8] to-[#f0f8ff] rounded-[40px] mx-[3%]">
      <Reveal>
        <div className="text-center mb-[60px]">
          <SectionTag>How It Works</SectionTag>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] text-[#2d1b4e] my-4 leading-[1.25]">
            Three Simple Steps to <span className="text-[#e879a0]">Great Company</span>
          </h2>
          <p className="text-[#8a7499] max-w-[520px] mx-auto leading-[1.7]">
            From browsing to booking — it's effortless. We've made finding the perfect companion as easy as a few taps.
          </p>
        </div>
      </Reveal>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-7">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1}>
            <StepCard {...s} animDelay={i * 0.8} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;