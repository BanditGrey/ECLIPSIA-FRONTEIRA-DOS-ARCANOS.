# 🧠 MEMÓRIA DE ARQUITETURA — ECLIPSIA: FRONTEIRA DOS ARCANOS

> **Atualizada em 2026-08-09.** Documento consolidado de arquitetura, regras de
> negócio e continuidade. O handoff rápido está em `MEMORY.md`; o planejamento em
> `ROADMAP.md`.

## 1. Visão do produto

MMORPG de navegador idle/turn-based. O jogador não possui classe mecânica fixa:
origens são cosméticas; a build é definida pelas armas principal e secundária.
O jogo é gratuito e não pay-to-win: economia P2P usa 💎 crystals, enquanto ouro
permanece na progressão PvE.

**Stack:** React 18, TypeScript, Vite, Zustand, Tailwind, Express, Socket.io,
MongoDB/Mongoose e JWT.

**Idiomas obrigatórios:** `pt-BR`, `en-US`, `es-ES`, `ja-JP`.

## 2. Estrutura relevante

```text
client/src/
├── data/       conteúdo estático: itens, skills, monsters, elementos, glifos
├── systems/    combate, effects, loot, world, quests
├── store/      Zustand: jogador, combate, party, UI e pets
├── components/ painéis, telas, efeitos e UI
├── i18n/       traduções de interface
└── services/   API, socket e sync
server/src/
├── models/     Player, Mail, MarketListing, Auction, Guild, Whisper etc.
├── routes/     auth, player, market, auction, checkout, guild, mail, whisper
└── server.js    Express, Socket.io, party hunt e social
```

## 3. Contratos que não podem quebrar

### ItemEffects e serialização

- Item no wire: `itemStr`, por exemplo `1005|1:65|4:5|7:3`.
- Effects ocupam pares contínuos `e1/v1` até `e10/v10`; id 0 e gaps são inválidos.
- Itens armazenam percentuais como inteiros; `ResolvedEffects` usa frações (`0.05`).
- `effects` é a fonte de verdade. `stats` existe por retrocompatibilidade.
- `calculatePlayerStats` aceita referências de catálogo e `itemStr`.
- Mercado, leilão, trade e correio devem transportar `itemStr`, não objetos de item.

### Economia/social

- Mochila: 60; baú: 500.
- Mercado e leilão usam crystals, com custódia e entrega por correio.
- Trade, party e party hunt usam Socket.io. Trades/parties pendentes são persistidos
  em MongoDB e restaurados no boot quando há banco real; o sandbox mock continua efêmero.
- Servidor não possui o catálogo de itens: valida referências serializadas e numId.

### Proficiências e skills

- Há 10 categorias de arma principal, cap de 1000 pontos, bônus de ATK por ponto e
  passivas nos marcos 50/150/300.
- Existem 70 skills, exatamente 7 por arma. Alterações devem partir de
  `tools/gen_skills.mjs`, não da saída gerada.
- A mão secundária é exclusiva para glifos; armas, escudos e proficiências de
  off-hand foram removidos do catálogo.

## 4. Elementos, visuais e assets

- A roda elemental oficial tem seis elementos: fogo, terra, água, vento, sombrio
  e luz. `data/elementSynergy.ts` contém counters e fusões.
- `weaponElements.ts` identifica stamps pelos effects 12–17; craft já pode rolar
  elemento. Falta estender stamps a shop, quests e baús.
- `fusionAuras.ts` resolve a fusão de arma+glifo e o bônus de dano; `glyphs.ts`
  contém os glifos elementais e neutros.
- O sistema visual usa assets estáticos em `client/public/assets/`. Nunca recriar
  ícones/sprites por SVG inline, paths ou Canvas geométrico.
- `tools/sprite_clean.py` é o limpador versionado. Não use a regra histórica de
  remoção global de branco: ela destrói lâminas e highlights legítimos.

### Estado real dos glifos

A lógica de catálogo, off-hand, fusão e combate está presente e agora a apresentação
foi conectada: `LayeredCharacter.tsx` renderiza o `OffHandLayer` e a aura de fusão
ancorada na arma. `fusionAuras.ts` resolve corretamente a definição do glifo mesmo
quando a mão secundária usa `itemStr`.

## 5. Qualidade e execução

```bash
cd client && npm install
npx tsc --noEmit
npm run build
npm run audit
npm run audit:social
npm run audit:balance
cd ../server && npm install && npm test
```

Os números históricos de referência são ItemEffects 89/89, social 41/41 e testes
do servidor verdes. Não trate contagens antigas de documentos anteriores como
verdade sem rodar as verificações.

## 6. Ambiente e deploy

- Vite usa caminhos relativos e proxy de `/api`/`/socket.io` durante o preview.
- O backend aceita Mongo real por `MONGO_URI`; no sandbox sem binário disponível,
  degrada para mock. O Modo Sandbox do login é o caminho de teste local confiável.
- Produção planejada: client Vercel, server Railway e MongoDB Atlas. Ver `DEPLOY.md`.

## 7. Estado de entregas recentes

- Off-hand visual e aura de fusão: concluídos. Mão secundária aceita somente glifos.
- FX por skillId: concluído para as 70 skills; ver `SKILLS_SPRINT.md`.
- Stamps: craft, quest, loja, cache oculto e baú de exploração.
- Telemetria local: combate, exploração, craft e upgrade; sem PII e limitada a 500 eventos.
- Party/trade: modelos Mongo e restauração no boot já existem; falta teste de integração com banco real.
- Visual: água/sombrio/luz T1–T3 em ambos os gêneros; fogo/terra/vento T2 em ambos os gêneros.

## 8. Pendências reais

1. Revisão visual no Sandbox de glifos, fusões, armas e FX.
2. Arte T1/T3 de fogo/terra/vento e anchors desenhados por categoria.
3. Integração Mongo de mail/market/guild/trade. O sandbox bloqueia download do mongod; usar Atlas ou banco externo.
4. Envio agregado de telemetria depois de definir backend analítico.
5. Deploy Atlas/Railway/Vercel e teste multiplayer com duas contas.

## 9. Limpeza de arquivos — 2026-08-09

Foram removidos placeholders não servidos, fontes `raw_mob_*.png`, armas/escudos
off-hand e seus overlays. Assets finais, fontes de glifo e geradores ativos foram preservados.
