# ⚙️ Estado do balanceamento — 2026-08-09

## Implementado

- [x] Passivas por proficiência com tetos auditados: dano 12%, crítico 8%,
      dano crítico 25%, defesa 12% e cura 10%.
- [x] Effects 31–40 para skills/armas integrados no registry, engine e combate:
      dano de skill/básico, redução de CD/MP, DoT, cura, controle, execute,
      reflect e crítico de skill.
- [x] `tools/audit_balance.ts` valida passivas e as 70 skills das 10 armas principais.
- [x] `tools/gen_skills.mjs` é a fonte de verdade para `skills.ts` e i18n gerado.

## A validar em dados reais

- [ ] Tempo de progressão de proficiência de 0 a 1000.
- [ ] Economia de crystals, craft e upgrade.
- [ ] Taxas de drop e tempo de combate por região/boss.
- [ ] Poder dos tiers elementais, counter (1.25) e bônus de fusão (10%).

## Comando

```bash
cd client && npm run audit:balance
```
