# 🧠 MEMÓRIA OPERACIONAL — ECLIPSIA: FRONTEIRA DOS ARCANOS

> **Atualizada em 2026-08-09.** Handoff curto e fiel ao código. Arquitetura e
> contratos: `PROJECT_MEMORY.md`; plano vigente: `ROADMAP.md`.

## Estado atual

- Branch Arena: `arena/019fe704-eclipsia-fronteira-dos-arcanos`.
- Stack: React + TypeScript + Vite + Zustand / Express + Socket.io + MongoDB.
- i18n obrigatório: `pt-BR`, `en-US`, `es-ES`, `ja-JP`.
- Todo item no wire usa `itemStr` (`numId|effect:value|...`).
- P2P (mercado, leilão, trade e correio de valor) usa 💎 crystals.
- Sem Mongo no sandbox, backend entra em `sandbox-mock`; login oferece Modo Sandbox.

## Bootstrap e baseline

```bash
cd /home/user/ECLIPSIA-FRONTEIRA-DOS-ARCANOS.
cd client && npm install
cd ../server && npm install
cd ../client && npx tsc --noEmit && npm run build && npm run audit && npm run audit:social && npm run audit:balance && npm run audit:assets
cd ../server && npm test
```

Baseline confirmado: build limpo; ItemEffects **89/89**; social **41/41**;
balanceamento OK; servidor **20/20** testes.

## Regras permanentes

1. Nunca usar SVG inline, paths ou Canvas geométrico para sprites, armas, glifos,
   ícones, escudos ou cenários. Assets são PNG/JPG em `client/public/assets/`.
2. Sempre i18n nos quatro idiomas para UI nova.
3. `ResolvedEffects` usa fração; itens guardam percentuais inteiros. Não dividir duas vezes.
4. Limpeza de sprite: usar `tools/sprite_clean.py`; nunca remover branco globalmente.
5. `tools/gen_skills.mjs` é fonte de verdade de `skills.ts` e das 70 skills.

## Equipamento, elementos e glifos

- Existem **10 categorias de arma principal** e **70 skills** (7 por arma).
- Mão secundária é exclusiva para glifos. Armas, escudos, orbes e tomos off-hand
  foram removidos; saves legados limpam o slot sem apagar o item da mochila.
- Elementos: fire, earth, water, wind, dark e light.
- Counters: água > fogo > vento > terra > água; dark ↔ light.
- Fusão por glifo: gelo, tempestade, natureza, magma, névoa e poeira; +10% dano.
- `LayeredCharacter` renderiza glifo e aura; `OffHandLayer` aceita apenas glifos.
- Stamps: craft garantido; quest 35%; loja 18%; cache e baú de exploração 25%.

## Visuais atuais

- 70/70 skills possuem configuração visual em `components/effects/skillVisuals.ts`.
- Água, Sombrio e Luz têm arte própria T1–T3 para feminino e masculino.
- Fogo, Terra e Vento têm arte própria T2 para feminino e masculino.
- Overlays neutros T1/T2/T3/sprint resolvem o PNG correto; poses sem âncora própria
  usam offsets seguros para walk/cast/hit/death.
- Relíquias próprias: Eclipse, Espadão (`w2h_1505`) e Cajado de Batalha (`w2h_1755`).
- `npm run audit:assets` valida 137 overlays e definições de assets elementais.

## Robustez entregue

- Party/trade persistem em Mongo e são restaurados no boot com banco real.
- Healthcheck detalhado: banco, status, uptime e jogadores online.
- Pino para logs estruturados no server.
- Telemetria local (sem PII): combate, exploração, craft e upgrade; até 500 eventos.
- Painéis de jogo são lazy-loaded; bundle inicial ~621 KB bruto / ~177 KB gzip.

## Próximas prioridades reais

1. Validar visualmente no Modo Sandbox glifo neutro, fusões e poses de combate.
2. Criar anchors desenhados por categoria e arte T1/T3 própria para fogo/terra/vento.
3. Testes de integração de rotas com Mongo real/Atlas; ambiente atual bloqueia o binário do Mongo memory server.
4. Deploy Atlas/Railway/Vercel e teste com duas contas (depende das contas externas do dono).
