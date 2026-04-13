// components/FilterSection.js
import React, { useState } from 'react';
import Reveal from './Reveal';
import SectionTag from './SectionTag';

function FilterGroup({ label, children }) {
  return (
    <div>
      <label className="block text-[0.78rem] font-bold text-white/65 tracking-[0.08em] uppercase mb-3">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Pill({ children, active, onClick }) {
  const [hov, setHov] = useState(false);
  const isActive = active || hov;
  return (
    <button
      onClick={onClick}
      onMouseOver={() => setHov(true)}
      onMouseOut={() => setHov(false)}
      className="px-[18px] py-2 rounded-full border transition-all duration-200 text-[0.8rem] font-medium cursor-pointer"
      style={{
        background: isActive ? 'linear-gradient(135deg,#e879a0,#b355e0)' : 'rgba(255,255,255,0.07)',
        color: isActive ? '#fff' : 'rgba(255,255,255,0.8)',
        borderColor: isActive ? 'transparent' : 'rgba(255,255,255,0.2)',
        transform: isActive ? 'scale(1.04)' : 'none'
      }}
    >
      {children}
    </button>
  );
}

function FilterSection({ onShowToast }) {
  const [gender, setGender] = useState("All");
  const [city, setCity] = useState("Any");
  const [interests, setInterests] = useState([]);
  const [rating, setRating] = useState("Any");
  const [price, setPrice] = useState(1500);

  const toggleInterest = (i) => setInterests(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
  const reset = () => { setGender("All"); setCity("Any"); setInterests([]); setRating("Any"); setPrice(1500); };

  return (
    <section className="py-[100px] px-[6%] bg-gradient-to-r from-[#2d1b4e] to-[#5e3d8c] rounded-[40px] mx-[3%] text-white">
      <Reveal>
        <div className="mb-[50px]">
          <SectionTag light>Advanced Search</SectionTag>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] text-white my-4 leading-[1.25]">
            Find Your <span className="text-[#f2a0b0]">Perfect Match</span>
          </h2>
          <p className="text-white/65 max-w-[540px] leading-[1.7]">
            Use our smart filters to discover companions who perfectly fit your needs and preferences.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="bg-white/8 border border-white/15 backdrop-blur-[20px] rounded-[28px] p-10">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-7">
            <FilterGroup label="Gender">
              {["All", "Female", "Male"].map(g => (
                <Pill key={g} active={gender === g} onClick={() => setGender(g)}>{g}</Pill>
              ))}
            </FilterGroup>
            <FilterGroup label="City">
              {["Any", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune", "Chennai", "Jaipur"].map(c => (
                <Pill key={c} active={city === c} onClick={() => setCity(c)}>{c}</Pill>
              ))}
            </FilterGroup>
            <FilterGroup label="Interests">
              {["🛍️ Shopping", "✈️ Travel", "🎬 Movies", "🍽️ Dining", "🎭 Events", "🏃 Fitness"].map(i => {
                const key = i.split(" ")[1];
                return (
                  <Pill key={i} active={interests.includes(key)} onClick={() => toggleInterest(key)}>
                    {i}
                  </Pill>
                );
              })}
            </FilterGroup>
            <FilterGroup label="Min Rating">
              {["Any", "4.0+", "4.5+", "5.0"].map(r => (
                <Pill key={r} active={rating === r} onClick={() => setRating(r)}>{r}</Pill>
              ))}
            </FilterGroup>
            <div className="col-span-2">
              <label className="block text-[0.78rem] font-bold text-white/65 tracking-[0.08em] uppercase mb-3">
                Price Range — up to ₹{price.toLocaleString("en-IN")}/hr
              </label>
              <input 
                type="range" 
                min="200" 
                max="3000" 
                value={price} 
                step="100" 
                onChange={e => setPrice(+e.target.value)}
                className="w-full accent-[#e879a0] h-1"
              />
              <div className="flex justify-between text-[0.75rem] text-white/55 mt-2">
                <span>₹200</span><span>₹3000</span>
              </div>
            </div>
          </div>
          <div className="mt-8 flex gap-3.5 flex-wrap">
            <button 
              onClick={() => onShowToast("🔍 Filtering companions...")} 
              className="bg-gradient-to-r from-[#e879a0] to-[#b355e0] text-white border-none px-8 py-[13px] rounded-full text-[0.9rem] font-bold cursor-pointer shadow-[0_4px_16px_rgba(232,121,160,0.35)] transition-transform duration-200 hover:translate-y-[-2px]"
            >
              Apply Filters
            </button>
            <button 
              onClick={reset} 
              className="bg-transparent text-white/60 border border-white/20 px-7 py-[13px] rounded-full text-[0.9rem] font-semibold cursor-pointer transition-all duration-200 hover:text-white hover:border-white/50"
            >
              Reset All
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default FilterSection;