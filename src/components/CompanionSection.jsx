// components/CompanionsSection.js
import React, { useState } from 'react';
import Reveal from './Reveal';
import SectionTag from './SectionTag';
import { COMPANIONS } from '../data/companions';

function CompanionCard({ c, onOpen, onHire }) {
  const [hov, setHov] = useState(false);
  
  const handleHireClick = (e) => {
    e.stopPropagation();
    onHire && onHire(c);
  };
  
  return (
    <div 
      onMouseOver={() => setHov(true)} 
      onMouseOut={() => setHov(false)} 
      onClick={() => onOpen(c)}
      className="bg-white rounded-[28px] overflow-hidden cursor-pointer transition-all duration-300"
      style={{ 
        boxShadow: hov ? '0 20px 60px rgba(94,61,140,0.22)' : '0 8px 40px rgba(94,61,140,0.12)',
        transform: hov ? 'translateY(-10px) scale(1.02)' : 'none'
      }}
    >
      <div className="relative h-[200px] bg-gradient-to-r from-[#f3e5fb] to-[#fce4ec] flex items-center justify-center overflow-hidden">
        <span 
          className="text-5xl transition-transform duration-300"
          style={{ transform: hov ? 'scale(1.08)' : 'scale(1)' }}
        >
          {c.emoji}
        </span>
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[rgba(45,27,78,0.55)] via-transparent to-transparent transition-opacity duration-300"
          style={{ opacity: hov ? 1 : 0 }}
        />
        <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-[8px] rounded-full px-3 py-1.25 text-[0.72rem] font-bold text-[#5e3d8c] flex items-center gap-1.25">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] inline-block" /> Verified
        </div>
        <div className="absolute top-3.5 right-3.5 bg-gradient-to-r from-[#e879a0] to-[#b355e0] text-white rounded-full px-3.5 py-1.25 text-[0.8rem] font-bold">
          ₹{c.price}/hr
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[1.1rem] font-bold text-[#2d1b4e]">{c.name.split(" ")[0]}, {c.age}</span>
          <span className="text-[0.82rem] font-semibold text-[#5e3d8c]">⭐ {c.rating}</span>
        </div>
        <div className="text-[0.8rem] text-[#9478ab] mb-3">{c.role} · {c.location}</div>
        <div className="flex gap-1.5 flex-wrap mb-4">
          {c.tags.map(t => (
            <span key={t} className="text-[0.7rem] font-semibold px-2.5 py-[3px] rounded-full bg-[#f4eeff] text-[#5e3d8c]">
              {t}
            </span>
          ))}
        </div>
        <button 
          onClick={handleHireClick}
          className="w-full py-3 bg-gradient-to-r from-[#e879a0] to-[#b355e0] text-white border-none rounded-[14px] text-[0.9rem] font-bold cursor-pointer"
        >
          Hire Now
        </button>
      </div>
    </div>
  );
}

function CompanionsSection({ onOpen, onHire }) {
  const [filter, setFilter] = useState({ gender: "All", city: "Any", interest: "", rating: 0, price: 3000 });
  
  const filtered = COMPANIONS.filter(c => {
    if (filter.gender !== "All" && c.gender !== filter.gender) return false;
    if (filter.city !== "Any" && c.location !== filter.city) return false;
    if (filter.interest && !c.tags.some(t => t.toLowerCase().includes(filter.interest.toLowerCase()))) return false;
    if (c.rating < filter.rating) return false;
    if (c.price > filter.price) return false;
    return true;
  });

  return (
    <section id="companions" className="py-[100px] px-[6%]">
      <Reveal>
        <div className="mb-[60px]">
          <SectionTag>Featured Companions</SectionTag>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] text-[#2d1b4e] my-4 leading-[1.25]">
            Meet Our <span className="text-[#e879a0]">Wonderful</span> Companions
          </h2>
          <p className="text-[#8a7499] max-w-[540px] leading-[1.7]">
            All companions are verified, background-checked, and committed to providing safe, enjoyable social experiences.
          </p>
        </div>
      </Reveal>
      {filtered.length === 0 && (
        <div className="text-center py-[60px] text-[#9478ab] text-[1.1rem]">
          😕 No companions match your filters. Try adjusting the search!
        </div>
      )}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(255px,1fr))] gap-7">
        {filtered.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.05}>
            <CompanionCard c={c} onOpen={onOpen} onHire={onHire} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default CompanionsSection;