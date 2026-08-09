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
- Trade, party e party hunt usam Socket.io; parte do estado social ainda é efêmera
  em memória do servidor e deve ser tratada como tal até persistência futura.
- Servidor não possui o catálogo de itens: valida referências serializadas e numId.

### Proficiências e skills

- Há 14 categorias de arma, cap de 1000 pontos, bônus de ATK por ponto e passivas
  nos marcos 50/150/300.
- Existem 98 skills, exatamente 7 por arma. Alterações devem partir de
  `tools/gen_skills.mjs`, não da saída gerada.
- A mesma categoria não pode ocupar as duas mãos; armas podem ocupar main ou off.

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

A lógica de catálogo, off-hand, fusão e combate está presente. Contudo,
`LayeredCharacter.tsx` ainda não insere no JSX os states já calculados para
`OffHandLayer` e para a aura. Assim, a apresentação está incompleta mesmo que o
bônus de dano seja aplicado. Resolver essa lacuna é a prioridade atual.

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

## 7. Próximas entregas

1. Terminar a renderização do off-hand e da aura de fusão.
2. Criar efeitos visuais diferenciados por skillId; `SKILLS_SPRINT.md` é o mapa.
3. Estender stamps elementais a outras fontes de item.
4. Telemetria e balanceamento real de economia/proficiências.
5. Testes de integração com Mongo para mail/market/guild/trade e persistência de
   party/trade quando o produto exigir.

## 8. Limpeza de arquivos — 2026-08-09

A limpeza foi deliberadamente conservadora: foram removidos apenas placeholders
não servidos e fontes `raw_mob_*.png` sem referências. Assets finais, geradores,
documentos de design e fontes de off-hand continuaram no repositório.
