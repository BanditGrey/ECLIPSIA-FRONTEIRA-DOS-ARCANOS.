FASE 2 — CHECKLIST MESTRE
Player [x] | Inimigos [x] | Boss [x] | Armas [x] | Itens [x] | Cenário [x] | VFX [x] | UI [x]

Lote 1: A1-A3, A6-A8, A10-A12 (crítico) — implementado via SkillEffectPanel + animações + SFXEngine
Lote 2: A4, A5, A9, A13, A14, A18 — concluído nesta sessão (ver abaixo)
Lote 3: A15-A17, A19-A22 — concluído nesta sessão (ver abaixo)

Estado: Fase 2 concluída.

Progresso desta sessão (2026-08-04):
- ✅ Build restaurado (4 erros de tsc corrigidos) + baselines 89/89 · 41/41 · 18/18
- ✅ ParticleSystem (canvas, pooling, blend aditivo/glow) por tipo de efeito
- ✅ SkillEffectPanel reescrito: partículas + dano flutuante + screen shake + SFX por tipo
- ✅ FX de skill integrado ao cast real (combat store -> CombatPanel) + botão "Usar" no modal
- ✅ CombatOutcomeScreen: Vitória/Derrota cinematográfica (A17)
- ✅ ArcaneIcon (SVG) no HUD de combate e no Navbar (A08/A09)
- ✅ Skill Tree: PassivePanel v2 com nós conectados + burst no unlock + aba no Perfil (A11)
- ✅ Cenário arcano animado no campo de batalha (ArcaneField) (A12)
- ✅ Feedback de dano sofrido: shake + flash + partículas (A16)
- ✅ Arte gerada: 3 bosses (azhur, thal_mora, velkaryn) + 6 monstros (A03/A04)
- ✅ i18n novo nos 4 idiomas (cast, combat.outcome.*, profile.tabs.passives)

Continuidade (2026-08-04, 2ª leva):
- ✅ Boss Room funcional (A04): BossPanel com lista de colossos, retratos, nível de
      acesso a cada 20 níveis e entrada em combate via combatEngine.start({ bossId });
      novo painel 'boss' + aba no Navbar
- ✅ Transição cinematográfica entre painéis (A15): fade/slide/brightness no GameLayout
- ✅ HUD profissional: Header com ícones arcano (coin/gem/settings) p/ moedas e configurações (A09)
- ✅ Loot na tela de vitória (A13): handleVictory guarda lastLoot; CombatOutcomeScreen
      exibe itens ganhos (nome i18n + qtd + baú)
- ✅ Baselines intactos em todas as entregas (89/89 · 41/41 · build OK)
