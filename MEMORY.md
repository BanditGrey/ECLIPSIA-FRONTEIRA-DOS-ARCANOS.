# 🧠 MEMÓRIA OPERACIONAL — ECLIPSIA: FRONTEIRA DOS ARCANOS

> **Atualizada em 2026-08-09.** Esta é a memória operacional curta do projeto.
> Para a arquitetura e regras de negócio, leia `PROJECT_MEMORY.md`; para o plano,
> `ROADMAP.md`; para o contrato de skills, `SKILLS_SYSTEM.md`.

## Estado confirmado

- **Branch da sessão:** `arena/019fe704-eclipsia-fronteira-dos-arcanos`.
  Nunca trocar de branch: as referências a branches antigas em documentos históricos
  não são instruções vigentes.
- Stack: React 18 + TypeScript + Vite + Zustand / Express + Socket.io + MongoDB.
- Idiomas obrigatórios em toda interface: `pt-BR`, `en-US`, `es-ES`, `ja-JP`.
- Formato de item no wire: `itemStr` — `numId|effectId:value|...`.
- Mercado, leilão, trade e correio de valor usam 💎 **crystals**, não ouro.
- Sem Mongo disponível no sandbox, o backend degrada para mock; o login oferece
  **Modo Sandbox** para testar o cliente com inventário rico.

## Bootstrap e validação

```bash
cd /home/user/ECLIPSIA-FRONTEIRA-DOS-ARCANOS.
git branch --show-current
cd client && npm install
cd ../server && npm install
cd ../client && npx tsc --noEmit && npm run build && npm run audit && npm run audit:social && npm run audit:balance
cd ../server && npm test
```

`node_modules` não persiste entre sessões. Os baselines históricos esperados são:
TypeScript limpo, build Vite OK, ItemEffects **89/89**, social **41/41**, auditoria
de balanceamento OK e testes do servidor OK. Registre qualquer diferença real antes
de prosseguir.

## Regras inegociáveis

1. Toda string visível deve usar i18n nos quatro idiomas.
2. Não usar SVG inline, paths, Canvas geométrico ou polígonos em código para
   sprites, ícones, armas, glifos, escudos e fundos. Assets visuais são PNG/JPG
   estáticos em `client/public/assets/`.
3. Nunca remover branco globalmente ao limpar sprites. Use
   `tools/sprite_clean.py` (flood-fill de borda conservador + nibble de fringe).
4. `ResolvedEffects` trabalha com percentuais em fração; o item armazena inteiros.
   Não dividir percentuais duas vezes.
5. `tools/gen_skills.mjs` é a fonte de verdade de `data/skills.ts` e do bloco
   de i18n das 98 skills.
6. Não apagar assets por simples busca textual: paths podem ser montados em runtime.

## Sistema de elementos e glifos

- Elementos: `fire`, `earth`, `water`, `wind`, `dark`, `light`.
- Counters: água > fogo > vento > terra > água; sombrio ↔ luz.
- Fusão por glifo: água+vento=gelo, fogo+vento=tempestade,
  terra+água=natureza, fogo+terra=magma, fogo+água=névoa,
  terra+vento=poeira.
- O combate já aplica counter/desvantagem e bônus de fusão (+10%) em
  `systems/combat.ts`.
- Os catálogos e resolvers existem em `data/glyphs.ts`, `data/fusionAuras.ts`,
  `data/elementSynergy.ts` e `components/ui/OffHandLayer.tsx`.

### Estado confirmado da entrega visual

`LayeredCharacter.tsx` agora renderiza `OffHandLayer` para escudos/glifos e uma aura
radial ancorada na arma quando `resolveFusion` encontra uma combinação. A resolução
do catálogo de glifo também funciona quando o off-hand chega como `itemStr`.

## Próximas prioridades

1. Renderizar e validar visualmente off-hand e aura de fusão no `LayeredCharacter`.
2. Validar arma elemental + glifo no Modo Sandbox e preservar o bônus de combate.
3. Evoluir `SkillEffectPanel` de três efeitos genéricos para configurações por
   `skillId`, começando pelas skills principais mapeadas em `SKILLS_SPRINT.md`.
4. Depois: stamps elementais em shop/quest/baús, tiers/anchors ainda faltantes e
   balanceamento com telemetria real.

## Limpeza feita em 2026-08-09

- Removida a árvore `public/assets/audio/`: ela não era servida pelo Vite, que
  serve `client/public/`, e continha placeholders minúsculos.
- Removidos BGM/voz e `attack_real.mp3` sem consumidores no cliente.
- Removidos `raw_mob_*.png` sem referência em código ou ferramentas; as sprites
  finais `monster_*` foram preservadas.
- Fontes `raw_shield.png` e `raw_glyph_*.png` foram preservadas porque
  `tools/gen_final_offhands.js` ainda as utiliza.
