// components/SectionTag.js
import React from 'react';

function SectionTag({ children, light }) {
  return (
    <div 
      className={`inline-block text-[0.78rem] font-bold tracking-[0.1em] uppercase px-[18px] py-[6px] rounded-full mb-4 ${
        light 
          ? 'bg-white/12 text-[#e5b8ff] border border-white/20' 
          : 'bg-gradient-to-r from-[rgba(232,121,160,0.15)] to-[rgba(179,85,224,0.15)] text-[#5e3d8c] border border-[rgba(179,85,224,0.2)]'
      }`}
    >
      {children}
    </div>
  );
}

export default SectionTag;