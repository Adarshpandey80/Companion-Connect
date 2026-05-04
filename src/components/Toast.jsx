// components/Toast.js
import React from 'react';

function Toast({ message, visible }) {
  return (
    <div 
      className="fixed bottom-[30px] right-[30px] z-[9999] bg-white rounded-[18px] px-6 py-4 shadow-[0_8px_40px_rgba(45,27,78,0.22)] flex items-center gap-3 text-[0.9rem] font-semibold text-[#2d1b4e] pointer-events-none"
      style={{
        animation: visible 
          ? 'toastIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' 
          : 'toastOut 0.3s ease forwards'
      }}
    >
      <span className="text-[1.4rem]">🎉</span>
      {message}
      <style>{`
        @keyframes toastIn {
          from { transform: translateY(80px); opacity: 0; }
          to { transform: none; opacity: 1; }
        }
        @keyframes toastOut {
          from { transform: none; opacity: 1; }
          to { transform: translateY(80px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default Toast;