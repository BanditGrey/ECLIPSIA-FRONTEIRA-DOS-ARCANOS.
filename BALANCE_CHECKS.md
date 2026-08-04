# ⚙️ CHECKLIST — BALANCEAMENTO DE PASSIVAS + SISTEMA DE EFFECTS → SKILLS/ARMAS

> Sessão: continuação do Caso 10 (skills 7/arma balanceadas). Este doc é o
> guia de execução — marcar [x] conforme avança. Status base: 2026-08-03.

---

## PARTE A — BALANCEAMENTO DAS PASSIVAS DE PROFICIÊNCIA

- [x] A1. Auditoria das passivas atuais (regressão, tetos, identidade por arma)
- [x] A2. Definir regras de ouro das passivas
- [x] A3. Ajustar `PROFICIENCY_PASSIVES` (data/proficiencies.ts) conforme regras
- [x] A4. Auditoria automática embutida (falha se regra violada) + validação

> ✅ CONCLUÍDO: tetos por arma (dmg ≤ 12% · crit ≤ 8% · critDmg ≤ 25% ·
> def ≤ 12% · heal ≤ 10%), tiers sem regressão, identidade por arma
> (espadão=dmg/critDmg, adaga=crit, arco longo=critDmg, escudo=def...).
> Auditoria permanente em `tools/audit_balance.ts` (`npm run audit:balance`).

## PARTE B — SISTEMA DE ITEM EFFECTS → SKILLS/ARMAS

### B0. Design (decidido nesta sessão)
- [x] Usar slots reservados 31–40 (faixa combat) para effects que afetam
      skills/armas:
  - 31 `SKILL_DMG` — +% dano de skills ativas
  - 32 `BASIC_ATK_DMG` — +% dano de ataque básico
  - 33 `SKILL_CD_REDUCE` — -% cooldown de skills (soma com HASTE)
  - 34 `SKILL_MP_REDUCE` — -% custo de MP de skills
  - 35 `DOT_DMG_BONUS` — +% dano de DoT (dotDamage)
  - 36 `SKILL_HEAL_BONUS` — +% cura de skills (soma com HEAL_BONUS)
  - 37 `CONTROL_DURATION` — +% duração de stun/slow de skills
  - 38 `EXECUTE_THRESHOLD` — +% limiar de execução (executeBelowHpPercent)
  - 39 `REFLECT_BONUS` — +% reflexo (reflectPercent)
  - 40 `CRIT_SKILL_DMG` — +% dano crítico de skills (soma com CRIT_DMG)

### B1. Registry + Engine
- [x] B1.1 `EFFECT` constants + `EFFECT_REGISTRY` (31–40) em effectRegistry.ts
- [x] B1.2 `ResolvedEffects` + `resolveEffects` (effectEngine.ts) com os 10 novos
- [x] B1.3 Nomes/descrições nos 4 idiomas (effectNames.ts) — substituir "Reservado"
- [x] B1.4 `calculatePlayerStats` soma os novos effects do equipamento

### B2. Integração no combate (como cada effect afeta as skills)
- [x] B2.1 `skill()`: dano × (1 + SKILL_DMG + passivas) — separado do básico
- [x] B2.2 `attack()`: dano × (1 + BASIC_ATK_DMG)
- [x] B2.3 Cooldown: `cd × (1 − HASTE − SKILL_CD_REDUCE)` (mín 1)
- [x] B2.4 Custo de MP: `mp × (1 − SKILL_MP_REDUCE)` (mín 1)
- [x] B2.5 DoT: `dotDamage × (1 + DOT_DMG_BONUS)`
- [x] B2.6 Cura de skill: `healPercent × (1 + HEAL_BONUS + SKILL_HEAL_BONUS)`
- [x] B2.7 Controles: `stunTurns/slowTurns × (1 + CONTROL_DURATION)` (arredonda)
- [x] B2.8 Execução: `executeBelowHpPercent × (1 + EXECUTE_THRESHOLD)` (cap 50%)
- [x] B2.9 Reflexo: `reflectPercent × (1 + REFLECT_BONUS)`
- [x] B2.10 Crítico de skill: `critDmg + CRIT_SKILL_DMG` no multiplicador

### B3. Itens de exemplo
- [x] B3.1 Aplicar os effects novos em itens do catálogo (lendários/relics) para
      demonstrar o sistema (ex.: espadão relic w2h_1505 com SKILL_DMG+12% e
      EXECUTE_THRESHOLD+10%; amuleto relic am_7005 com SKILL_DMG+10%,
      SKILL_CD_REDUCE+8%, SKILL_MP_REDUCE+5%)

### B4. Qualidade
- [x] B4.1 Auditoria item-effects atualizada (74→84 definidos, 26→16 reservados)
      mantendo 89 checks OK
- [x] B4.2 tsc + build + auditorias 89/89 + 41/41 + testes 18/18
- [x] B4.3 Smoke tests: resolveEffects com novos effects + combat com bônus
- [x] B4.4 Docs: SKILLS_SYSTEM.md + PROJECT_MEMORY.md + ROADMAP.md (Caso 11)
