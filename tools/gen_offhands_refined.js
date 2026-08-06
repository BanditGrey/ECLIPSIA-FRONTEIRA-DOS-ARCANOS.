const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const spritesDir = path.join(__dirname, '..', 'client', 'public', 'assets', 'sprites');

const ELEMENTS = {
    'fire': { c: '#ef4444', glow: '#fca5a5' },
    'water': { c: '#3b82f6', glow: '#93c5fd' },
    'earth': { c: '#22c55e', glow: '#86efac' },
    'wind': { c: '#06b6d4', glow: '#67e8f9' },
    'dark': { c: '#a855f7', glow: '#d8b4fe' },
    'light': { c: '#eab308', glow: '#fde047' },
    'neutral': { c: '#94a3b8', glow: '#cbd5e1' }
};

const TIERS = ['t1', 't2', 't3', 'sprint'];

// Shield SVG generation
const shieldSVGs = {
    t1: `
        <defs>
            <linearGradient id="sh_t1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#cbd5e1"/>
                <stop offset="100%" stop-color="#475569"/>
            </linearGradient>
        </defs>
        <path d="M128 20 L230 60 V150 C230 220 160 270 128 290 C96 270 26 220 26 150 V60 Z" fill="url(#sh_t1)" stroke="#334155" stroke-width="6"/>
        <path d="M128 60 L190 90 V170 C190 210 150 240 128 250 C106 240 66 210 66 170 V90 Z" fill="#1e293b" opacity="0.6"/>
        <path d="M128 100 L160 120 V170 C160 190 140 210 128 220 C116 210 96 190 96 170 V120 Z" fill="#94a3b8"/>
    `,
    t2: `
        <defs>
            <linearGradient id="sh_t2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#93c5fd"/>
                <stop offset="100%" stop-color="#1e3a8a"/>
            </linearGradient>
        </defs>
        <path d="M128 20 L230 60 V150 C230 220 160 270 128 290 C96 270 26 220 26 150 V60 Z" fill="url(#sh_t2)" stroke="#1e40af" stroke-width="6"/>
        <path d="M128 60 L190 90 V170 C190 210 150 240 128 250 C106 240 66 210 66 170 V90 Z" fill="#0f172a" opacity="0.7"/>
        <path d="M128 100 L160 120 V170 C160 190 140 210 128 220 C116 210 96 190 96 170 V120 Z" fill="#38bdf8" stroke="#7dd3fc" stroke-width="4"/>
    `,
    t3: `
        <defs>
            <linearGradient id="sh_t3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#fef08a"/>
                <stop offset="100%" stop-color="#a16207"/>
            </linearGradient>
        </defs>
        <path d="M128 20 L230 60 V150 C230 220 160 270 128 290 C96 270 26 220 26 150 V60 Z" fill="url(#sh_t3)" stroke="#713f12" stroke-width="8"/>
        <path d="M128 60 L190 90 V170 C190 210 150 240 128 250 C106 240 66 210 66 170 V90 Z" fill="#451a03" opacity="0.8"/>
        <path d="M128 100 L160 120 V170 C160 190 140 210 128 220 C116 210 96 190 96 170 V120 Z" fill="#fde047" stroke="#fef08a" stroke-width="4"/>
        <circle cx="128" cy="160" r="16" fill="#fff" stroke="#facc15" stroke-width="4" filter="drop-shadow(0 0 10px #fef08a)"/>
    `,
    sprint: `
        <defs>
            <linearGradient id="sh_sprint" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#f8fafc"/>
                <stop offset="100%" stop-color="#cbd5e1"/>
            </linearGradient>
        </defs>
        <path d="M128 20 L230 60 V150 C230 220 160 270 128 290 C96 270 26 220 26 150 V60 Z" fill="url(#sh_sprint)" stroke="#94a3b8" stroke-width="4"/>
        <path d="M128 60 L190 90 V170 C190 210 150 240 128 250 C106 240 66 210 66 170 V90 Z" fill="#ffffff" opacity="0.9" stroke="#e2e8f0" stroke-width="2"/>
        <path d="M128 100 L160 120 V170 C160 190 140 210 128 220 C116 210 96 190 96 170 V120 Z" fill="#f1f5f9" stroke="#f8fafc" stroke-width="4"/>
        <circle cx="128" cy="160" r="10" fill="#fde047" opacity="0.6"/>
    `
};

// Glyph SVG generation (Dynamic by color)
function genGlyph(tier, colorInfo) {
    const c = colorInfo.c;
    const g = colorInfo.glow;
    
    if (tier === 't1') {
        return `
            <circle cx="128" cy="128" r="100" fill="none" stroke="${c}" stroke-width="4" opacity="0.6" stroke-dasharray="10 5"/>
            <polygon points="128,48 148,108 208,128 148,148 128,208 108,148 48,128 108,108" fill="${c}" opacity="0.4"/>
            <circle cx="128" cy="128" r="12" fill="${g}"/>
        `;
    }
    if (tier === 't2') {
        return `
            <circle cx="128" cy="128" r="110" fill="none" stroke="${c}" stroke-width="8" opacity="0.8"/>
            <circle cx="128" cy="128" r="90" fill="none" stroke="${g}" stroke-width="2" stroke-dasharray="15 15"/>
            <polygon points="128,48 148,108 208,128 148,148 128,208 108,148 48,128 108,108" fill="${c}" opacity="0.6"/>
            <polygon points="128,68 148,128 208,148 148,168 128,228 108,168 48,148 108,128" fill="${g}" opacity="0.3" transform="rotate(45 128 128)"/>
            <circle cx="128" cy="128" r="18" fill="${g}" filter="drop-shadow(0 0 10px ${c})"/>
        `;
    }
    if (tier === 't3') {
        return `
            <circle cx="128" cy="128" r="110" fill="none" stroke="${c}" stroke-width="12" opacity="0.9" filter="drop-shadow(0 0 15px ${c})"/>
            <circle cx="128" cy="128" r="95" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="20 10 5 10"/>
            <circle cx="128" cy="128" r="75" fill="none" stroke="${g}" stroke-width="2"/>
            
            <polygon points="128,28 158,98 228,128 158,158 128,228 98,158 28,128 98,98" fill="${c}" opacity="0.8"/>
            <polygon points="128,28 158,98 228,128 158,158 128,228 98,158 28,128 98,98" fill="${g}" opacity="0.5" transform="rotate(45 128 128)"/>
            <circle cx="128" cy="128" r="26" fill="#fff" filter="drop-shadow(0 0 20px ${c})"/>
            <!-- Runic dots -->
            <circle cx="128" cy="18" r="6" fill="${g}"/>
            <circle cx="128" cy="238" r="6" fill="${g}"/>
            <circle cx="18" cy="128" r="6" fill="${g}"/>
            <circle cx="238" cy="128" r="6" fill="${g}"/>
        `;
    }
    if (tier === 'sprint') {
        // Clean, subtle, pure energy
        return `
            <circle cx="128" cy="128" r="105" fill="none" stroke="#f8fafc" stroke-width="3" opacity="0.8"/>
            <circle cx="128" cy="128" r="90" fill="none" stroke="${c}" stroke-width="1" opacity="0.5"/>
            <polygon points="128,68 138,118 188,128 138,138 128,188 118,138 68,128 118,118" fill="#fff" opacity="0.9"/>
            <circle cx="128" cy="128" r="10" fill="${c}" filter="drop-shadow(0 0 5px ${g})"/>
        `;
    }
}

async function generate() {
    // Generate Shields
    for (const tier of TIERS) {
        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
            ${shieldSVGs[tier]}
          </svg>
        `;
        try {
            await sharp(Buffer.from(svg)).png().toFile(path.join(spritesDir, `oh_shield_${tier}.png`));
            console.log(`Generated oh_shield_${tier}.png`);
        } catch (e) {
            console.error(`Failed oh_shield_${tier}:`, e.message);
        }
    }
    
    // Generate Glyphs
    for (const [el, colors] of Object.entries(ELEMENTS)) {
        for (const tier of TIERS) {
            const svg = `
              <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
                ${genGlyph(tier, colors)}
              </svg>
            `;
            try {
                await sharp(Buffer.from(svg)).png().toFile(path.join(spritesDir, `oh_glyph_${el}_${tier}.png`));
                console.log(`Generated oh_glyph_${el}_${tier}.png`);
            } catch (e) {
                console.error(`Failed oh_glyph_${el}_${tier}:`, e.message);
            }
        }
    }
}

generate();
