# SPRINT — FX VISUAL DAS 70 SKILLS

> **Concluída em 2026-08-09.** O catálogo atual tem 10 armas principais e 70
> skills. A mão secundária é exclusiva para glifos, portanto não existem skills
> de escudo, orbe, tomo ou adaga off-hand.

## Implementação

- Configuração central: `client/src/components/effects/skillVisuals.ts`.
- Cobertura: **70/70 IDs ativos**.
- Integração: `SkillEffectPanel.tsx` resolve visual por `skillId`, mantendo áudio,
  partículas, crítico e encerramento do cast compartilhados.
- Estilos: corte, giro, cruzado, flurry, flecha, chuva, arcano, gelo, raio, cura,
  barreira, impacto, lança, marca, fumaça, vazio, guarda e espinhos.
- Fallback por `damageType` permanece para segurança de skills futuras.

## Regras

- Não usar SVG inline ou Canvas geométrico para assets novos.
- Manter `castId` para casts consecutivos não travarem o painel.
- Ao criar skill nova: adicionar `SkillVisualConfig`, executar `node tools/gen_skills.mjs`,
  `npm run audit:balance` e `npm run build`.

## Próximo refinamento

Ajuste visual manual em Sandbox: escala, posição, duração e paleta das skills de
maior uso conforme feedback de jogo.
