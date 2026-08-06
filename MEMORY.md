# 🧠 MEMÓRIA DO PROJETO — ECLIPSIA: FRONTEIRA DOS ARCANOS
> Última atualização: **2026-08-06 (handoff — sessão visuais/elementos)**
> Branch atual: **`arena/019fd6a8-eclipsia-fronteira-dos-arcanos`**

## 🚀 HANDOFF — COMO CONTINUAR EM OUTRA CONVERSA (leia primeiro)
1. `git branch --show-current` + `git log --oneline -3`. O `.git` do sandbox pode
   resetar entre sessões: se faltar commit local, `git fetch origin <branch>` e
   `git reset --mixed FETCH_HEAD` (os arquivos persistem, o .git às vezes não).
2. `cd client && npm install` · `cd server && npm install` (node_modules NÃO persiste).
   Python p/ sprites: `pip install --break-system-packages Pillow numpy scipy`.
3. Leia esta MEMORY.md INTEIRA (sistema de visuais/elementos) + PROJECT_MEMORY.md
   (ItemEffects/social/auditorias) + a seção ⚠ ARMADILHAS de cada uma.
4. Baselines OBRIGATÓRIOS antes/depois de mexer: `npx tsc --noEmit` ·
   `npm run build` · `npm run audit` (**89/89**) · `npm run audit:social` (**41/41**) ·
   server `npm test` (**18/18**). A auditoria bloco 8 usa janela de 1200 chars em
   combat.ts — não insira blocos grandes entre `start()` e `calculatePlayerStats`.
5. Siga o PLANO na ordem e mova itens entre ✅ FEITO / ⏳ PENDENTE ao terminar.
6. Sandbox sem MongoDB real (fastdl bloqueado): backend degrada p/ mock sozinho;
   teste o jogo pelo botão "► ENTRAR (MODO SANDBOX)" do login (inventário rico).

## 🗺️ PLANO DO SISTEMA DE VISUAIS/ELEMENTOS (prioridade)
1. ✅ Stamps de elemento no craft (`rollElementForWeapon`; avançados só épico+).
2. ✅ Sinergia em combate (`element` nos inimigos + counter ×1.25 + log i18n).
3. ⏳ **GLIFOS de off-hand**: rework do slot (espada+escudo coerente); glifo dá
   2º elemento; fusão (`elementSynergy.fusionOf`, água+vento=GELO…) vira camada
   de AURA ao redor da arma (overlay extra, sem mudar a arte da arma).
4. ⏳ Arte: overlays t1/t3 de terra/vento/água/sombrio/luz · artes PRÓPRIAS de
   água/sombrio/luz (hoje reusa gelo/sombra/sagrada) · overlays male · anchors
   de attack/walk/cast · gerar com `generate_image` + limpar com
   `tools/sprite_clean.py` (nunca remover branco globalmente!).
5. ⏳ Stamps em shop/quests/baú · relics próprias além da `w1h_1010` ·
   balancear `POWER_BY_TIER` e `COUNTER_MULTIPLIER`.

## 💬 PROMPT P/ PUXAR O CONTEXTO E CONTINUAR
> "Continue o projeto ECLIPSIA. Leia primeiro a seção 🚀 HANDOFF da MEMORY.md e a
> PROJECT_MEMORY.md, rode o bootstrap (npm install client+server, baselines
> 89/89 · 41/41 · 18/18) e siga o 🗺️ PLANO no item 3: GLIFOS de off-hand (rework
> do slot, glifo = 2º elemento, fusão vira aura visual ao redor da arma via
> elementSynergy.fusionOf). Mantenha FEITO/PENDENTE da MEMORY atualizado, não
> quebre baselines e commit/push na branch arena/ da sessão."

---

## 🔧 SESSÃO DE CORREÇÕES (2026-08-06)
Baselines antes: tsc OK · build OK · 89/89 · **40/41 social (1 MISSING)** · 18/18 · balance OK.
Correções aplicadas (baselines depois: **89/89 · 41/41 · 18/18 · build OK**):
1. **CombatPanel: barra da caçada de party tinha regredido** (hardcoded em inglês, sem
   auras/bônus/contribuições) → restaurada com `auraAtk/auraDef`, `sizeBonus`, andar,
   ranking de contribuições e aviso de região, tudo via i18n `partyCombat.*` (4 idiomas).
   Auditoria social voltou a 41/41.
2. **Bug de balanceamento em `systems/combat.ts`**: `defBonus += activeSession.auraDef`
   somava percentual inteiro (0-100) numa fração 0-1 → dano recebido caía ~16x com aura.
   Corrigido para `auraDef / 100`.
3. **Áudio quebrado (404)**: componentes usam `/assets/audio/*.mp3`, mas os arquivos
   estavam em `public/` na RAIZ (não servido pelo Vite) e eram placeholders de texto.
   Copiados para `client/public/assets/audio/` + **5 SFX reais sintetizados**
   (attack/crit/heal/levelup/loot — script `/home/user/gen_sfx.py`, lameenc+numpy).
   BGM/voz seguem placeholder (não são referenciados no código).
4. **Backend caía sem MongoDB** (`process.exit(1)` quando o mongodb-memory-server não
   consegue baixar o binário — `fastdl.mongodb.org` é bloqueado neste sandbox).
   `database.js` agora degrada para modo mock + `isDbReady()`; `server.js` responde
   503 amigável nas rotas de banco e pula restauração de sessões (jogo segue no
   Modo Sandbox do login). Com `MONGO_URI` real nada muda.
5. **Índice duplicado** `{name:1}` no modelo Guild (unique + schema.index) removido.
6. **LoginScreen com strings hardcoded em PT** → i18n novo `login.sandboxMode/
   offlineError/networkError/wikiButton/serverOffline/onlineWord` nos 4 idiomas.
7. **AutoConfigModal**: botão Salvar não fazia nada → agora fecha o modal.
8. **Sprites "meio invisíveis" CORRIGIDAS**: limpezas antigas comeram brancos
   legítimos (lâmina da espada no attack, highlights) — 17 sprites afetadas
   (12 da base jogador + goblin idle/attack, rat idle, wolf_pup idle/attack).
   Recuperação: `git fetch --unshallow origin main` + `/home/user/fix_sprites.py`
   (pega a 1ª versão commitada, que ainda tem o conteúdo inteiro sob xadrez
   semi-transparente alpha 104–145/RGB~236; remove SÓ o xadrez cinza-claro e
   preserva o resto: alpha≥200→255, AA colorido com boost). **NUNCA mais remover
   "branco puro" globalmente** — foi isso que comeu as lâminas. Sprites limpas
   por flood-fill conservador (mist_wolf, sea_wraith, etc.) são detectadas e
   poupadas automaticamente (xadrez ≤2%).
9. **SISTEMA DE VISUAIS DE EQUIPAMENTO (v1)** — `data/equipmentVisuals.ts`:
   item do catálogo → chave visual; `LayeredCharacter` resolve
   `eq_<key>_<gender>_<state>_<n>.png` com prioridade **armadura > arma > base**
   (variantes full-body exclusivas; pose sem variante cai na base por design).
   Mapeados: `ch_3000`→leather, `ch_3002`→iron, `w1h_1001`→sword, `w1h_1150`→staff.
   8 sprites geradas (couro/cota de ferro M+F idle, cajado M+F idle,
   espada M idle, couro F attack) e limpas com `/home/user/remove_bg2.py`
   (flood das bordas, NUNCA branco global). Sandbox (`playOfflineMock`) agora
   equipa itens REAIS (hd_2500/ch_3000/lg_3500 — os `ar_*` antigos não existiam!)
   e libera ch_3002/w1h_1001/w1h_1150 no inventário p/ testar.
   Futuro: overlays combináveis + mais poses/gêneros (cota de imagens ~10/sessão;
   edits da base feminina às vezes caem na moderação — reformular p/ "fully covered").
   **Paperdoll do ItemsPanel agora mostra o LayeredCharacter equipado** (antes era o
   retrato da classe) + corrigido `classes.*`→`archetypes.*` (chave inexistente
   aparecia crua na tela) + `items.emptyBag` i18n 4 idiomas.
10. **FX de skill "travava"** (banner WAR CRY ficava na tela e o personagem preso em
    cast sem armadura): o `useEffect` do SkillEffectPanel tinha deps instáveis
    (`onComplete`/`audio` novos a cada render do CombatPanel → timer reiniciava
    sem nunca concluir). Corrigido com `onCompleteRef` + deps `[skillId, castId]`;
    store ganhou `castId` (incrementa por cast) e o CombatPanel dá `key={castId}`
    p/ re-disparar casts seguidos. **Armadura não some mais em cast/hit/walk**:
    `resolveEquippedSprite` cai no IDLE do equipamento antes da base.
    **Modal de skills agora recolhe sozinho** ao usar uma skill (closeModal).
11. **10 VISUAIS DE ARMA (jogadora segurando)** + recorte melhorado:
    - Armas mapeadas: w1h_1001 sword · w1h_1005 eclipse · w1h_1100 dagger ·
      w1h_1150 staff · w1h_1200 bowshort · w2h_1500 greatsword · w2h_1600 hammer ·
      w2h_1650 spear · w2h_1700 bowlong · w2h_1750 greatstaff (todas female idle,
      geradas SOBRE a leather p/ parecer combinado; male = fallback base).
    - **Prioridade agora é ARMA > ARMADURA** (o usuário quer ver a arma na mão).
    - Recorte: `remove_bg2.py` ganhou `nibble_fringe` (rói halo claro de AA na
      borda, 3 passadas) — franjas brancas das eq_* antigas foram re-limpas.
    - Sandbox: as 10 armas + 2 armaduras no inventário (w2h_1600 já estava).
    - Lição de recorte: bolsões brancos PRESOS entre arma e corpo não conectam
      na borda → o flood não pega; nesses casos remover pure-white isolado
      (min>238) pontualmente + nibble (caso do cajado).
12. **EXPANSÃO DE ARMADURAS**: +5 tipos (M+F idle, geradas "fully covered" sobre a
    base p/ evitar moderação): ch_3001 padded · ch_3003 guard (tabardo azul) ·
    ch_3004 shadow · ch_3005 legendary (placas douradas) · ch_3102 mist (manto
    teal de mago). Total de armaduras com visual: 7. Sandbox libera todas no bag.
13. **🎨 SISTEMA DE VISUAIS DE EQUIPAMENTO — estado FEITO / PENDENTE**
    Última revisão: roda oficial de 6 elementos + elements como effects próprios.

    ✅ FEITO:
    - Roda oficial (6): básicos **fire · earth · water · wind** (anel de counter
      água>fogo>vento>terra>água) + avançados rivais **dark ↔ light**
      (`data/elementSynergy.ts`: counters + COUNTER_MULTIPLIER 1.25 + tabela de
      FUSÕES p/ glifos: água+vento=GELO, fogo+vento=tempestade, etc.).
    - **Elemento = effect próprio** no registry: 12–17 (ELEMENT_FIRE..LIGHT),
      value = PODER (tiers sugeridos <25 T1 · <50 T2 · 50+ T3 — balancear depois);
      names 4 idiomas + describeEffect mostra "Fogo · T2 (35)". Audit check 1
      atualizado p/ 90 definidos + 10 reservados.
    - v2 camadas: corpo (armadura/base) + overlay da arma (`weaponOverlays.ts`,
      anchor por gênero/pose). Toda arma × todo elemento × toda armadura.
    - Arte: 7 armaduras M+F · overlays fogo t1-3 + terra/vento/água/sombrio(→shadow)/
      luz(→holy) t2 + steel · full-body legado da roda antiga reusado p/ água/
      dark/light · relic própria w1h_1010 · 10 armas únicas full-body (v1 legado).
    - Sandbox: stamps demo "1500|13:35" (terra T2) · "1504|12:60" (fogo T3) ·
      "1103|16:35" (sombrio) · "1204|14:60" (água T3) + todas armaduras/armas.
    - Paperdoll do ItemsPanel mostra o personagem; chip ✦ elemento no detalhe;
      i18n elements.* (6) + fusions.* (6) nos 4 idiomas.
    - `tools/sprite_clean.py` no repo (flood bordas + nibble; nunca branco global).
    - **Stamps no craft**: `rollElementForWeapon(rarity)` — arma craftada nasce
      c/ elemento rolado (básicos sempre; dark/light só épico+), poder no tier da
      raridade (POWER_BY_TIER). FIX junto: craft checava bolsa DEPOIS de gastar
      materiais — agora checa antes (isInvFull).
    - **Sinergia em combate**: monstros/bosses c/ campo `element` (12 monstros +
      5 bosses atribuídos) · counter ×1.25 / desvantagem ÷1.25 no dano do
      jogador (getPlayerDamage) · log de vantagem/desvantagem no início do
      combate (i18n 4 idiomas).

    ⏳ PENDENTE:
    - **Glifos de off-hand** (design do usuário): rework do slot off-hand p/
      aceitar glifos que dão 2º elemento + fusão vira camada de AURA ao redor da
      arma (sem mudar a arte); incluir "espada+escudo" coerente no slot.
    - (feito ↓) stamps no craft · sinergia em combate · elementos nos inimigos.
    - **Stamps de elemento em shop/quests/loot de baú** (craft já faz).
    - Overlays: t1/t3 de terra/vento/água/sombrio/luz · anchors attack/walk/cast ·
      overlays male · arte própria de água/sombrio/luz (hoje reusa gelo/sombra/sagrada).
    - Tiers masculinos full-body das armaduras já existem; male elemental = overlay.
    - Relics próprias além da 1010 · balanceamento dos poderes (valores dos tiers).
    - `tools/sprite_clean.py` AGORA VIVE NO REPO (scripts em /home/user somem
      entre sessões): flood das bordas + nibble_fringe; nunca branco global.

### ⚠ Ambiente do sandbox (2026-08-06)
- Rede só alcança: registry.npmjs.org, github.com, api.github.com, codeload.github.com,
  pypi.org. **fastdl.mongodb.org, deb/ubuntu, jsdelivr, nodejs.org = BLOQUEADOS.**
- Sem `MONGO_URI` não dá para subir MongoDB real aqui (binário não baixa). Para testar
  online de verdade: definir `MONGO_URI` (Atlas) no `server/.env` ou usar o Modo Sandbox
  do botão de login (100% client-side).
- `gh` para rede externa foi bloqueado pelo sandbox nesta sessão.

---

## ⚡ ESTADO ATUAL (RESUMO RÁPIDO)

MMORPG idle/turn-based full-stack (React+Vite+Zustand / Express+Socket.io+Mongo).
4 idiomas: pt-BR, en-US, es-ES, ja-JP. Estilo JRPG / Final Fantasy clássico.
**Layout de combate: JOGADOR NA ESQUERDA, MONSTRO NA DIREITA** (invertido nesta sprint).

### Build status: ✅ OK
```
client: 166 modules, ~923 KB JS / 80 KB CSS, 0 TS errors
(1 warning: chunk > 500 KB — pendente code-splitting)
```

### O que está FUNCIONANDO:
- ✅ Combate FF-style (player esquerda, monstro direita, menu embaixo)
- ✅ 14 sprites do jogador limpas (fundo transparente)
- ✅ 39 sprites no total (14 jogador + 25 monstro em disco)
- ✅ 26 monster skills integradas (2 por monstro, cooldown tracking)
- ✅ Animações CSS: idle, walk, attack lunge+slash VFX, hit flash+shake, death rotation, spawn scale, skill2 aura, crit shake
- ✅ FloatingCombatText posicional (player left / enemy right / center), CRIT! maior com glow
- ✅ ProgressBar com transição suave (`transition-[width] duration-500 ease-out`)
- ✅ Screen shake leve/pesado conforme dano (leve ≥8, pesado ≥25 ou crit)
- ✅ Glow elemental por monstro (MONSTER_GLOW mapeado para os 13)
- ✅ CombatOutcomeScreen animado: vitória com selo dourado + chest pop-in, derrota com fade
- ✅ Painéis Ranking/Travel/Wiki com PanelBackdrop CSS (sem JPG)
- ✅ ItemIcon (49+ SVGs) incluindo greataxe + raridade `relic` (#ef4444)
- ✅ SkillIcon (26 SVGs) integrado em CombatPanel/SkillsModal
- ✅ Helpers `utils/itemIcon.ts` e `utils/skillIcon.ts`
- ✅ CharCreateScreen / HubPanel / ProfilePanel com LayeredCharacter
- ✅ Vite dev server na porta 5173 (bind 0.0.0.0)

---

## 📁 ARQUIVOS CRÍTICOS

### Sprites: `client/public/assets/sprites/` — 39 arquivos
**Jogador (14):** 7 M + 7 F (idle_1, idle_2, walk_1, attack_1, hit_1, cast_1, death_1)
**Monstros (25):** ver tabela detalhada abaixo

### Script de limpeza: `/home/user/remove_bg.py`
- Usa **Pillow + numpy + scipy.ndimage** (instalar com `pip install --break-system-packages Pillow numpy scipy`)
- Algoritmo: flood-fill 8-directional das BORDAS inteiras (não só 4 cantos)
- Remove pixels onde: alpha<220 **OU** saturação<32 (cinza/xadrez) **OU** branco puro
- **Conservador**: NÃO remove pixels semi-transparentes COLORIDOS (preserva névoas, sombras, halos)
- ⚠️ **NÃO usar a passada 2 agressiva** (expansão de halo) — ela comeu pixels de borda em sprites com névoa colorida (mist_wolf) na sessão de hoje

### Componentes UI principais
```
client/src/components/
├── ui/
│   ├── MonsterLayered.tsx   — 13 monstros, flip=true default (monstro olhando p/ esquerda),
│   │                           resolveSprite com fallback cascata -> idle -> goblin_idle,
│   │                           preload idle/attack/hit, VFX slash/aura/hit
│   ├── LayeredCharacter.tsx — Jogador (paperdoll); GLOW AINDA HARDCORADO #3fd9c4 teal
│   ├── ItemIcon.tsx         — 49+ ícones + raridade relic
│   ├── SkillIcon.tsx        — 26 ícones
│   ├── PanelBackdrop.tsx    — temas ranking/travel/wiki (CSS puro)
│   └── ProgressBar.tsx      — transição suave de width
├── panels/
│   ├── CombatPanel.tsx      — layout invertido, screen shake, MONSTER_GLOW, crit player
│   ├── RankingPanel.tsx     — backdrop ranking (dourado/pilares)
│   ├── TravelPanel.tsx      — backdrop travel (esmeralda/sol poente/montanhas)
│   └── WikiScreen.tsx       — backdrop wiki (teal/púrpura/dourado/poeira)
└── effects/
    ├── FloatingCombatText.tsx  — posicional por lado, CRIT! maior
    └── CombatOutcomeScreen.tsx — vitória/derrota animados com ArcaneIcon chest
```

### Keyframes em `client/src/index.css`:
`eclipsiaShake`, `eclipsiaCritShake`, `eclipsiaFloat`, `eclipsiaFloatCrit`,
`eclipsiaVictoryPop`, `eclipsiaVictoryTitle`, `eclipsiaDefeatIn`, `shineSweep`
+ keyframes inline no MonsterLayered (`mlIdle`, `mlWalk`, `mlAttack`, `mlSkill2`, `mlHit`, `mlDeath`, `mlSpawn`, `mlSlash`, `mlAura`, `mlHitFlash`).

---

## 🧌 TABELA COMPLETA DE SPRITES DE MONSTRO EM DISCO

Legenda: ✅ existe em disco · 🟡 só hit/attack parcial (faltam outras poses) · ❌ ausente

| Monstro | idle_1 | walk_1 | attack_1 | hit_1 | death_1 | idle_2 |
|---|---|---|---|---|---|---|
| goblin (lvl 3) | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| rat (lvl 1) | ✅ | ❌ | ✅ (novo!) | ✅ | ❌ | ❌ |
| wolf_pup (lvl 5) | ✅ | ✅ (novo!) | ✅ | ✅ (novo!) | ❌ | ❌ |
| mist_wolf (lvl 12) | ✅ (novo!) | ❌ | ✅ (novo!) | ✅ | ❌ | ❌ |
| shadow_sprite (lvl 14) | ✅ (novo!) | ❌ | ✅ (novo!) | ✅ | ❌ | ❌ |
| sand_scorpion (lvl 22) | ✅ (novo!) | ❌ | ✅ (novo!) | ✅ | ❌ | ❌ |
| mirage_beast (lvl 26) | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| dune_crawler (lvl 30) | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| storm_harpy (lvl 56) | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| cloud_titan (lvl 64) | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| sea_wraith (lvl 42) | ✅ (novo!) | ✅ (novo!) | ✅ (novo!) | ✅ (novo!) | ❌ | ❌ |
| deep_leviathan_jr (lvl 48) | ✅ (novo!) | ✅ (novo!) | ❌ | ❌ | ❌ | ❌ |
| forest_golem (lvl 18) | ✅ (novo!) | ✅ (novo!) | ✅ (novo!) | ❌ | ❌ | ❌ |

**Novas nesta sessão (2026-08-05/06):** 13 sprites (10 lote 1/2 + deep_leviathan_x2 + forest_golem_hit + sea_wraith_hit + base male/female reprocessados)

**Total em disco:** 14 jogador + 25 monstro = **39 sprites**.

---

## ⚠️ PROBLEMAS CONHECIDOS / PENDENTES

### 🔴 Críticos (quebram visual)
1. **Monstros SEM sprites em disco caem para o goblin_idle_1** (placeholder feio):
   - mirage_beast, dune_crawler, storm_harpy, cloud_titan (só tem hit_1)
   - sea_wraith, deep_leviathan_jr (NÃO TEM NENHUMA SPRITE)
   - O `resolveSprite` faz fallback mas o monstro renderizado fica como goblin — confuso.

2. **Divergência de ESTILO/COR entre sprites**:
   - As 14 sprites do jogador + goblin/rat/wolf_pup antigos têm estilo **pintado a mão JRPG Yoshida-like** (sem outline preto grosso, paleta mais suave)
   - As sprites novas geradas hoje (mist_wolf, shadow_sprite, sand_scorpion, forest_golem, wolf_pup_walk/hit) têm **estilo cartoon com outline preto grosso** — destoam das demais
   - Problema: os prompts com "JRPG painterly" às vezes geram estilo cartoon. **Solução na próxima sessão**: incluir *uma sprite do jogador* como referência de estilo em TODO prompt de monstro, para forçar consistência.

3. **`mist_wolf_idle_1` e `monster_mist_wolf_attack_1`** têm névoa azul-clara com resíduos de xadrez (a limpeza conservadora não pega porque a névoa tem saturação >32); visualmente imperceptível em jogo (128px), mas visível em zoom.

### 🟡 Médios
4. ✅ **Glow do jogador dinâmico** `LayeredCharacter` — agora `glowColor` muda conforme `damageType`: physical=`#ef4444`, magical=`#3b82f6`, void=`#9333ea`, default=`#3fd9c4` (CombatPanel atualizado)
4b. ✅ **SKILLS_SPRINT.md** — 98 skills mapeadas (físico/mágico/suporte) com cor/efeito/partícula; base de VFX (slash/burst/shield) definida
4c. ✅ **Code-splitting iniciado** — React.lazy Hub/Ranking/Travel/Wiki/Items; chunk 923→839 KB; build OK
5. **Bosses (bandit_leader, root_guardian, void_mirror, azhur, thal_mora, velkaryn)** usam Portrait (não MonsterLayered) — ok, mas confirmar assets.
6. **forest_golem não tem hit_1** (aparecerá como idle quando levar dano).
7. **Code-splitting** pendente (chunk 923 KB > 500 KB warning).
8. **TravelPanel dungeon rewards** ainda usam `item.icon` string em vez de ItemIcon (pequeno).

### 🟢 Baixos
9. **Animações extras** pendentes: spawn (existe mas não é usada em fluxo), dash/esquiva, idle_2 (variação).
10. **death_1 / idle_2** para quase todos os monstros.
11. **walk_1** só existe para wolf_pup.
12. **sea_wraith e deep_leviathan_jr** não têm hit_1.

---

## 📋 PRÓXIMOS PASSOS (ORDEM DE PRIORIDADE)

### Sessão seguinte — prioridade ALTA:
1. `cd client && npm install` (node_modules NUNCA persiste)
2. `pip install --break-system-packages Pillow numpy scipy` (recuperar Python deps)
3. Recriar `/home/user/remove_bg.py` se ele não existir (usar versão conservadora do MEMORY, com saturação 32, flood-fill 8-dir das bordas, SEM passada agressiva de halo)
4. `cd client && npm run build` para confirmar baseline
5. **Gerar 10 sprites (cota da sessão)** — seguir prioridade:
   - **Lote 1 (URGENTE, monstros que parecem goblin no lugar):**
     - `monster_mirage_beast_idle_1` e `attack_1`
     - `monster_dune_crawler_idle_1` e `attack_1`
     - `monster_storm_harpy_idle_1` e `attack_1`
     - `monster_cloud_titan_idle_1` e `attack_1`
   - **Lote 2 (monstros sem NADA):**
     - `monster_sea_wraith_idle_1`
     - `monster_sea_wraith_attack_1`
   - **Lote 3 (se sobrar cota):** `monster_deep_leviathan_jr_idle_1`
6. **Prompt base consistente para forçar estilo igual ao jogador**: incluir `base_male_idle_1.png` ou `base_female_idle_1.png` como referência de ESTILO em TODO generate_image! Isso deve corrigir a divergência de cor/estilo.
7. Rodar `remove_bg.py` em TODAS as novas sprites.
8. Atualizar `resolveSprite` no MonsterLayered.tsx.
9. `npm run build` para validar.
10. Subir dev server e **verificar visualmente em http://localhost:5173** cada novo monstro no bestiary/combate.

### Depois (médio prazo):
- Gerar `hit_1` para forest_golem, sea_wraith, deep_leviathan_jr.
- Gerar `walk_1` para os 7 monstros de início (goblin, rat, mist_wolf, shadow_sprite, sand_scorpion, mirage_beast, dune_crawler).
- Refazer as sprites com estilo "cartoon outline" (mist_wolf, shadow_sprite, sand_scorpion, forest_golem) usando referência do jogador.
- Glow colorido do player por elemento da skill.
- Code-splitting (React.lazy dos painéis: Hub, Ranking, Travel, Wiki, Inventory).
- Trocar `item.icon` string por `<ItemIcon>` no TravelPanel.
- Spawning animation realmente usada em fluxo (antes: mostra idle, hoje já entra em idle direto).

### Longo prazo:
- death_1 para todos os 13 monstros (kneeling defeated, sem "dying")
- idle_2 para todos (variação de respiração)
- pino logs no servidor
- testes automatizados
- balanceamento com telemetria
- deploy (Railway + Atlas + Vercel)

---

## 🔧 COMANDOS IMPORTANTES

```bash
cd /home/user/ECLIPSIA-FRONTEIRA-DOS-ARCANOS.

# Setup inicial (SEMPRE no começo da sessão):
pip install --break-system-packages Pillow numpy scipy   # para remove_bg.py
cd client && npm install

# Build (após QUALQUER mudança):
cd client && npm run build

# Limpar UMA sprite:
python3 /home/user/remove_bg.py client/public/assets/sprites/<arquivo>.png
# Limpar TODAS as sprites em lote:
cd client/public/assets/sprites
for f in *.png; do python3 /home/user/remove_bg.py "$f" "$f"; done

# Dev server:
cd client && npx vite --host 0.0.0.0 --port 5173

# Git (não esquecer de commitar as sprites novas!):
git add -A
git commit -m "feat: ..."
git push origin arena/019fd3c8-eclipsia-fronteira-dos-arcanos
```

---

## ⚠️ ARMADILHAS CONHECIDAS

1. **`node_modules` NÃO persiste** entre sessões — reinstalar sempre!
2. **`/home/user/remove_bg.py` e Python deps (Pillow/numpy/scipy) também NÃO persistem** — recriar/reinstalar a cada sessão a partir da versão descrita neste MEMORY.md.
3. **Filtro de conteúdo** bloqueia "morte/dying" — usar `kneeling defeated` para poses de death.
4. **Limite de ~10 imagens geradas por sessão** — planejar com cuidado.
5. **Nome do repo termina com `.`** — `ECLIPSIA-FRONTEIRA-DOS-ARCANOS.` (o ponto faz parte).
6. **Branch FIXA**: `arena/019fd3c8-eclipsia-fronteira-dos-arcanos` — não criar/mudar para outra. Push sempre nesta.
7. **Alguns arquivos parecem "resetar" entre sessões** (MonsterLayered, CombatPanel, FloatingCombatText, CombatOutcomeScreen, index.css keyframes, itemIcon/skillIcon, PanelBackdrop, ItemIcon) — verificar o conteúdo real antes de assumir que o trabalho persistiu. O commit `9edfd65` + force-push deve ter sido definitivo, mas confira com `git log --oneline -5` e `git status`.
8. **Layout de combate é invertido**: jogador na ESQUERDA (`flip={false}` em LayeredCharacter), monstro na DIREITA (`flip={true}` default em MonsterLayered).
9. **Algoritmo de limpeza**: usar VERSÃO CONSERVADORA (só pass1 — flood das bordas, sat<32, alpha<220). Não adicionar passada de expansão de halo que come pixels coloridos semi-transparentes (névoas, sombras).
10. **VFX de slash** está posicionado em `left: '-35%%'` — funciona com flip espelhado pois o container tem scaleX(-1).
11. **FloatingCombatText posicional**: player `left-[25%]`, enemy `right-[25%]`, center `left-1/2 -translate-x-1/2`.
12. **Divergência de estilo** é um problema REAL — sempre incluir uma sprite do jogador como referência de estilo ao gerar novos monstros, para que o modelo mantenha paleta/linhas consistentes.

---

## 📊 NÚMEROS ATUAIS

| Métrica | Valor |
|---|---|
| Sprites de jogador (transparentes) | 14/14 ✅ |
| Sprites de monstro em disco | **50** |
| Monstros com idle+attack+hit | 7/13 (goblin, rat, wolf_pup, mist_wolf, shadow_sprite, sand_scorpion) + forest_golem (s/ hit) |
| Monstros que caem em goblin-fallback | 6 (mirage, dune, harpy, titan, wraith, leviathan) |
| Monster skills configuradas | 26 (2 por monstro) ✅ |
| ItemIcon SVGs | 49+ (inclui greataxe + relic) ✅ |
| SkillIcon SVGs | 26 ✅ |
| PanelBackdrop themes | 3 (ranking/travel/wiki) ✅ |
| Keyframes eclipsia* | 8 (shake, critShake, float, floatCrit, victoryPop, victoryTitle, defeatIn, shineSweep) |
| Bundle JS | ~923 KB (code-splitting pendente) |

---

## 📝 NOTAS DA SESSÃO DE HOJE (2026-08-05)

- Usuário reportou: "ainda temos muitas sprites com xadrez e muita divergência de cor nas animações"
- Feito:
  - Recriado `remove_bg.py` em versão conservadora (scipy.ndimage flood 8-dir das bordas)
  - Reinstaladas Python deps
  - Rodada limpeza em TODAS as 39 sprites (29 pré-existentes + 10 novas)
  - Tentada versão agressiva (pass2 halo expansion) — **falhou**: comeu pixels pretos nas bordas de sprites com névoa (mist_wolf); revertido via `git checkout -- client/public/assets/sprites/` e re-limpo com versão conservadora
  - Geradas 10 sprites novas (cota total da sessão)
  - Atualizado `resolveSprite` no MonsterLayered com TODOs marcados para sprites ausentes
  - Build validado ✅
- **Corrigido**: `remove_bg.py` versão conservadora (flood 8-dir bordas, sat<5, alpha<220, white, black_bg)
- **Problema resolvido**: sprites escuras (shadow_sprite, mist_wolf, sand_scorpion, base male/female) não têm mais preto/escuro removido; fundo preto puro agora removido com segurança
- **Atualizado**: `MEMORY.md`, `MonsterLayered.tsx`, `build` OK, `push` OK (b401130 / e898da5)
- **Commit pendente**: as 10 sprites novas + limpezas + update no MonsterLayered ainda precisam ser commitados (o working tree está limpo para o código antigo mas tem 10 PNGs rastreados/adicionados; verificar com `git status` antes de commitar).

---
## 🔓 PRÓXIMA SEÇÃO (aberta para outro chat)
**Problema/Objetivo:** Expandir os 3 keyframes base (`eclipseSlashAnim`, `eclipseBurstAnim`, `eclipseShieldAnim`) para animações individuais por `skillId` (98 skills total) no `SkillEffectPanel` e `CombatPanel`. Cada skill deve ter sua própria cor/partícula/animação personalizada, não apenas por categoria. O arquivo `SKILLS_SPRINT.md` já contém o mapeamento completo. Próximo passo: criar `client/src/index.css` keyframes específicos para as 10 principais (slab, arcane_burst, heal_pulse, etc.) e integrar por `skillId` no componente.
