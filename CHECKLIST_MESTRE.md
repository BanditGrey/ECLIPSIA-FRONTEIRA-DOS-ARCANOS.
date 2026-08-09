# ✅ CHECKLIST MESTRE — 2026-08-09

## Fundação
- [x] Client React/Vite/Zustand e server Express/Socket.io/Mongo.
- [x] UI em pt-BR, en-US, es-ES e ja-JP.
- [x] ItemEffects, itemStr, inventário, craft, upgrade, encantamento e sets.
- [x] Mercado, leilão, correio, guilda, party, trade e chat social.
- [x] 10 proficiências de arma principal e 70 skills.
- [x] Mão secundária exclusiva para glifos; migração segura de saves legados.
- [x] Elementos, fusões, auras, stamps e baús de exploração.
- [x] Equipamento em camadas, 70 FX de skill, assets estáticos e auditoria de assets.

## Visual pendente
- [ ] Validar em Sandbox glifo neutro, fusões e poses de combate.
- [ ] Anchors desenhados específicos por categoria de arma.
- [ ] T1/T3 próprios para fogo, terra e vento.

## Robustez pendente
- [x] Pino + healthcheck detalhado + persistência de party/trade em Mongo.
- [x] Telemetria local de combate, exploração, craft e upgrade.
- [ ] Testes de integração com Mongo real para mail, market, guild e trade.
- [ ] Deploy definitivo e teste multiplayer com duas contas.

## Baseline
- [x] `npx tsc --noEmit`
- [x] `npm run build`
- [x] `npm run audit` — 89/89
- [x] `npm run audit:social` — 41/41
- [x] `npm run audit:balance`
- [x] `npm run audit:assets`
- [x] `cd ../server && npm test` — 20/20
