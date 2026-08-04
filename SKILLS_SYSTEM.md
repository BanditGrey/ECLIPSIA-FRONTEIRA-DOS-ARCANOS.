# ⚔ SISTEMA DE PROFICIÊNCIA DE ARMAS — DOCUMENTO MESTRE

> Referência definitiva do sistema (Caso 8/9). **Não voltar a discutir o design —
> aqui está o contrato.** Dados no código: `client/src/data/proficiencies.ts`,
> `client/src/data/skills.ts`, `client/src/data/weaponCombos.ts`.
> Status: v1.0 (2026-08-03) · Baselines: tsc OK · build OK · 89/89 · 41/41 · 18/18.

---

## 1. FILOSOFIA

- **Não existe classe fixa.** O jogador é definido pelas **2 armas equipadas**
  (principal + secundária). Trocar de arma = trocar de build, sem custo, sem
  criar outro personagem.
- As **Origens** (6 antigos arquétipos) são **cosméticas** (retrato, sigilo,
  título) — zero efeito mecânico.
- Cada arma tem: **proficiência** (progressão de pontos), **passivas** (marcos)
  e **skills ativas** (desbloqueadas por marcos).
- **Sorte** (teto 1000) dá +0,1% de XP por ponto e melhora loot — nunca é vendida.

---

## 2. COMO UPA A PROFICIÊNCIA

| Ação | XP de proficiência (por arma equipada) |
|---|---|
| Ataque básico | +1 |
| Usar skill | +2 |
| Abater inimigo | +3 |
| Andar de dungeon concluído | +5 |
| Matar boss (dungeon/world) | +15 |

- **Teto**: 1000 pontos por categoria.
- **Marcos de skill**: 10 · 25 · 30 · 40 · 50 · 60 · 70 · 80 · 100 · 120
- **Marcos de passiva**: 50 · 150 · 300
- A XP é concedida **às categorias das armas equipadas** (main e off) no momento
  da ação — empunhou a arma, ela sobe.
- Skills usáveis = **f(arma equipada, pontos na categoria)**. O Auto-combate usa
  a melhor skill disponível.

---

## 3. COMO AS SKILLS FUNCIONAM (CONTRATO DE CÁLCULO)

Fórmula de dano (idêntica ao ataque básico, com `percent` da skill):

```
danoBase = ATK_total × (percent/100) × bônusImpulso × (1 + bônusDano + passivaDmg + profATK)
crítico  = rolagem: 5% + percepção×0.002 + critChance(equip+passiva)
           se crítico: multiplicador = 2 × (1 + critDmg + passivaCritDmg + onCritDmg)
danoFinal = max(1, floor(danoBase × multiplicador − defInimigo×0.35))
```

| Campo | Efeito |
|---|---|
| `damagePercent` | % do ATK total (base 100 = ataque normal) |
| `hits` | nº de golpes (cada um rola o dano) |
| `damageType` | physical / magical / void (afeta effects VS_* e futuras resistências) |
| `mp` | custo de mana (reduzido por HASTE? não — HASTE reduz CD) |
| `cd` | cooldown em turnos (`cd × (1 − haste)`, mínimo 1) |
| `dotDamage`/`dotTurns` | dano ao longo dos turnos (sangramento/veneno) |
| `healPercent` | cura % do HP máx, amplificada por `healBonus` (equip + passiva) |
| `stunTurns`/`slowTurns` | controle (stun = inimigo comprometido → ativa VS_WEAK) |
| `defUpPercent`/`defUpTurns` | buff de defesa |
| `reflectPercent`/`reflectTurns` | reflete % do dano recebido |
| `dodgeNext` | esquiva o próximo golpe |
| `ignoreDef` | ignora a defesa do inimigo |
| `executeBelowHpPercent` | só executa (dano cheio) abaixo de X% de HP |
| `markDamageBonus`/`markTurns` | marca: aumenta dano recebido |

**Regras de ouro do balanceamento:**
1. DPS por turno (dano × hits / (cd+1)) deve ficar entre 40% e 100% do ATK.
2. Custo de MP ≈ 20–35% do dano% (skills utilitárias custam menos).
3. Toda skill de dano tem 1 contrapartida de utilidade por arma.
4. Controles (stun/slow) têm dano reduzido (~50–60%).
5. Heal/defesa têm custo alto (são suporte).

---

## 4. SKILLS POR ARMA (29 skills — 2 a 3 por arma)

| Arma | Skill | Marco | MP | CD | Efeito |
|---|---|---|---|---|---|
| **Espada 1H** | Spin Slash | 10 | 30 | 2 | 150% físico |
| | Dash Cut | 25 | 45 | 3 | 200% físico |
| | Thousand Cuts | 80 | 80 | 5 | 5×40% físico |
| **Espada Longa** | Bleed | 40 | 50 | 3 | DoT 40×3 turnos |
| | Cross Slash | 80 | 55 | 4 | 180% físico |
| **Espadão** | Execute | 60 | 100 | 8 | 400% físico (executa <20% HP) |
| | Blade Storm | 120 | 90 | 6 | 3×90% físico |
| **Adaga** | Death Mark | 10 | 40 | 4 | Marca +50% dano 3 turnos |
| | Shadow Step | 60 | 60 | 5 | 180% + esquiva |
| **Adaga de Apoio** | Riposte | 30 | 35 | 3 | 140% + esquiva |
| | Twin Fang | 70 | 45 | 4 | 2×80% físico |
| **Arco Curto** | Piercing Shot | 10 | 30 | 2 | 160% ignora defesa |
| | Quick Shot | 40 | 30 | 2 | 100% + slow 1 |
| **Arco Longo** | Rain of Arrows | 50 | 70 | 5 | 4×55% físico |
| | Sniper Shot | 90 | 65 | 5 | 220% físico, ignora defesa |
| **Cajado** | Arcane Burst | 10 | 30 | 2 | 150% mágico |
| | Heal Pulse | 40 | 50 | 4 | cura 45% |
| **Cajado Arcano** | Ice Nova | 40 | 55 | 4 | 130% mágico + slow 2 |
| | Chain Lightning | 100 | 90 | 6 | 170% mágico |
| **Orbe** | Astral Barrier | 60 | 40 | 5 | def +35% 3 turnos |
| | Void Gate | 120 | 110 | 8 | 300% void |
| **Grimório** | Root | 25 | 40 | 4 | 60% mágico + stun 1 |
| | Arcane Ward | 60 | 45 | 4 | def +30% 3t + cura 25% |
| **Martelo** | Fortress | 40 | 45 | 5 | def +40% 3 turnos |
| | Seismic Slam | 100 | 80 | 6 | 250% físico + stun 1 |
| **Lança** | Thorns | 30 | 40 | 4 | reflete 35% 3 turnos |
| | Nature Burst | 80 | 75 | 5 | 200% mágico |
| **Escudo** | Shield Bash | 10 | 25 | 3 | 120% físico + stun 1 |
| | Aegis Guard | 60 | 50 | 6 | def +50% 2t + cura 15% |

---

## 5. PASSIVAS POR ARMA (marcos 50 / 150 / 300)

| Arma | 50 | 150 | 300 |
|---|---|---|---|
| Espada 1H | +2% crit, +5% critDmg | +4%/+10% | +6%/+15% |
| Espada Longa | +2% dmg, +1% crit | +4%/+2% | +6%/+3% |
| Espadão | +3% dmg, +5% critDmg | +6%/+10% | +10%/+20% |
| Adaga | +3% crit, +5% critDmg | +5%/+10% | +8%/+15% |
| Adaga Apoio | +2% crit, +2% dmg | +4%/+4% | +6%/+6% |
| Arco Curto | +2% crit, +2% dmg | +4%/+4% | +6%/+6% |
| Arco Longo | +8% critDmg, +2% dmg | +15%/+4% | +25%/+6% |
| Cajado | +3% cura, +2% dmg | +6%/+4% | +10%/+6% |
| Cajado Arcano | +3% dmg, +1% crit | +6%/+2% | +10%/+3% |
| Orbe | +2% dmg, +5% critDmg | +5%/+10% | +8%/+20% |
| Grimório | +2% def, +3% cura | +4%/+6% | +6%/+10% |
| Martelo | +3% def, +2% dmg | +6%/+4% | +10%/+6% |
| Lança | +2% dmg, +1% crit | +4%/+2% | +6%/+3% |
| Escudo | +4% def, +2% cura | +8%/+4% | +12%/+6% |

Bônus adicional de **ATK: +0,2% por ponto** em cada arma equipada (soma das duas).

---

## 6. COMBINAÇÕES (nomes de classe — 210)

- Matriz completa `main × off` (inclui arma única = "none") em
  `client/src/data/weaponCombos.ts` + i18n `combos.<main>_<off>.name` (4 idiomas).
- Exibida no **Perfil** (chips das armas + nome da combinação) e na **Wiki**
  (tabela completa).
- Ex.: Espada+Escudo = Paladino · Cajado+Escudo = Templário Arcano ·
  Espadão+Adaga = Ceifador de Sangue · Arco Longo+Grimório = Caçador Oráculo.

---

## 7. CHECKLIST DE STATUS

- [x] 14 proficiências com XP por uso (ataque/skill/abate) e cap 1000
- [x] Skills derivadas da arma equipada + proficiência (29 skills, todas as 14
      armas com kit ≥2)
- [x] Passivas por marcos (50/150/300) integradas (dano, crítico, cura, defesa)
- [x] Bônus de ATK por ponto (+0,2%)
- [x] Nomes de combinação (210) com i18n + UI (Perfil + Wiki)
- [x] Sorte teto 1000 (+0,1% XP/pt) · origens cosméticas · criação com arma inicial
- [x] Escudo = tanque na party
- [ ] **Balanceamento com dados reais** (Caso 5): medir tempo de up 0→1000,
      ajustar XP por ação e marcos conforme telemetria pós-deploy
- [ ] **Futuro**: passivas por marcos superiores (500/750), skills de arma
      dupla (quando ambas as armas ≥ X), resistências elementares por
      `damageType` (physical/magical/void)
- [ ] **Futuro**: 3ª arma (troca rápida em combate, 1 turno de CD)
