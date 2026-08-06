const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const spritesDir = path.join(__dirname, '..', 'client', 'public', 'assets', 'sprites');

const CATEGORIES = [
    'sword', 'dagger', 'greatsword', 'spear', 'staff', 'greatstaff',
    'hammer', 'bowshort', 'bowlong', 'orb', 'tome'
];

async function generateNeutralTiers() {
    for (const cat of CATEGORIES) {
        const base = path.join(spritesDir, `ov_${cat}.png`);
        if (!fs.existsSync(base)) continue;
        
        try {
            // T2: azulado mágico
            await sharp(base)
                .modulate({ brightness: 1.1, hue: 190, saturation: 1.2 }) // shift to magical blueish
                .toFile(path.join(spritesDir, `ov_${cat}_t2.png`));
            
            // T3: dourado brilhante
            await sharp(base)
                .modulate({ brightness: 1.3, hue: 45, saturation: 1.5 }) // shift to golden
                .toFile(path.join(spritesDir, `ov_${cat}_t3.png`));
                
            console.log(`Generated neutral t2 & t3 for ${cat}`);
        } catch (e) {
            console.error(`Failed ${cat}:`, e.message);
        }
    }
}
generateNeutralTiers();
