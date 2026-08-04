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
- **Toda arma pode ser equipada em QUALQUER mão** (main ou off) — não há arma
  exclusiva de mão. Espadão + escudo, cajado + espadão, adaga + arco: tudo vale.
  Exceção (regra de ouro): **a MESMA categoria de arma não pode ocupar as duas
  mãos** (ex.: 2 espadas de uma mão). Armas de "duas mãos" não bloqueiam mais a
  outra mão — o termo vira só flavor.
- As **Origens** (6 antigos arquétipos) são **cosméticas** (retrato, sigilo,
  título) — zero efeito mecânico.
- Cada arma tem: **proficiência** (progressão de pontos), **passivas** (marcos)
  e **7 skills ativas** (desbloqueadas por marcos).
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

**Regras de ouro do balanceamento (v2 — auditadas automaticamente pelo gerador):**
1. **Burst (dano% × hits) NUNCA regride** entre skills de dano puro na mesma arma
   (ordenadas por requisito). Skills mais difíceis de desbloquear = mais fortes.
2. **DPS por turno (burst/(cd+1)) ≥ 30** para skills de dano puro.
3. **MP ≈ 20–35% do burst** (skills com ignora-def/execução podem custar mais).
4. **Controle (stun/slow), DoT, esquiva e buffs pagam em dano** — podem ter
   burst menor que o dano puro do mesmo nível (o efeito compensa).
5. **DoT**: o total (dano + dot×turnos) não regride entre DoTs da mesma arma.
6. Toda arma tem 7 skills: dano básico → dano forte → controle → utilidade →
   multi-hit/DoT → dano forte 2 → ultimate/execução.
7. Thresholds de proficiência únicos por arma (7 distintos, entre 5 e 150).

> ⚙️ Rodar `node tools/gen_skills.mjs` regenera `skills.ts` + i18n e **roda a
> auditoria de balanceamento automaticamente** — se alguma regra acima for
> violada, o gerador falha com a mensagem da skill problemática.

---

## 4. SKILLS POR ARMA (98 skills — **7 por arma**, obrigatório)

> ⚙️ **Fonte de verdade: `tools/gen_skills.mjs`** — o gerador cria
> `client/src/data/skills.ts` + o bloco i18n "skills" (4 idiomas).
> **Regra de ouro: toda arma tem exatamente 7 skills ativas.**
> Para alterar skills, edite o gerador e rode `node tools/gen_skills.mjs`.

Cada arma segue o template de 7 papéis:

| # | Papel | Exemplo (Espada 1H) |
|---|---|---|
| 1 | Dano básico (CD baixo) | Quick Slash (130%, CD 1) |
| 2 | Dano forte / gap | Dash Cut (200%) |
| 3 | Controle (stun/slow) | Parry Counter (120% + stun) |
| 4 | Utilidade defensiva | War Cry (def +25% + cura 10%) |
| 5 | Multi-hit / DoT | Blade Flurry (4×45%) |
| 6 | Skill existente (mantida) | Spin Slash (150%) |
| 7 | Ultimate / execução | Thousand Cuts (5×40%) |

Lista completa das 98: gerada em `client/src/data/skills.ts` (id, proficiência,
threshold, mp, cd, dano, hits, DoT, cura, stun/slow, defesa, reflexo, marca,
esquiva, ignoreDef, execute) — tudo documentado no próprio arquivo e no gerador.

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
- [x] **98 skills — exatamente 7 por arma** (geradas por `tools/gen_skills.mjs`)
- [x] **Toda arma equipável em qualquer mão** (main/off); mesma categoria
      bloqueada nas duas mãos; "duas mãos" não bloqueia mais a off
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
