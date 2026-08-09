const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const spritesDir = path.join(__dirname, '..', 'client', 'public', 'assets', 'sprites');

async function processSprite(source, dest, params) {
    let img = sharp(path.join(spritesDir, source))
        .trim();
        
    if (params.modulate) {
        img = img.modulate(params.modulate);
    }
    
    await img.png().toFile(path.join(spritesDir, dest));
    console.log("Generated", dest);
}

async function run() {
    // Off-hand é exclusivo de glifos; não gerar escudos.
    // Glifos base
    const els = ['fire', 'water', 'earth', 'wind', 'dark', 'light'];
    
    for (let el of els) {
        const src = `raw_glyph_${el}.png`;
        
        await processSprite(src, `oh_glyph_${el}_t1.png`, { modulate: { brightness: 0.8, saturation: 0.6 } });
        await processSprite(src, `oh_glyph_${el}_t2.png`, {});
        await processSprite(src, `oh_glyph_${el}_t3.png`, { modulate: { brightness: 1.3, saturation: 1.2 } });
        await processSprite(src, `oh_glyph_${el}_sprint.png`, { modulate: { brightness: 1.4, saturation: 0.2 } }); // Sóbrio
    }
    
    // Neutral glifos - vou pegar o de luz e desaturar
    const srcN = 'raw_glyph_light.png';
    await processSprite(srcN, `oh_glyph_neutral_t1.png`, { modulate: { brightness: 0.7, saturation: 0.1 } });
    await processSprite(srcN, `oh_glyph_neutral_t2.png`, { modulate: { brightness: 0.9, saturation: 0.2 } });
    await processSprite(srcN, `oh_glyph_neutral_t3.png`, { modulate: { brightness: 1.2, saturation: 0.4 } });
    await processSprite(srcN, `oh_glyph_neutral_sprint.png`, { modulate: { brightness: 1.4, saturation: 0.1 } });
}

run();
