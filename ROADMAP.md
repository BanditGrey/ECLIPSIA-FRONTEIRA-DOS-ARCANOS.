# 🗺 ROADMAP — ECLIPSIA: FRONTEIRA DOS ARCANOS

> **Reconciliado com o código em 2026-08-09.** O estado real do código tem
> prioridade sobre notas históricas de sessões anteriores.

## Concluído e preservado

- ItemEffects, serialização `itemStr`, catálogo, crafting, upgrade, encantamento,
  conjuntos, mochila/baú e efeitos aplicados ao combate.
- Mercado, correio, leilão, guildas, chat, whisper persistente, mute, presença,
  trade P2P, party e caçada cooperativa sincronizada.
- Dungeons, bosses, quests diárias, proficiências de armas, 98 skills e auditoria
  de balanceamento.
- Identidade visual Fronteira Arcana, sprites de personagem/inimigos/bosses,
  ícones em assets estáticos, equipamento por camadas e armas por tier.
- Roda elemental, stamps no craft, counters contra inimigos e catálogo de glifos.

## Prioridade 1 — finalizar glifos e fusão visual

- [ ] Em `LayeredCharacter.tsx`, renderizar `OffHandLayer` quando `offVisual`
      existir.
- [ ] Renderizar a aura calculada por `resolveFusion` usando
      `resolveFusionAuraAnchor`, atrás da arma e sem substituir a arte dela.
- [ ] Validar no Modo Sandbox: arma água + glifo vento = GELO, com aura, log e
      bônus de dano; glifo neutro não deve produzir fusão.
- [ ] Confirmar visual de espada + escudo e fallback seguro em todas as poses.

## Prioridade 2 — FX individual das 98 skills

- [ ] Substituir a decisão atual de três animações genéricas no
      `SkillEffectPanel` por configuração por `skillId`.
- [ ] Começar com habilidades representativas de corte, giro, tiro, cura, barreira,
      magia arcana, vazio, terremoto e escudo.
- [ ] Manter PNGs estáticos/CSS; não introduzir SVG inline ou Canvas geométrico
      para novos assets.
- [ ] Usar `SKILLS_SPRINT.md` como mapa de cobertura e marcar as skills concluídas.

## Prioridade 3 — elementos e visuais

- [ ] Stamps elementais em shop, quests e baús (craft já faz).
- [ ] Overlays T1/T3 faltantes; anchors para walk/cast/hit/attack; cobertura masculina.
- [ ] Arte própria para água, sombrio e luz onde ainda houver reaproveitamento legado.
- [ ] Relíquias próprias adicionais e balanceamento de poder/tier elemental.

## Robustez contínua

- [ ] Testes de integração Mongo para mail, market, guild e trade.
- [ ] Persistência de parties/trades caso a operação online exija reinicialização segura.
- [ ] Telemetria para ajustar drops, crystals, craft, upgrade e proficiências.
- [ ] Code-splitting adicional, logs estruturados e healthcheck detalhado.
- [ ] Deploy definitivo em Atlas/Railway/Vercel e teste com duas contas.

## Baseline obrigatório antes/depois de mudanças

```bash
cd client && npm install
npx tsc --noEmit && npm run build && npm run audit && npm run audit:social && npm run audit:balance
cd ../server && npm install && npm test
```

## Regras de ouro

1. i18n nos quatro idiomas em qualquer UI nova.
2. P2P em crystals; ouro fora da economia P2P.
3. Wire sempre com `itemStr`.
4. Não dividir percentuais do `ResolvedEffects` duas vezes.
5. Não criar assets de jogo por SVG inline/paths/Canvas geométrico.
6. Atualizar `MEMORY.md`, `PROJECT_MEMORY.md` e esta roadmap ao concluir uma etapa.
