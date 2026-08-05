# 🧠 MEMÓRIA DO PROJETO — ECLIPSIA: FRONTEIRA DOS ARCANOS
> Última atualização: 2026-08-05
> Branch: arena/019fcfc9-eclipsia-fronteira-dos-arcanos

---

## ⚡ ESTADO ATUAL (RESUMO RÁPIDO)

MMORPG idle/turn-based full-stack (React+Vite+Zustand / Express+Socket.io+Mongo).
4 idiomas: pt-BR, en-US, es-ES, ja-JP.

### O que está FUNCIONANDO:
- ✅ Combate estilo Final Fantasy (player direita, monstro esquerda, menu embaixo)
- ✅ Sprites do jogador com fundo transparente (14 sprites: 7M + 7F)
- ✅ Animações CSS (idle breathing 2FPS, walk bob, attack lunge+slash, hit flash, death, cast aura)
- ✅ 5 monstros com sprites reais (goblin, rat, wolf_pup + cloud_titan, storm_harpy via fallback)
- ✅ Monster Skills ativas no combate (35% chance/turno, cooldown tracking, 24 skills)
- ✅ CharCreateScreen com seleção de gênero visual + preview ao vivo
- ✅ HubPanel com LayeredCharacter animado
- ✅ ProfilePanel com LayeredCharacter animado
- ✅ ItemIcon (48 SVGs) e SkillIcon (26 SVGs) criados
- ✅ Gender end-to-end (client → server → combate)
- ✅ 9 backgrounds de menu
- ✅ Sandbox mock com gender: "female"

---

## 📁 MAPA DE ARQUIVOS IMPORTANTES

### Sprites (client/public/assets/sprites/) — 19 arquivos, todos com fundo transparente
```
base_male_idle_1.png      base_female_idle_1.png
base_male_idle_2.png      base_female_idle_2.png
base_male_walk_1.png      base_female_walk_1.png
base_male_attack_1.png    base_female_attack_1.png
base_male_hit_1.png       base_female_hit_1.png
base_male_cast_1.png      base_female_cast_1.png
base_male_death_1.png     base_female_death_1.png
monster_goblin_idle_1.png
monster_goblin_attack_1.png
monster_rat_idle_1.png
monster_wolf_pup_idle_1.png
monster_wolf_pup_attack_1.png
```
**Script de remoção de fundo branco:** `/home/user/remove_bg.py` (Python + Pillow + numpy)

### Backgrounds (client/public/assets/) — 9 arquivos
```
bg-login.jpg, bg-hub.jpg, bg-combat.jpg, bg-world.jpg
bg-city.jpg, bg-boss.jpg, bg-profile.jpg, bg-items.jpg
bg-quest.jpg, bg-guild.jpg, bg-party.jpg, bg-mail.jpg, bg-tower.jpg
```

### Componentes UI (client/src/components/ui/)
```
LayeredCharacter.tsx  — Player sprite system (paperdoll, frame cycling, VFX)
MonsterLayered.tsx    — Monster sprite system (12 monstros, skills, VFX)
ItemIcon.tsx          — 48 SVG icons para itens (armas, armaduras, poções, etc.)
SkillIcon.tsx         — 26 SVG icons para skills
ArcaneIcon.tsx        — Ícones de navegação/HUD
Portrait.tsx          — Fallback para monstros sem sprites
Button.tsx, Modal.tsx, ProgressBar.tsx, Notifications.tsx, etc.
```

### Componentes de Painéis
```
CombatPanel.tsx       — Combate estilo Final Fantasy (REESCRITO)
HubPanel.tsx          — Hub com LayeredCharacter
ProfilePanel.tsx      — Perfil com LayeredCharacter
CharCreateScreen.tsx  — Criação com gênero visual + preview
```

### Sistemas
```
combat.ts             — Motor de combate (monster skills integradas no enemyTurn)
useCombatStore.ts     — Store com monsterSkillCooldowns
art.ts                — Mapa de artes + Gender type
player.types.ts       — PlayerData com gender field
```

### Server
```
models/Player.js      — CharacterSchema com gender field
routes/player.routes.js — /create aceita gender, allowedFields inclui gender
```

---

## ✅ O QUE JÁ FOI FEITO (COMPLETO)

### Sprites do Jogador (14/14) ✅
- [x] base_male_idle_1.png (parado relaxado)
- [x] base_male_idle_2.png (respirando fundo)
- [x] base_male_walk_1.png (andando)
- [x] base_male_attack_1.png (golpe de espada)
- [x] base_male_hit_1.png (recuo de dano)
- [x] base_male_cast_1.png (braços erguidos, magia)
- [x] base_male_death_1.png (ajoelhado derrotado)
- [x] base_female_idle_1.png (parada relaxada)
- [x] base_female_idle_2.png (respirando fundo)
- [x] base_female_walk_1.png (andando)
- [x] base_female_attack_1.png (golpe de espada)
- [x] base_female_hit_1.png (recuo de dano)
- [x] base_female_cast_1.png (braços erguidos, magia)
- [x] base_female_death_1.png (ajoelhada derrotada)

### Monstros com Sprites Reais (3/13 completos)
- [x] Goblin: idle_1, attack_1
- [x] Rato: idle_1
- [x] Lobo Filhote: idle_1, attack_1

### Monstros Configurados no MonsterLayered (12/12) ✅
Todos configurados mas usando fallback (goblin sprites) para poses que faltam:
goblin, rat, wolf_pup, mist_wolf, shadow_sprite, sand_scorpion, mirage_beast,
dune_crawler, storm_harpy, cloud_titan, sea_wraith, deep_leviathan_jr

### Monster Skills (24 skills, 2 por monstro) ✅
Integradas no combat.ts enemyTurn com 35% chance por turno + cooldown tracking.

### Backgrounds (13/13) ✅
login, hub, combat, world, city, boss, profile, items, quest, guild, party, mail, tower

### Componentes ✅
- [x] LayeredCharacter (7 estados, frame cycling, VFX)
- [x] MonsterLayered (8 estados, 12 monstros, VFX)
- [x] ItemIcon (48 SVGs)
- [x] SkillIcon (26 SVGs)
- [x] CombatPanel estilo Final Fantasy
- [x] CharCreateScreen com gênero visual
- [x] HubPanel com LayeredCharacter
- [x] ProfilePanel com LayeredCharacter

---

## ❌ O QUE FALTA FAZER

### 1. SPRITES DE MONSTROS (PRIORIDADE ALTA)
Cada monstro precisa de 6-7 poses: idle, walk, attack, hit, death, skill especial.
Atualmente apenas 3 monstros têm sprites reais (goblin, rat, wolf_pup).

**Monstros que precisam de sprites (10 restantes):**
- [ ] mist_wolf (Lobo da Névoa) — idle, walk, attack, hit, death, skill_frost
- [ ] shadow_sprite (Espírito das Sombras) — idle, walk, attack, hit, death, skill_shadow
- [ ] sand_scorpion (Escorpião de Areia) — idle, walk, attack, hit, death, skill_stinger
- [ ] mirage_beast (Fera da Miragem) — idle, walk, attack, hit, death, skill_clone
- [ ] dune_crawler (Rastejador das Dunas) — idle, walk, attack, hit, death, skill_burrow
- [ ] storm_harpy (Harpia da Tempestade) — idle, walk, attack, hit, death, skill_lightning
- [ ] cloud_titan (Titã das Nuvens) — idle, walk, attack, hit, death, skill_storm
- [ ] sea_wraith (Espectro do Mar) — idle, walk, attack, hit, death, skill_drown
- [ ] deep_leviathan_jr (Leviatã Jr) — idle, walk, attack, hit, death, skill_tidal
- [ ] forest_golem (Golem da Floresta) — idle, walk, attack, hit, death, skill_roots

**Monstros que precisam de mais sprites (parciais):**
- [ ] goblin: falta walk_1, hit_1, death_1, idle_2, skill_roar
- [ ] rat: falta walk_1, attack_1, hit_1, death_1, idle_2, skill_poison
- [ ] wolf_pup: falta walk_1, hit_1, death_1, idle_2, skill_howl

**Prompt padrão para gerar monstros:**
```
[DESCRIÇÃO DO MONSTRO] sprite, [POSE], front view, full body,
TRANSPARENT BACKGROUND, 2D game sprite art, anime style, clean edges, no background
```
**⚠️ SEMPRE rodar `python3 /home/user/remove_bg.py` após gerar sprites!**

### 2. INTEGRAÇÃO DE ICONES NOS PAINÉIS (PRIORIDADE MÉDIA)
- [ ] ItemsPanel: usar ItemIcon ao invés de emojis/texto nos slots de equipamento
- [ ] MarketPanel: usar ItemIcon nos listings
- [ ] CraftingPanel: usar ItemIcon nas receitas
- [ ] CombatPanel: usar SkillIcon no modal de skills
- [ ] ProfilePanel: usar SkillIcon na lista de skills
- [ ] CityPanel: usar ItemIcon na loja

### 3. BACKGROUND RESTANTE (PRIORIDADE BAIXA)
- [ ] bg-ranking.jpg (hall of champions)
- [ ] bg-travel.jpg (winding road through landscapes)
- [ ] bg-wiki.jpg (magical library bestiary)

### 4. ANIMAÇÕES EXTRAS (PRIORIDADE BAIXA)
- [ ] idle_2 para todos os monstros ( breathing variation)
- [ ] Victory animation no CombatOutcomeScreen
- [ ] Spawn animation para monstros
- [ ] Dash/esquiva visual

### 5. MELHORIAS DE COMBATE (PRIORIDADE MÉDIA)
- [ ] Damage numbers flutuantes sobre sprites (posicionar melhor FloatingCombatText)
- [ ] Screen shake quando leva dano crítico
- [ ] Skill visual do monstro (quando usa skill_2, mostrar aura elemental)
- [ ] Barras de HP animadas com smooth transition

### 6. FEATURES NÃO RELACIONADAS A SPRITES (BACKLOG)
- [ ] Code-splitting do bundle (lazy-load dos painéis)
- [ ] Logs estruturados no server (pino)
- [ ] Testes de integração mail/market/guild
- [ ] Balanceamento com telemetria real
- [ ] Deploy (Railway + Atlas + Vercel — precisa de contas do dono)

---

## 🔧 COMANDOS IMPORTANTES

```bash
# Setup (node_modules não persiste!)
cd client && npm install

# Build
cd client && npm run build

# Remover fundo branco dos sprites (APÓS gerar novos)
python3 /home/user/remove_bg.py

# Dev server
cd client && npx vite --host 0.0.0.0 --port 5173

# Git
git add -A && git commit -m "mensagem"
git push origin arena/019fcfc9-eclipsia-fronteira-dos-arcanos
```

---

## ⚠️ ARMADILHAS CONHECIDAS

1. **node_modules NÃO persiste entre sessões** — reinstalar sempre com `npm install`
2. **Sprites precisam ser commitados no git** — senão são perdidos no reset
3. **Filtro de conteúdo** bloqueia imagens de "morte" — usar "kneeling defeated" ao invés de "dying"
4. **Limite de 10 imagens por sessão** de geração — planejar com cuidado
5. **O nome do repo termina com `.`** — ECLIPSIA-FRONTEIRA-DOS-ARCANOS. (o ponto faz parte)
6. **Branch fixa**: arena/019fcfc9-eclipsia-fronteira-dos-arcanos
7. **Server precisa de gender** no CharacterSchema e routes (já adicionado)
8. **Sandbox mock** usa gender: "female" (Arena Tester)

---

## 📊 NÚMEROS ATUAIS

| Métrica | Valor |
|---|---|
| Sprites de jogador | 14/14 ✅ |
| Sprites de monstro | 5/~80 |
| Monstros com sprites reais | 3/13 |
| Monstros configurados | 12/12 ✅ |
| Monster skills | 24 ✅ |
| Backgrounds | 13 ✅ |
| ItemIcon SVGs | 48 ✅ |
| SkillIcon SVGs | 26 ✅ |
| Componentes UI criados | LayeredCharacter, MonsterLayered, ItemIcon, SkillIcon |
