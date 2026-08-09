import fs from 'node:fs';
import path from 'node:path';

const root = path.basename(process.cwd()) === 'client' ? path.resolve(process.cwd(), '..') : process.cwd();
const sprites = path.join(root, 'client/public/assets/sprites');
const overlays = fs.readFileSync(path.join(root, 'client/src/data/weaponOverlays.ts'), 'utf8');
const equipment = fs.readFileSync(path.join(root, 'client/src/data/equipmentVisuals.ts'), 'utf8');

const missing: string[] = [];
const overlayFiles = [...overlays.matchAll(/file:\s*'([^']+)'/g)].map((match) => match[1]);
for (const file of overlayFiles) {
  const absolute = path.join(sprites, `${file}.png`);
  if (!fs.existsSync(absolute)) missing.push(`overlay: ${file}.png`);
}

const equipmentFiles = [...equipment.matchAll(/(el_(?:fire|earth|wind|water|dark|light)_t[123]):\s*'([^']+)'/g)];
for (const [, key, file] of equipmentFiles) {
  for (const gender of ['female', 'male']) {
    const absolute = path.join(sprites, `eq_${file}_${gender}_idle_1.png`);
    if (!fs.existsSync(absolute)) missing.push(`equipment ${key}/${gender}: ${path.basename(absolute)}`);
  }
}

if (missing.length > 0) {
  console.error(`❌ Asset audit failed (${missing.length} missing)`);
  missing.forEach((entry) => console.error(`  - ${entry}`));
  process.exit(1);
}

console.log(`✅ ASSET AUDIT OK (${overlayFiles.length} overlays; ${equipmentFiles.length} elemental tier definitions)`);
