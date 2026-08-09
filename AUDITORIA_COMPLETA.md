# 📜 Auditoria visual histórica — Eclipsia

> **Arquivo reclassificado em 2026-08-09.** Esta auditoria descreve o estado
> inicial de 2026-08-04, anterior à reconstrução visual. Não deve ser usada como
> diagnóstico do estado atual.

## Estado atual resumido

- Sprites de jogador, monstros e bosses existem em `client/public/assets/sprites/`.
- Ícones de item, skill e HUD são assets estáticos, e o cenário de combate usa arte.
- Equipamento usa `LayeredCharacter`, overlays de arma e `OffHandLayer`.
- Partículas, outcome screen, feedback de dano e transições estão implementados.

## Pendências visuais reais

1. `LayeredCharacter` calcula, mas ainda não renderiza, `OffHandLayer` e a aura de
   fusão elemental.
2. `SkillEffectPanel` ainda agrupa efeitos por tipo (físico/mágico/vazio); a
   individualização por `skillId` é a próxima sprint.
3. Permanecem melhorias de cobertura: anchors/poses, tiers/overlays faltantes e
   arte elemental própria em pontos que ainda usam fallback.

Para o plano vigente, veja `ROADMAP.md`; para o padrão de assets, `PADRAO_AAA.md`.
