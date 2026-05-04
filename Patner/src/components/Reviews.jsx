// components/Reviews.js
import React, { useState } from 'react';
import Reveal from './Reveal';
import SectionTag from './SectionTag';
import { REVIEWS } from '../data/reviews';

function ReviewCard({ r }) {
  const [hov, setHov] = useState(false);
  return (
    <div 
      onMouseOver={() => setHov(true)} 
      onMouseOut={() => setHov(false)} 
      className="bg-white rounded-2xl p-7 shadow-[0_8px_40px_rgba(94,61,140,0.1)] transition-transform duration-300 relative"
      style={{ transform: hov ? 'translateY(-6px)' : 'none' }}
    >
      <div className="absolute top-4 right-6 font-['Playfair_Display',serif] text-6xl text-[#f2a0b0] opacity-35 leading-none">"</div>
      <div className="flex items-center gap-3.5 mb-3.5">
        <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-[1.4rem] bg-linear-to-r from-[#f3e5fb] to-[#fce4ec] shrink-0">
          {r.emoji}
        </div>
        <div>
          <div className="font-bold text-[0.92rem]">{r.name}</div>
          <div className="text-[0.78rem] text-[#9478ab]">📍 {r.city} · Hired {r.companion}</div>
        </div>
      </div>
      <div className="text-[#f7c873] tracking-[1px]">{'★'.repeat(r.stars)}</div>
      <p className="text-[0.88rem] text-[#6b5b7a] leading-[1.7] mt-3">{r.text}</p>
    </div>
  );
}

function Reviews() {
  return (
    <section className="py-[100px] px-[6%] bg-linear-to-br from-[#fff5f8] to-[#f7f0ff]">
      <Reveal>
        <div className="text-center mb-[60px]">
          <SectionTag>Real Experiences</SectionTag>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] text-[#2d1b4e] my-4 leading-[1.25]">
            What Our <span className="text-[#e879a0]">Users Say</span>
          </h2>
          <p className="text-[#8a7499] max-w-[520px] mx-auto leading-[1.7]">
            Thousands of happy clients have found wonderful companions through our platform.
          </p>
        </div>
      </Reveal>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-6">
        {REVIEWS.map((r, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <ReviewCard r={r} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Reviews;