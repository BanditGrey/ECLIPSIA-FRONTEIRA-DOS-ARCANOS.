import { skills } from './src/data/skills';
import { PROFICIENCIES } from './src/data/proficiencies';

// DPS por turno: dano% × hits / (cd + 1)
const dps = (s: any) => ((s.damagePercent ?? 0) * (s.hits ?? 1)) / (s.cd + 1);

interface Row { id: string; prof: string; req: number; mp: number; cd: number; dps: number; tipo: string; extras: string[]; }

const rows: Row[] = [];
for (const s of skills) {
  const extras: string[] = [];
  if (s.dotDamage) extras.push(`dot${s.dotDamage}x${s.dotTurns}`);
  if (s.healPercent) extras.push(`cura${s.healPercent}%`);
  if (s.stunTurns) extras.push(`stun${s.stunTurns}`);
  if (s.slowTurns) extras.push(`slow${s.slowTurns}`);
  if (s.defUpPercent) extras.push(`def+${s.defUpPercent}%x${s.defUpTurns}`);
  if (s.reflectPercent) extras.push(`refl${s.reflectPercent}%`);
  if (s.markDamageBonus) extras.push(`marca+${Math.round(s.markDamageBonus*100)}%`);
  if (s.dodgeNext) extras.push('esquiva');
  if (s.ignoreDef) extras.push('ignoraDef');
  if (s.executeBelowHpPercent) extras.push(`exec<${s.executeBelowHpPercent}%`);
  rows.push({ id: s.id, prof: s.proficiency, req: s.requireProficiency, mp: s.mp, cd: s.cd, dps: Math.round(dps(s)*10)/10, tipo: s.damageType ?? '-', extras });
}

// Relatório por arma
for (const cat of PROFICIENCIES) {
  const rs = rows.filter(r => r.prof === cat).sort((a, b) => a.req - b.req);
  console.log(`\n=== ${cat} ===`);
  for (const r of rs) {
    console.log(`  ${r.id.padEnd(20)} req=${String(r.req).padEnd(4)} mp=${String(r.mp).padEnd(3)} cd=${r.cd} dps=${String(r.dps).padEnd(6)} ${r.tipo.padEnd(8)} ${r.extras.join(',')}`);
  }
}

// Estatísticas globais
const dpsAll = rows.filter(r => r.dps > 0).map(r => r.dps);
console.log(`\n=== GLOBAL ===`);
console.log(`skills com dano: ${dpsAll.length} | DPS min=${Math.min(...dpsAll)} max=${Math.max(...dpsAll)} média=${(dpsAll.reduce((a,b)=>a+b,0)/dpsAll.length).toFixed(1)}`);
console.log(`skills sem dano (utilidade): ${rows.filter(r=>r.dps===0).length}`);
// MP por DPS
const ratio = rows.filter(r=>r.dps>0).map(r=>r.mp/r.dps);
console.log(`MP/DPS min=${Math.min(...ratio).toFixed(2)} max=${Math.max(...ratio).toFixed(2)} média=${(ratio.reduce((a,b)=>a+b,0)/ratio.length).toFixed(2)}`);
// Thresholds usados
console.log('thresholds:', [...new Set(rows.map(r=>r.req))].sort((a,b)=>a-b).join(', '));
// CDs
console.log('CDs:', [...new Set(rows.map(r=>r.cd))].sort((a,b)=>a-b).join(', '));
