const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const spritesDir = path.join(__dirname, '..', 'client', 'public', 'assets', 'sprites');

const ELEMENTS = {
    'fire': { main: '#ef4444', glow: '#f87171', core: '#fca5a5' },
    'water': { main: '#3b82f6', glow: '#60a5fa', core: '#93c5fd' },
    'earth': { main: '#22c55e', glow: '#4ade80', core: '#86efac' },
    'wind': { main: '#06b6d4', glow: '#22d3ee', core: '#67e8f9' },
    'dark': { main: '#9333ea', glow: '#a855f7', core: '#c084fc' },
    'light': { main: '#eab308', glow: '#facc15', core: '#fde047' },
    'neutral': { main: '#64748b', glow: '#94a3b8', core: '#cbd5e1' }
};

function makePoly(cx, cy, radius, sides, offsetAngle=0) {
    let pts = [];
    for(let i=0; i<sides; i++) {
        let angle = offsetAngle + (i * 2 * Math.PI / sides);
        let x = (cx + radius * Math.cos(angle)).toFixed(2);
        let y = (cy + radius * Math.sin(angle)).toFixed(2);
        pts.push(`${x},${y}`);
    }
    return pts.join(' ');
}

function generateGlyphSVG(elName, colors, tier) {
    const cx = 256;
    const cy = 256;
    let defs = `
        <defs>
            <radialGradient id="aura_${elName}_${tier}" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="${colors.core}" stop-opacity="0.8"/>
                <stop offset="30%" stop-color="${colors.glow}" stop-opacity="0.4"/>
                <stop offset="100%" stop-color="${colors.main}" stop-opacity="0"/>
            </radialGradient>
            <filter id="glow_${elName}_${tier}" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            <filter id="lightGlow_${elName}_${tier}" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
    `;
    
    let content = '';
    
    if (tier === 't3' || tier === 't2') {
        let r = tier === 't3' ? 220 : 180;
        content += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#aura_${elName}_${tier})" />`;
    }
    if (tier === 'sprint') {
        content += `<circle cx="${cx}" cy="${cy}" r="150" fill="url(#aura_${elName}_${tier})" opacity="0.5"/>`;
    }
    
    const strokeProps = `stroke="${colors.glow}" fill="none"`;
    
    if (tier === 't1') {
        content += `
            <circle cx="${cx}" cy="${cy}" r="140" ${strokeProps} stroke-width="4" stroke-dasharray="15 10" filter="url(#lightGlow_${elName}_${tier})"/>
            <circle cx="${cx}" cy="${cy}" r="130" ${strokeProps} stroke-width="2" opacity="0.5"/>
            <polygon points="${makePoly(cx, cy, 110, 4)}" ${strokeProps} stroke-width="3" filter="url(#lightGlow_${elName}_${tier})"/>
            <circle cx="${cx}" cy="${cy}" r="40" fill="${colors.main}" opacity="0.4" filter="url(#lightGlow_${elName}_${tier})"/>
        `;
    } else if (tier === 't2') {
        content += `
            <circle cx="${cx}" cy="${cy}" r="160" ${strokeProps} stroke-width="6" filter="url(#glow_${elName}_${tier})"/>
            <circle cx="${cx}" cy="${cy}" r="145" ${strokeProps} stroke-width="2" stroke-dasharray="4 8"/>
            <circle cx="${cx}" cy="${cy}" r="130" ${strokeProps} stroke-width="4" opacity="0.8"/>
            
            <polygon points="${makePoly(cx, cy, 130, 3, -Math.PI/2)}" ${strokeProps} stroke-width="4" filter="url(#lightGlow_${elName}_${tier})"/>
            <polygon points="${makePoly(cx, cy, 130, 3, Math.PI/2)}" ${strokeProps} stroke-width="4" filter="url(#lightGlow_${elName}_${tier})"/>
            
            <circle cx="${cx}" cy="${cy}" r="60" stroke="${colors.glow}" stroke-width="3" fill="${colors.main}" fill-opacity="0.2"/>
            <circle cx="${cx}" cy="${cy}" r="20" fill="${colors.core}" filter="url(#glow_${elName}_${tier})"/>
        `;
    } else if (tier === 't3') {
        content += `
            <circle cx="${cx}" cy="${cy}" r="190" ${strokeProps} stroke-width="8" filter="url(#glow_${elName}_${tier})"/>
            <circle cx="${cx}" cy="${cy}" r="175" ${strokeProps} stroke-width="3" stroke-dasharray="12 12 4 12" filter="url(#lightGlow_${elName}_${tier})"/>
            <circle cx="${cx}" cy="${cy}" r="160" ${strokeProps} stroke-width="4" opacity="0.9"/>
            
            <polygon points="${makePoly(cx, cy, 160, 4, 0)}" ${strokeProps} stroke-width="4" filter="url(#lightGlow_${elName}_${tier})"/>
            <polygon points="${makePoly(cx, cy, 160, 4, Math.PI/4)}" ${strokeProps} stroke-width="4" filter="url(#lightGlow_${elName}_${tier})"/>
            
            <polygon points="${makePoly(cx, cy, 90, 8, Math.PI/8)}" fill="${colors.main}" fill-opacity="0.3" stroke="${colors.glow}" stroke-width="2"/>
            
            <circle cx="${cx}" cy="${cy}" r="80" ${strokeProps} stroke-width="4" stroke-dasharray="2 6"/>
            
            <circle cx="${cx}" cy="${cy - 175}" r="12" fill="${colors.core}" filter="url(#glow_${elName}_${tier})"/>
            <circle cx="${cx}" cy="${cy + 175}" r="12" fill="${colors.core}" filter="url(#glow_${elName}_${tier})"/>
            <circle cx="${cx - 175}" cy="${cy}" r="12" fill="${colors.core}" filter="url(#glow_${elName}_${tier})"/>
            <circle cx="${cx + 175}" cy="${cy}" r="12" fill="${colors.core}" filter="url(#glow_${elName}_${tier})"/>
            
            <circle cx="${cx}" cy="${cy}" r="35" fill="${colors.core}" filter="url(#glow_${elName}_${tier})"/>
            <circle cx="${cx}" cy="${cy}" r="15" fill="#ffffff" filter="url(#glow_${elName}_${tier})"/>
        `;
    } else if (tier === 'sprint') {
        content += `
            <circle cx="${cx}" cy="${cy}" r="170" stroke="${colors.core}" stroke-width="2" fill="none" filter="url(#lightGlow_${elName}_${tier})"/>
            <circle cx="${cx}" cy="${cy}" r="155" stroke="${colors.main}" stroke-width="1" fill="none" opacity="0.6"/>
            
            <path d="M${cx} ${cy-180} L${cx+20} ${cy-40} L${cx+180} ${cy} L${cx+20} ${cy+40} L${cx} ${cy+180} L${cx-20} ${cy+40} L${cx-180} ${cy} L${cx-20} ${cy-40} Z" fill="none" stroke="${colors.core}" stroke-width="2" filter="url(#glow_${elName}_${tier})"/>
            <path d="M${cx} ${cy-180} L${cx+20} ${cy-40} L${cx+180} ${cy} L${cx+20} ${cy+40} L${cx} ${cy+180} L${cx-20} ${cy+40} L${cx-180} ${cy} L${cx-20} ${cy-40} Z" fill="${colors.main}" fill-opacity="0.1"/>
            
            <circle cx="${cx}" cy="${cy}" r="12" fill="#ffffff" filter="url(#glow_${elName}_${tier})"/>
        `;
    }
    
    return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">${defs}${content}</svg>`;
}

async function run() {
    const TIERS = ['t2', 't3'];
    for (const [el, colors] of Object.entries(ELEMENTS)) {
        for (const tier of TIERS) {
            const svg = generateGlyphSVG(el, colors, tier);
            try {
                await sharp(Buffer.from(svg))
                    .png()
                    .toFile(path.join(spritesDir, `oh_glyph_${el}_${tier}.png`));
                console.log(`Generated oh_glyph_${el}_${tier}.png`);
            } catch(e) {
                console.error(`Failed oh_glyph_${el}_${tier}.png:`, e);
            }
        }
    }
}

run();
