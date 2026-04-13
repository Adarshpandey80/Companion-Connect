// components/Reveal.js
import React, { useRef, useState, useEffect } from 'react';

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        obs.unobserve(el);
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, dir = "up", style = {} }) {
  const [ref, visible] = useScrollReveal();
  const transforms = { up: "translateY(36px)", left: "translateX(-40px)", right: "translateX(40px)" };
  return (
    <div 
      ref={ref} 
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[dir],
        transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
        ...style
      }}
    >
      {children}
    </div>
  );
}

export default Reveal;