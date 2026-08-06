import React from 'react';

/**
 * CENÁRIO ARCANO ANIMADO (A12) — fundo de campo de batalha.
 * Agora utiliza uma arte PNG real pré-renderizada, 
 * removendo completamente a geometria feita em canvas.
 */
export const ArcaneField: React.FC<{ className?: string; density?: number }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden bg-[#070b16] ${className}`}>
        <img 
            src="/assets/sprites/bg_arcane_field.jpg" 
            alt="Arcane Field Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
        />
        
        {/* Névoa Animada em CSS ao invés de Canvas */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1326] to-transparent opacity-80" />
        <div 
            className="absolute inset-0 bg-eclipsia mix-blend-overlay"
            style={{ animation: 'twinkle 8s ease-in-out infinite alternate' }}
        />
    </div>
  );
};

export default ArcaneField;
