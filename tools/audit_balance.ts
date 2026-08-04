/**
 * ⚖️ AUDITORIA DE BALANCEAMENTO — passivas de proficiência + skills.
 * Roda com: cd client && npm run audit:balance
 * Regras validadas (ver SKILLS_SYSTEM.md):
 *  PASSIVAS: total por arma ≤ tetos (dmg 12%, crit 8%, critDmg 25%,
 *            def 12%, heal 10%); tiers nunca regridem; toda arma tem
 *            identidade (≥1 stat > 0).
 *  SKILLS: 7 por arma; burst de dano puro nunca regride; DPS ≥ 30;
 *          MP ≈ 12-35% do burst; DoT total não regride; thresholds únicos.
 */
import { PROFICIENCIES, PROFICIENCY_PASSIVES } from '../client/src/data/proficiencies';
import { skills } from '../client/src/data/skills';

let errors = 0;
const fail = (msg: string) => {
  console.error(`❌ ${msg}`);
  errors++;
};
const warn = (msg: string) => {
  console.warn(`⚠️ ${msg}`);
};

// ═══ PASSIVAS ═══
const CAPS = { dmgBonus: 0.12, critChance: 0.08, critDamage: 0.25, defBonus: 0.12, healBonus: 0.1 };
const KEYS = ['dmgBonus', 'critChance', 'critDamage', 'defBonus', 'healBonus'] as const;

console.log('═══ PASSIVAS DE PROFICIÊNCIA ═══');
for (const cat of PROFICIENCIES) {
  const tiers = PROFICIENCY_PASSIVES[cat];
  if (tiers.length !== 3) {
    fail(`${cat}: ${tiers.length} tiers (esperado 3)`);
    continue;
  }

  const prev: Record<string, number> = {};
  for (const k of KEYS) prev[k] = 0;

  for (const t of tiers) {
    if (t.at !== 50 && t.at !== 150 && t.at !== 300) {
      fail(`${cat}: marco inválido ${t.at}`);
    }
    for (const k of KEYS) {
      const v = t[k] ?? 0;
      if (v < prev[k] - 0.0001) fail(`${cat} ${t.at}: ${k} regrediu (${v} < ${prev[k]})`);
      prev[k] = Math.max(prev[k], v);
    }
  }

  const total: Record<string, number> = {};
  for (const k of KEYS) total[k] = tiers.reduce((s, t) => s + (t[k] ?? 0), 0);

  for (const k of KEYS) {
    if (total[k] > CAPS[k] + 0.0001) fail(`${cat}: ${k} total ${Math.round(total[k] * 100)}% > teto ${Math.round(CAPS[k] * 100)}%`);
  }

  const hasIdentity = KEYS.some((k) => total[k] > 0);
  if (!hasIdentity) fail(`${cat}: sem identidade (todas as stats 0)`);

  const desc = KEYS.filter((k) => total[k] > 0)
    .map((k) => `${k}=${Math.round(total[k] * 100)}%`)
    .join(' ');
  console.log(`  ${cat.padEnd(12)} ${desc}`);
}

// ═══ SKILLS ═══
const burst = (s: (typeof skills)[number]) => (s.damagePercent ?? 0) * (s.hits ?? 1);
const dpsOf = (s: (typeof skills)[number]) => burst(s) / (s.cd + 1);
const hasDmg = (s: (typeof skills)[number]) => Boolean(s.damagePercent);
const isControl = (s: (typeof skills)[number]) => Boolean(s.stunTurns || s.slowTurns);
const isDot = (s: (typeof skills)[number]) => Boolean(s.dotDamage);
const isUtility = (s: (typeof skills)[number]) =>
  Boolean(s.dodgeNext || s.defUpPercent || s.healPercent || s.markDamageBonus || s.reflectPercent || s.executeBelowHpPercent);
const isPure = (s: (typeof skills)[number]) => hasDmg(s) && !isControl(s) && !isDot(s) && !isUtility(s);
const totalBurst = (s: (typeof skills)[number]) => burst(s) + (s.dotDamage ?? 0) * (s.dotTurns ?? 0);

console.log('\n═══ SKILLS ═══');
for (const prof of PROFICIENCIES) {
  const rs = skills.filter((s) => s.proficiency === prof).sort((a, b) => a.requireProficiency - b.requireProficiency);
  if (rs.length !== 7) fail(`${prof}: ${rs.length} skills (esperado 7)`);

  let prevPure = 0;
  let prevDotTotal = 0;
  for (const s of rs) {
    const b = burst(s);
    const tb = totalBurst(s);
    const d = dpsOf(s);

    if (Number.isNaN(d) && hasDmg(s)) fail(`${prof}.${s.id}: DPS NaN`);
    if (isPure(s)) {
      if (b < prevPure - 0.01) fail(`${prof}.${s.id}: burst regrediu (${b} < ${prevPure})`);
      prevPure = Math.max(prevPure, b);
      if (d < 30) fail(`${prof}.${s.id}: DPS puro ${Math.round(d * 10) / 10} < 30`);
    } else if (isDot(s)) {
      if (tb < prevDotTotal - 0.01) fail(`${prof}.${s.id}: total DoT regrediu (${tb} < ${prevDotTotal})`);
      prevDotTotal = Math.max(prevDotTotal, tb);
    }
    if (hasDmg(s)) {
      const ratio = s.mp / b;
      if (ratio > 0.35) fail(`${prof}.${s.id}: MP/burst ${ratio.toFixed(2)} > 0.35`);
      if (ratio < 0.12 && !s.ignoreDef && !s.executeBelowHpPercent) fail(`${prof}.${s.id}: MP/burst ${ratio.toFixed(2)} < 0.12`);
    }
  }

  const reqs = rs.map((s) => s.requireProficiency);
  if (new Set(reqs).size !== 7) fail(`${prof}: thresholds duplicados (${reqs.join(',')})`);
}

// ═══ RESULTADO ═══
console.log('');
if (errors === 0) {
  console.log('✅ AUDITORIA DE BALANCEAMENTO OK (passivas + 98 skills)');
  process.exit(0);
} else {
  console.log(`❌ ${errors} problema(s) de balanceamento`);
  process.exit(1);
}
