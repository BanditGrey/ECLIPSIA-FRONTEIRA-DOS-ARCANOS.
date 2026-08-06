const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const spritesDir = path.join(root, 'client', 'public', 'assets', 'sprites');

const sigils = {
  blade: `
    <path d="M50 12 L50 54" fill="none" stroke="url(#gold)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M50 8 L56 22 L50 32 L44 22 Z" fill="url(#gold)" stroke="none" />
    <path d="M30 48 L70 48" fill="none" stroke="url(#gold)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="30" cy="48" r="3" fill="url(#gold)" stroke="none" />
    <circle cx="70" cy="48" r="3" fill="url(#gold)" stroke="none" />
    <path d="M50 54 L50 70" fill="none" stroke="url(#gold)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="50" cy="78" r="5" fill="url(#gold)" stroke="none" />
    <path d="M50 62 L38 70 M50 62 L62 70" fill="none" stroke="url(#gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  arcane: `
    <circle cx="50" cy="50" r="15" fill="none" stroke="url(#gold)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M50 36 L58 50 L50 64 L42 50 Z" fill="url(#gold)" stroke="none" />
    <ellipse cx="50" cy="50" rx="33" ry="11" fill="none" stroke="url(#gold)" stroke-width="2.5" transform="rotate(-22 50 50)" />
    <ellipse cx="50" cy="50" rx="11" ry="33" fill="none" stroke="url(#gold)" stroke-width="2.5" transform="rotate(24 50 50)" />
    <circle cx="78" cy="32" r="3.5" fill="#3fd9c4" stroke="none" />
    <circle cx="26" cy="68" r="3.5" fill="#3fd9c4" stroke="none" />
  `,
  druid: `
    <path d="M50 86 C 18 62 22 28 50 12 C 78 28 82 62 50 86 Z" fill="none" stroke="url(#gold)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M50 82 L50 22" fill="none" stroke="url(#gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M50 64 L36 52 M50 46 L64 36" fill="none" stroke="url(#gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="40" cy="84" r="3" fill="#86efac" stroke="none" />
    <circle cx="60" cy="84" r="3" fill="#86efac" stroke="none" />
  `,
  vanguard: `
    <path d="M50 10 L82 22 L82 52 C 82 72 68 86 50 94 C 32 86 18 72 18 52 L18 22 Z" fill="none" stroke="url(#gold)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M36 46 L50 60 L64 46" fill="none" stroke="url(#gold)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M50 60 L50 80" fill="none" stroke="url(#gold)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="50" cy="86" r="3" fill="#f87171" stroke="none" />
  `,
  ranger: `
    <path d="M20 18 C 8 52 20 84 42 94" fill="none" stroke="url(#gold)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M80 18 C 92 52 80 84 58 94" fill="none" stroke="url(#gold)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M24 24 L76 24" fill="none" stroke="url(#gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M34 68 L68 40" fill="none" stroke="url(#gold)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M68 40 L58 42 L64 32 Z" fill="url(#gold)" stroke="none" />
    <path d="M34 68 L26 74 M34 68 L30 78" fill="none" stroke="url(#gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  spectre: `
    <path d="M26 26 L50 50" fill="none" stroke="url(#gold)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M74 26 L50 50" fill="none" stroke="url(#gold)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="50" cy="50" r="6.5" fill="none" stroke="url(#gold)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M50 56 L62 72 M50 56 L38 72" fill="none" stroke="url(#gold)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M40 14 q4 -6 8 0 q4 6 8 0" fill="none" stroke="url(#gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  `
};

async function generateSigils() {
  for (const [name, content] of Object.entries(sigils)) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="gold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbe8b7" />
            <stop offset="55%" stopColor="#f0c04a" />
            <stop offset="100%" stopColor="#b57f1c" />
          </linearGradient>
          <radialGradient id="disc" cx="50%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#1c2948" />
            <stop offset="60%" stopColor="#0c1326" />
            <stop offset="100%" stopColor="#070b16" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#disc)" />
        <circle cx="50" cy="50" r="44" fill="none" stroke="url(#gold)" stroke-width="1.6" opacity="0.75" />
        <circle cx="50" cy="50" r="39.5" fill="none" stroke="url(#gold)" stroke-width="0.8" opacity="0.4" stroke-dasharray="2 5" />
        ${content}
      </svg>
    `;
    
    try {
      await sharp(Buffer.from(svg))
        .png()
        .toFile(path.join(spritesDir, `sigil_${name}.png`));
      console.log(`Generated sigil_${name}.png`);
    } catch (e) {
      console.error(`Failed ${name}:`, e.message);
    }
  }
}

generateSigils();
