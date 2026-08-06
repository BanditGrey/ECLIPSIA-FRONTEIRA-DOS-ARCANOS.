const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const spritesDir = path.join(root, 'client', 'public', 'assets', 'sprites');

const arcaneCode = fs.readFileSync(path.join(root, 'client', 'src', 'components', 'ui', 'ArcaneIcon.tsx'), 'utf-8');

let start = arcaneCode.indexOf('const ICONS: Record<ArcaneIconName, React.ReactNode> = {');
let end = arcaneCode.indexOf('};', start);
let block = arcaneCode.substring(start, end);

const lines = block.split('\n');

async function processIcon(name, content) {
    let svgContent = content.replace(/<\/?>/g, '').replace(/F\(/g, '').replace(/\),?$/g, '').trim();
    if (svgContent.endsWith(',')) svgContent = svgContent.slice(0, -1);
    
    svgContent = svgContent
        .replace(/strokeWidth/g, 'stroke-width')
        .replace(/strokeDasharray/g, 'stroke-dasharray')
        .replace(/strokeLinecap/g, 'stroke-linecap')
        .replace(/strokeLinejoin/g, 'stroke-linejoin')
        .replace(/fill="currentColor"/g, 'fill="white"');

    const fullSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <g>
            ${svgContent}
        </g>
    </svg>`;
    
    try {
        await sharp(Buffer.from(fullSvg))
            .png()
            .toFile(path.join(spritesDir, `arcane_icon_${name}.png`));
        console.log(`Generated arcane_icon_${name}.png`);
    } catch (e) {
        console.error(`Failed ${name}:`, e.message);
    }
}

async function run() {
    for (let line of lines) {
        let m = line.match(/^\s+([a-z0-9_]+):\s*(.*)$/);
        if (m) {
            let name = m[1];
            let content = m[2];
            await processIcon(name, content);
        }
    }
}

run();
