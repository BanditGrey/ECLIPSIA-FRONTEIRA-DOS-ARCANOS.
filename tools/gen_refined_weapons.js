const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const spritesDir = path.join(__dirname, '..', 'client', 'public', 'assets', 'sprites');

const W = 278;
const H = 1175;
const cx = W / 2;

const templates = {
  sword: `
    <defs>
      <linearGradient id="blade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#b0b8c4"/>
        <stop offset="50%" stop-color="#f0f4f8"/>
        <stop offset="100%" stop-color="#8a93a3"/>
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fbe8b7"/>
        <stop offset="50%" stop-color="#a87b1f"/>
        <stop offset="100%" stop-color="#60430a"/>
      </linearGradient>
      <linearGradient id="handle" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#2a1f1a"/>
        <stop offset="50%" stop-color="#4a362a"/>
        <stop offset="100%" stop-color="#1a120e"/>
      </linearGradient>
    </defs>
    <!-- Blade -->
    <path d="M${cx} 120 L${cx+22} 180 L${cx+18} 540 L${cx-18} 540 L${cx-22} 180 Z" fill="url(#blade)" stroke="#5a6271" stroke-width="2"/>
    <path d="M${cx} 120 L${cx} 540" stroke="#fff" stroke-width="2" opacity="0.6"/>
    <!-- Guard -->
    <path d="M${cx-60} 520 L${cx+60} 520 L${cx+70} 545 L${cx-70} 545 Z" fill="url(#gold)" stroke="#3a2809" stroke-width="2"/>
    <!-- Handle -->
    <rect x="${cx-12}" y="545" width="24" height="100" rx="4" fill="url(#handle)" stroke="#1a120e" stroke-width="2"/>
    <path d="M${cx-12} 560 L${cx+12} 570 M${cx-12} 580 L${cx+12} 590 M${cx-12} 600 L${cx+12} 610 M${cx-12} 620 L${cx+12} 630" stroke="#fbe8b7" stroke-width="1.5" opacity="0.4"/>
    <!-- Pommel -->
    <circle cx="${cx}" cy="655" r="16" fill="url(#gold)" stroke="#3a2809" stroke-width="2"/>
    <circle cx="${cx}" cy="655" r="6" fill="#1c2948"/>
  `,
  greatsword: `
    <defs>
      <linearGradient id="gs_blade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#8a93a3"/>
        <stop offset="25%" stop-color="#f0f4f8"/>
        <stop offset="75%" stop-color="#d8dde6"/>
        <stop offset="100%" stop-color="#5a6271"/>
      </linearGradient>
      <linearGradient id="gs_gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f0c04a"/>
        <stop offset="100%" stop-color="#60430a"/>
      </linearGradient>
    </defs>
    <!-- Blade -->
    <path d="M${cx} 50 L${cx+38} 120 L${cx+32} 530 L${cx-32} 530 L${cx-38} 120 Z" fill="url(#gs_blade)" stroke="#3a404c" stroke-width="3"/>
    <path d="M${cx-10} 120 L${cx-10} 530 M${cx+10} 120 L${cx+10} 530" stroke="#1c2948" stroke-width="2" opacity="0.3"/>
    <!-- Guard -->
    <path d="M${cx-80} 500 L${cx+80} 500 L${cx+90} 540 L${cx-90} 540 Z" fill="url(#gs_gold)" stroke="#3a2809" stroke-width="2"/>
    <!-- Handle -->
    <rect x="${cx-16}" y="540" width="32" height="140" rx="6" fill="#2a1f1a" stroke="#1a120e" stroke-width="2"/>
    <rect x="${cx-18}" y="600" width="36" height="15" fill="url(#gs_gold)"/>
    <!-- Pommel -->
    <polygon points="${cx},680 ${cx+25},720 ${cx},740 ${cx-25},720" fill="url(#gs_gold)" stroke="#3a2809" stroke-width="2"/>
  `,
  dagger: `
    <defs>
      <linearGradient id="dg_blade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#b0b8c4"/>
        <stop offset="50%" stop-color="#fff"/>
        <stop offset="100%" stop-color="#8a93a3"/>
      </linearGradient>
    </defs>
    <path d="M${cx} 360 L${cx+18} 400 L${cx+14} 580 L${cx-14} 580 L${cx-18} 400 Z" fill="url(#dg_blade)" stroke="#5a6271" stroke-width="2"/>
    <path d="M${cx} 360 L${cx} 580" stroke="#fff" stroke-width="2"/>
    <path d="M${cx-35} 570 L${cx+35} 570 L${cx+40} 585 L${cx-40} 585 Z" fill="#a87b1f" stroke="#3a2809" stroke-width="2"/>
    <rect x="${cx-10}" y="585" width="20" height="65" rx="3" fill="#4a362a" stroke="#1a120e" stroke-width="2"/>
    <circle cx="${cx}" cy="660" r="12" fill="#a87b1f" stroke="#3a2809" stroke-width="2"/>
  `,
  spear: `
    <defs>
      <linearGradient id="sp_blade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#b0b8c4"/>
        <stop offset="50%" stop-color="#fff"/>
        <stop offset="100%" stop-color="#8a93a3"/>
      </linearGradient>
      <linearGradient id="sp_pole" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3d2616"/>
        <stop offset="50%" stop-color="#5c3a21"/>
        <stop offset="100%" stop-color="#2b1a0e"/>
      </linearGradient>
    </defs>
    <!-- Pole -->
    <rect x="${cx-8}" y="230" width="16" height="550" fill="url(#sp_pole)" stroke="#1a120e" stroke-width="2"/>
    <rect x="${cx-12}" y="400" width="24" height="40" fill="#a87b1f"/>
    <rect x="${cx-12}" y="600" width="24" height="40" fill="#a87b1f"/>
    <!-- Base tip -->
    <polygon points="${cx-10},780 ${cx},820 ${cx+10},780" fill="url(#sp_blade)"/>
    <!-- Head -->
    <path d="M${cx} 80 L${cx+20} 140 L${cx+12} 240 L${cx-12} 240 L${cx-20} 140 Z" fill="url(#sp_blade)" stroke="#5a6271" stroke-width="2"/>
    <path d="M${cx} 80 L${cx} 240" stroke="#fff" stroke-width="2"/>
    <rect x="${cx-14}" y="225" width="28" height="20" fill="#a87b1f" stroke="#3a2809" stroke-width="2"/>
  `,
  staff: `
    <defs>
      <linearGradient id="st_pole" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#4a362a"/>
        <stop offset="50%" stop-color="#6b4c3a"/>
        <stop offset="100%" stop-color="#2a1f1a"/>
      </linearGradient>
    </defs>
    <!-- Pole -->
    <path d="M${cx-10} 160 Q${cx+5} 400 ${cx-8} 750 L${cx+8} 750 Q${cx+20} 400 ${cx+10} 160 Z" fill="url(#st_pole)" stroke="#1a120e" stroke-width="2"/>
    <!-- Head details -->
    <path d="M${cx-30} 120 Q${cx} 60 ${cx+30} 120 Q${cx} 160 ${cx-30} 120 Z" fill="#3fd9c4" stroke="#0e8a7c" stroke-width="2" opacity="0.9"/>
    <circle cx="${cx}" cy="120" r="25" fill="#d9fff8" opacity="0.6"/>
    <!-- Gold wraps -->
    <path d="M${cx-18} 180 Q${cx} 190 ${cx+18} 180 L${cx+15} 210 Q${cx} 220 ${cx-15} 210 Z" fill="#f0c04a" stroke="#60430a" stroke-width="2"/>
    <path d="M${cx-12} 450 L${cx+12} 450 L${cx+12} 480 L${cx-12} 480 Z" fill="#f0c04a" stroke="#60430a" stroke-width="2"/>
  `,
  greatstaff: `
    <defs>
      <linearGradient id="gst_pole" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#2b2b2b"/>
        <stop offset="50%" stop-color="#4f4f4f"/>
        <stop offset="100%" stop-color="#1c1c1c"/>
      </linearGradient>
    </defs>
    <rect x="${cx-12}" y="120" width="24" height="650" fill="url(#gst_pole)" stroke="#000" stroke-width="2"/>
    <!-- Crystal -->
    <polygon points="${cx},40 ${cx+35},120 ${cx},180 ${cx-35},120" fill="#a78bfa" stroke="#5b21b6" stroke-width="3"/>
    <polygon points="${cx},50 ${cx+15},120 ${cx},160 ${cx-15},120" fill="#ede9fe" opacity="0.7"/>
    <!-- Gold cage -->
    <path d="M${cx-45} 100 L${cx-25} 180 L${cx+25} 180 L${cx+45} 100 L${cx+20} 130 L${cx-20} 130 Z" fill="#f0c04a" stroke="#60430a" stroke-width="2"/>
    <!-- Base -->
    <polygon points="${cx-16},770 ${cx},820 ${cx+16},770" fill="#8a93a3" stroke="#3a404c" stroke-width="2"/>
  `,
  hammer: `
    <defs>
      <linearGradient id="hm_head" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#b0b8c4"/>
        <stop offset="50%" stop-color="#8a93a3"/>
        <stop offset="100%" stop-color="#5a6271"/>
      </linearGradient>
    </defs>
    <!-- Handle -->
    <rect x="${cx-12}" y="250" width="24" height="500" fill="#3d2616" stroke="#1a120e" stroke-width="2"/>
    <!-- Gold rings -->
    <rect x="${cx-14}" y="350" width="28" height="20" fill="#f0c04a" stroke="#60430a" stroke-width="2"/>
    <rect x="${cx-14}" y="550" width="28" height="20" fill="#f0c04a" stroke="#60430a" stroke-width="2"/>
    <!-- Head block -->
    <rect x="${cx-70}" y="180" width="140" height="90" rx="8" fill="url(#hm_head)" stroke="#1c2948" stroke-width="4"/>
    <!-- Hammer faces -->
    <rect x="${cx-85}" y="195" width="15" height="60" rx="4" fill="#5a6271" stroke="#1c2948" stroke-width="3"/>
    <rect x="${cx+70}" y="195" width="15" height="60" rx="4" fill="#5a6271" stroke="#1c2948" stroke-width="3"/>
    <!-- Runes on head -->
    <circle cx="${cx-40}" cy="225" r="15" fill="#f0c04a"/>
    <circle cx="${cx+40}" cy="225" r="15" fill="#f0c04a"/>
  `,
  bowshort: `
    <!-- String -->
    <line x1="${cx}" y1="200" x2="${cx}" y2="650" stroke="#e5e7eb" stroke-width="2"/>
    <!-- Arc -->
    <path d="M${cx} 200 Q${cx-90} 425 ${cx} 650 Q${cx-70} 425 ${cx} 200 Z" fill="#5c3a21" stroke="#2b1a0e" stroke-width="2"/>
    <!-- Grip -->
    <rect x="${cx-48}" y="380" width="18" height="90" rx="4" fill="#2a1f1a" stroke="#000" stroke-width="2"/>
    <!-- Tips -->
    <circle cx="${cx}" cy="200" r="8" fill="#f0c04a" stroke="#60430a" stroke-width="2"/>
    <circle cx="${cx}" cy="650" r="8" fill="#f0c04a" stroke="#60430a" stroke-width="2"/>
  `,
  bowlong: `
    <line x1="${cx}" y1="120" x2="${cx}" y2="720" stroke="#e5e7eb" stroke-width="3"/>
    <!-- Recurve arc -->
    <path d="M${cx} 120 C${cx-40} 100, ${cx-110} 300, ${cx-60} 420 C${cx-110} 540, ${cx-40} 740, ${cx} 720 C${cx-20} 700, ${cx-80} 540, ${cx-40} 420 C${cx-80} 300, ${cx-20} 140, ${cx} 120 Z" fill="#2b2b2b" stroke="#1c1c1c" stroke-width="2"/>
    <path d="M${cx-20} 150 Q${cx-90} 420 ${cx-20} 690" stroke="#f0c04a" stroke-width="4" fill="none"/>
    <rect x="${cx-66}" y="380" width="16" height="80" rx="3" fill="#f0c04a" stroke="#60430a" stroke-width="2"/>
  `,
  orb: `
    <defs>
      <radialGradient id="orb_glow" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stop-color="#fff"/>
        <stop offset="40%" stop-color="#a78bfa"/>
        <stop offset="100%" stop-color="#4c1d95"/>
      </radialGradient>
    </defs>
    <!-- Halo -->
    <circle cx="${cx}" cy="400" r="75" fill="none" stroke="#f0c04a" stroke-width="6" stroke-dasharray="20 10"/>
    <circle cx="${cx}" cy="400" r="65" fill="none" stroke="#f0c04a" stroke-width="2"/>
    <!-- Core -->
    <circle cx="${cx}" cy="400" r="50" fill="url(#orb_glow)" stroke="#1c2948" stroke-width="2"/>
    <circle cx="${cx}" cy="400" r="30" fill="#fff" opacity="0.3"/>
    <!-- Stand -->
    <path d="M${cx-20} 480 L${cx+20} 480 L${cx+10} 510 L${cx-10} 510 Z" fill="#f0c04a" stroke="#60430a" stroke-width="2"/>
  `,
  tome: `
    <!-- Cover back -->
    <path d="M${cx-70} 280 L${cx+70} 290 L${cx+60} 480 L${cx-80} 470 Z" fill="#1c2948" stroke="#070b16" stroke-width="4"/>
    <!-- Pages -->
    <path d="M${cx-60} 290 L${cx+60} 300 L${cx+50} 470 L${cx-70} 460 Z" fill="#fbe8b7" stroke="#b57f1c" stroke-width="2"/>
    <!-- Cover front -->
    <path d="M${cx-80} 280 L${cx} 295 L${cx-10} 485 L${cx-90} 470 Z" fill="#2a3a63" stroke="#070b16" stroke-width="3"/>
    <!-- Binding -->
    <path d="M${cx-80} 280 L${cx-60} 275 L${cx-70} 465 L${cx-90} 470 Z" fill="#f0c04a" stroke="#60430a" stroke-width="2"/>
    <!-- Clasps -->
    <rect x="${cx-20}" y="360" width="30" height="15" fill="#f0c04a" stroke="#60430a" stroke-width="2" transform="rotate(10 ${cx-20} 360)"/>
    <!-- Rune on cover -->
    <circle cx="${cx-45}" cy="380" r="15" fill="none" stroke="#3fd9c4" stroke-width="3"/>
  `
};

async function generate() {
  for (const [cat, content] of Object.entries(templates)) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
        ${content}
      </svg>
    `;
    
    try {
      await sharp(Buffer.from(svg))
        .png()
        .toFile(path.join(spritesDir, `ov_${cat}.png`));
      console.log(`Generated ov_${cat}.png`);
      
      if (cat === 'sword') {
          fs.copyFileSync(path.join(spritesDir, `ov_${cat}.png`), path.join(spritesDir, `ov_${cat}_steel.png`));
      }
      fs.copyFileSync(path.join(spritesDir, `ov_${cat}.png`), path.join(spritesDir, `ov_${cat}_t1.png`));
      
      // Criar a variante _sprint como levemente mais clara/brilhante (Sóbrio para relíquia)
      await sharp(path.join(spritesDir, `ov_${cat}.png`))
        .modulate({ brightness: 1.2, saturation: 0.8 })
        .toFile(path.join(spritesDir, `ov_${cat}_sprint.png`));
      
    } catch (e) {
      console.error(`Failed ${cat}:`, e.message);
    }
  }
}

generate();
