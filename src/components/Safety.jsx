// components/Safety.js
import React, { useState } from 'react';
import Reveal from './Reveal';
import SectionTag from './SectionTag';

function SafetyCard({ icon, title, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div 
      onMouseOver={() => setHov(true)} 
      onMouseOut={() => setHov(false)} 
      className="border border-white/15 rounded-2xl p-8 transition-all duration-300"
      style={{
        background: hov ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)',
        transform: hov ? 'translateY(-6px)' : 'none'
      }}
    >
      <div className="text-[2.4rem] mb-[18px]">{icon}</div>
      <h3 className="text-[1.05rem] mb-2.5 text-white">{title}</h3>
      <p className="text-[0.85rem] text-white/60 leading-[1.65]">{desc}</p>
    </div>
  );
}

function Safety() {
  const items = [
    { icon: "✅", title: "Verified Profiles", desc: "Every companion undergoes thorough identity and background verification before joining our platform." },
    { icon: "🔐", title: "Secure Payments", desc: "All transactions are encrypted and processed through certified payment gateways." },
    { icon: "🛡️", title: "Privacy Protection", desc: "Your personal information is never shared without consent. Communicate safely through in-app messaging." },
    { icon: "📋", title: "Community Guidelines", desc: "Strictly social companionship only. Governed by clear codes of conduct and zero-tolerance policies." },
    { icon: "🚨", title: "Reporting System", desc: "Our 24/7 safety team is always available. Report any concerns and we'll respond immediately." },
    { icon: "⭐", title: "Mutual Reviews", desc: "Both companions and clients rate each experience, keeping our community accountable and excellent." },
  ];
  
  return (
    <section className="py-[100px] px-[6%] bg-linear-to-r from-[#1a0e2e] to-[#2d1b4e] rounded-[40px] mx-[3%] text-white">
      <Reveal>
        <div className="mb-[60px]">
          <SectionTag light>Your Safety First</SectionTag>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] text-white my-4 leading-[1.25]">
            Built on <span className="text-[#f2a0b0]">Trust</span> & Safety
          </h2>
          <p className="text-white/65 max-w-[540px] leading-[1.7]">
            Every feature of Companion Connect is designed with your safety, privacy, and comfort in mind.
          </p>
        </div>
      </Reveal>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-6">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <SafetyCard {...item} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <div className="mt-10 bg-white/7 border border-white/15 rounded-[20px] p-6 flex gap-3.5 items-start max-w-[620px]">
          <span className="text-[1.8rem]">⚠️</span>
          <p className="text-[0.85rem] text-white/70 leading-[1.6] m-0">
            <strong className="text-white">Important:</strong> Companion Connect is a strictly professional social companionship platform. Any form of inappropriate, illegal, or adult content is absolutely prohibited and will result in immediate account termination and legal action.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

export default Safety;