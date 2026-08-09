# ✅ CHECKLIST MESTRE — estado em 2026-08-09

## Fundação

- [x] Cliente React/Vite/Zustand e servidor Express/Socket.io/Mongo
- [x] i18n em pt-BR, en-US, es-ES e ja-JP
- [x] ItemEffects, itemStr, inventário, craft, upgrade, sets e encantamento
- [x] Mercado, leilão, correio, trade, guilda, party e chat social
- [x] Proficiências, 98 skills, passivas e auditoria de balanceamento
- [x] Sprites, equipamento em camadas, assets estáticos, cenários e FX base

## Próxima entrega

- [x] Renderizar escudo/glifo em `LayeredCharacter` por meio de `OffHandLayer`.
- [x] Renderizar aura de fusão na arma, com anchor por gênero/pose.
- [x] Smoke test de fusão água+vento e itemStr de glifo.
- [ ] Testar visualmente fusão, glifo neutro e espada+escudo no Modo Sandbox.

## Depois

- [ ] FX específico por skillId para as 98 skills.
- [ ] Stamps elementais em shop, quests e baús.
- [ ] Cobertura de poses/anchors/overlays e arte elemental própria faltante.
- [ ] Telemetria, integração Mongo, deploy definitivo e balanceamento real.

## Validação obrigatória

- [ ] `npx tsc --noEmit`
- [ ] `npm run build`
- [ ] `npm run audit`
- [ ] `npm run audit:social`
- [ ] `npm run audit:balance`
- [ ] `cd ../server && npm test`
