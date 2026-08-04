import React, { memo } from 'react';

const DUST_COUNT = 30;

export const AmbientDust = memo(() => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden mix-blend-screen">
      {Array.from({ length: DUST_COUNT }).map((_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 3 + Math.random() * 5;
        const delay = Math.random() * 5;
        const size = 1 + Math.random() * 3;

        return (
          <div
            key={i}
            className="absolute rounded-full bg-gold-200 opacity-0 animate-twinkle"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              boxShadow: '0 0 6px 1px rgba(240, 192, 74, 0.4)'
            }}
          />
        );
      })}
    </div>
  );
});
