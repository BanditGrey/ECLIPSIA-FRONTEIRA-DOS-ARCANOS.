# 🧠 MEMÓRIA DO PROJETO — ECLIPSIA: FRONTEIRA DOS ARCANOS

> **Nova sessão? Faça o IMPORT abaixo (2 min) e você estará 100% contextualizado.**
> Última atualização: Casos 1 e 2 do ROADMAP concluídos (caçada de party completa +
> leilão com bids). Etapa atual: ver §0.3.

---

## 0. ⚡ IMPORT — BOOTSTRAP PARA NOVA SESSÃO

### 0.1 Contexto em 30 segundos
- MMORPG idle/turn-based full-stack (React+Vite+Zustand / Express+Socket.io+Mongo).
- 4 idiomas obrigatórios em toda UI: **pt-BR, en-US, es-ES, ja-JP**.
- Coração do jogo: **sistema ItemEffects** (effects numéricos e1..e10/v1..v10,
  itemStr "numId|e:v|..." no wire, mercado/leilão em 💎 crystals — ouro fica fora do P2P).
- Já funciona: itens/catálogo (~300), crafting+upgrade+encantamento, correio, mercado,
  leilão, trade P2P, guildas, party real com caçada cooperativa (auras, bônus por
  tamanho, dungeons com andares compartilhados), chat social vivo (convites, sussurros,
  presença, comandos), daily quests, baú 60/500.

### 0.2 Comandos de bootstrap (rode nesta ordem)
```bash
git branch --show-current      # deve ser a branch arena/ desta sessão
cd client && npm install && npm install --no-save tsx
cd ../server && npm install
# baselines OBRIGATÓRIOS antes de mexer em qualquer coisa:
cd client && npx tsc --noEmit && npm run build && npm run audit && npm run audit:social
cd ../server && npm test
# esperado: tsc limpo · build OK · 89/89 · 41/41 · 18/18
```
⚠ `node_modules` NÃO persiste entre sessões (reinstale sempre).

### 0.3 Etapa atual do desenvolvimento
- **Casos 1, 2 e 4 ✅ concluídos** + itens rápidos do Caso 5 (busca no mercado,
  meus lances no leilão, CI) — ROADMAP.md marcados.
- **Última etapa entregue ("Social 2 + Robustez")**: sussurros persistentes
  (modelo Whisper + entrega offline no ChatPanel), mute (/mute, /unmute, botão 🔇,
  localStorage), /who, fallback de sussurro offline via REST, busca no mercado,
  "meus lances" no leilão, CI (GitHub Actions). Auditoria social: **41/41**.
- **Caso 6 parcial ✅ — jogo ONLINE para testes**: ambiente de preview com
  frontend (Vite, proxy `/api`+`/socket.io` e URL relativa fora de localhost) +
  backend (Express/Socket.io) + MongoDB real (4.4.10 local; fallback
  `mongodb-memory-server` sem `MONGO_URI`). Fluxo verificado ponta a ponta:
  registro → login → chat global → sussurro → presence via socket.
  Pendente (precisa de contas do dono): Atlas + Railway + Vercel — ver DEPLOY.md.
- **⚔ Sistema de PROEFICIÊNCIA DE ARMAS ✅ (Caso 8)**: os 6 arquétipos viraram
  **Origens cosméticas** (retrato/sigilo/descrição, zero mecânica; stats neutros
  8/8/8/8/8/8, HP 480, MP 300, 5 pontos livres). As **14 categorias de arma do
  catálogo são proficiências** (`data/proficiencies.ts`): ganha XP usando a arma
  (ataque +1, skill +2, abate +3; cap 1000), bônus passivo +0,2% ATK/ponto,
  e **skills desbloqueadas pela proficiência da arma equipada** (20 skills
  redistribuídas em `data/skills.ts` com thresholds 10–120; trocou de arma,
  trocou de arsenal). Criação: nome + origem + arma inicial (4 opções nível 1;
  servidor equipa e dá 5 pts de proficiência). Escudo equipado = papel de tanque
  na party (substitui o antigo vanguard). **SORTE: teto 1000** (+0,1% XP/ponto,
  fator de loot /1000). Baselines intactos (89/89, 41/41, 18/18, build).
- **⚔ Caso 11 ✅ — Passivas balanceadas + effects de skill/arma (31–40)**: tetos
  de passivas por arma (dmg 12% · crit 8% · critDmg 25% · def 12% · heal 10%),
  sem regressão, identidade por arma; auditoria automática `tools/audit_balance.ts`
  (`npm run audit:balance`) valida passivas + 98 skills. **10 effects novos**:
  SKILL_DMG(31), BASIC_ATK_DMG(32), SKILL_CD_REDUCE(33), SKILL_MP_REDUCE(34),
  DOT_DMG_BONUS(35), SKILL_HEAL_BONUS(36), CONTROL_DURATION(37),
  EXECUTE_THRESHOLD(38), REFLECT_BONUS(39), CRIT_SKILL_DMG(40) — registry,
  engine (ResolvedEffects/resolve/calculate), nomes 4 idiomas, integrados no
  combate (skill/attack/cd/mp/dot/heal/controle/execução/reflexo/crítico) e em
  itens relic de exemplo (espadão 1505 + amuleto 7005). Auditoria item-effects
  agora 84 definidos + 16 reservados (89/89 OK).
- **⚔ Caso 9 ✅ — Sistema completo de proficiências & skills (v1.0)**: doc
  mestre `SKILLS_SYSTEM.md` (contrato de cálculo, XP, marcos, balanceamento).
  **210 nomes de combinação** (`data/weaponCombos.ts`, matriz main×off + arma
  única, i18n 4 idiomas) exibidos no Perfil e na Wiki. **Passivas por marcos
  50/150/300** por arma (dmg/crit/critDmg/cura/defesa) integradas em
  combate/cura/defesa.
- **⚔ Caso 10 ✅ — Equipamento livre + 7 skills por arma**: toda arma é
  equipável em qualquer mão (fim da restrição de "duas mãos"; espadão+escudo
  vale); **mesma categoria de arma bloqueada nas duas mãos**. UI de equip com
  escolha de mão (i18n 4 idiomas). **98 skills (7 por arma)** geradas por
  `tools/gen_skills.mjs` — FONTE DE VERDADE (editar o gerador, rodar, commit).
  Baselines intactos (89/89, 41/41, 18/18, build, smoke tests).
  Pendente: balanceamento com telemetria real (Caso 5).
- **🎨 Identidade visual "Fronteira Arcana" ✅ (Caso 7)**: design system novo
  (paleta azul-noite + dourado ritual + teal arcano; painéis `panel-arcane` com
  borda dourada e cantoneiras; `title-gold`; botões `btn-gold`/`btn-glass`;
  barras com gradiente e glow; estrelas/granulação em `.bg-eclipsia`; vinheta).
  Arte em `client/public/assets/` (**20 imagens geradas**: emblema,
  login/hub/combat/world, 6 regiões (incl. Fragmento), 6 retratos de
  arquétipos, 3 bosses pintados). Componente `Portrait.tsx` emoldura as
  pinturas em anel de sigilo com fallback para emoji quando não há arte.
  Telas redesenhadas: login, criar/selecionar personagem (retratos),
  hub, header/navbar, combate (campo de batalha + arte do boss), viagem
  (cards de região + dungeon com boss), perfil (retrato), wiki, loading.
  Mapa de artes centralizado em `client/src/data/art.ts`.
  Baselines intactos (89/89, 41/41, 18/18, build OK).
- **⚙ Fase 2 — FX/Animações/UI ✅ (concluída em 2026-08-04)**: build
  restaurado (4 erros de tsc que o PR #4 deixou: import SFXEngine,
  useState faltante, ParticleSystem inexistente, isAvailable em bossRoom).
  **ParticleSystem** (canvas, pooling, blend aditivo/glow) por tipo;
  **SkillEffectPanel** reescrito com partículas + dano flutuante + screen
  shake + SFX por tipo (físico/mágico/vazio) e **FX integrado ao cast real**
  de skills (combat store `skillEffect` → CombatPanel, com botão "Usar").
  **CombatOutcomeScreen** de Vitória/Derrota (cinematográfica, fade,
  estatísticas, partículas). **ArcaneIcon** (SVG) no HUD de combate e no
  Navbar (A08/A09). **Skill Tree** — PassivePanel v2 com nós conectados,
  glow por ramo e burst no unlock + aba "Passivas" no Perfil (A11).
  **ArcaneField** — cenário arcano animado (névoa, motes, runas, chão em
  grade) no campo de batalha (A12). **Feedback de dano** (shake + flash +
  partículas) ao sofrer golpe (A16). **Arte gerada**: 3 bosses (azhur,
  thal_mora, velkaryn) e 6 monstros, registrados em `data/art.ts`;
  `Portrait` ganhou `kind="monster"`. i18n novo nos 4 idiomas (`cast`,
  `combat.outcome.*`, `profile.tabs.passives`). Baselines 89/89 · 41/41 ·
  18/18 · build OK.

### 0.4 Regras de ouro (não viole)
1. Nunca quebrar os baselines do §0.2 (auditorias 89/89 e 41/41, testes 18/18).
2. P2P (mercado/leilão/trade/correio de valor) sempre em 💎 crystals.
3. Tudo que vai pro wire usa **itemStr** (`numId|e:v|...`), nunca objeto de item.
4. i18n sempre nos 4 idiomas; cuidado: chaves novas devem ir na seção certa do
   `i18n/index.ts` (já houve chave caindo em seção errada — valide com o probe:
   importe `translations` via tsx e confira o caminho da chave).
5. Ao concluir itens, atualizar ROADMAP.md + esta memória no MESMO commit.
6. Branch: trabalhe/commite/push apenas na branch arena/ desta sessão.

---

## 1. O QUE É O PROJETO

MMORPG idle/turn-based full-stack em PT-BR com 4 idiomas (pt-BR, en-US, es-ES, ja-JP).
Mundo: "Eclipsia, a fronteira arcana" — regiões exploráveis, combate por turnos, pets,
montarias, pedras espirituais, quests, events ocultos, impulso (buff premium), taverna/party.

**Stack:**
- **Client**: React 18 + TypeScript + Vite + Zustand + Tailwind (`client/`)
- **Server**: Node + Express + MongoDB/Mongoose + Socket.io (`server/`)
- **Deploy**: Vercel (client) — ver `vercel.json`
- **Repo**: `BanditGrey/ECLIPSIA-FRONTEIRA-DOS-ARCANOS.` (o ponto final no nome faz parte do slug — URLs do GitHub terminam em `.`)

---

## 2. ESTADO ATUAL (Git)

| Item | Valor |
|---|---|
| Branch de trabalho (Arena) | `arena/019fc92d-eclipsia-fronteira-dos-arcanos` (confirme com `git branch --show-current`) |
| PR aberto | **#2** — ItemEffects + todos os sistemas (base `main`) |
| `main` | PR #1 (merged) — implementação original full-stack |
| Commits-chave | `0dc4f9b` ItemEffects → `aea3f3a` dungeons → `58d4e7a` guildas → `16f462f` chat social → `c9b126b` caçada de party → `ff4d685` bônus por membros → `6a0d713` Caso 1 fechado → `13263cd` leilão (Caso 2) |
| Auditorias | **89/89** ItemEffects (`npm run audit`) + **41/41** social (`npm run audit:social`) + **18/18** testes server · CI no GitHub Actions |

⚠ Sessões Arena são presas a UMA branch (`arena/019fc92d-...` neste caso). Nunca trabalhe na branch de outra sessão (`arena/019fc8d7-...` foi a sessão do PR #1, já merged).

---

## 3. MAPA DO REPOSITÓRIO

```
client/src/
├── App.tsx                  # Boot: registra catálogo (registerPlayerItems) E petData (registerPetData)
├── main.tsx                 # createRoot padrão
├── data/                    # ⭐ TODO O CONTEÚDO DO JOGO (dados estáticos)
│   ├── items/               # ⭐ CATÁLOGO DE ITENS (18 arquivos, ~300 itens) — ver §5
│   │   └── index.ts         # export ITEMS (merge de tudo) + type ItemId
│   ├── effectRegistry.ts    # ⭐ IDs dos effects (74 definidos + 26 reservados)
│   ├── effectNames.ts       # ⭐ nomes dos effects 4 idiomas + describeEffect (formatação UI)
│   ├── itemNames.ts         # nomes/descrições dos ITENS 4 idiomas (297 entradas, GERADO — ver §8)
│   ├── itemRegistry.ts      # faixas numId por categoria + getItemCategory/isValidItemId
│   ├── monsters.ts          # 15 monstros (com campo race desde a auditoria)
│   ├── bosses.ts            # 6 bosses (com race)
│   ├── regions.ts / skills.ts / archetypes.ts / shop.ts / tavern.ts / titles.ts
├── systems/                 # ⭐ LÓGICA DE JOGO
│   ├── combat.ts            # motor de combate (integrado ao effectEngine — ver §6.3)
│   ├── effectEngine.ts      # ⭐ resolveEffects / calculatePlayerStats
│   ├── loot.ts / quests.ts / world.ts / hiddenEvents.ts / impulse.ts
├── utils/
│   └── itemSerializer.ts    # ⭐ serializeItem/deserializeItem/resolveItemRef (formato itemStr)
├── store/                   # Zustand: usePlayerStore (inventário/equip/stats), useCombatStore,
│                            #   usePetStore, usePartyStore, useGameStore (modais/UI)
├── types/                   # item.types.ts (Item, ItemEffect, Slot...), player.types.ts,
│                            #   combat.types.ts (Enemy tem race), party.types.ts
├── components/              # panels/ (ItemsPanel, CombatPanel, CityPanel...), screens/, ui/, layout/
├── i18n/index.ts            # translations: Record<4 idiomas, árvore> (~4000 linhas)
├── hooks/useI18n.ts         # retorna { t, lang, setLang }; lang persistida em localStorage 'eclipsia_lang'
└── services/                # api.ts, auth.ts/AuthService.ts, socket.ts, sync.ts

server/src/
├── models/Player.js         # ⭐ schema mongoose (itemStr + índices — ver §7)
├── routes/                  # auth.routes.js, player.routes.js (personagens), ranking.routes.js
├── middleware/ / config/

tools/item-effects/          # ⭐ FERRAMENTAS (ver §8)
├── audit_item_effects.ts    # 89 verificações de integridade do sistema ItemEffects
├── gen_run.js + gen_data1/2.js  # gerador do catálogo do spec (NÃO rode sem intenção)

PROJECT_MEMORY.md            # este arquivo
```

---

## 4. COMANDOS ESSENCIAIS

```bash
# setup (node_modules não persiste entre sessões)
cd client && npm install && npm install --no-save tsx

# typecheck + build
cd client && npx tsc --noEmit
cd client && npm run build

# AUDITORIA do sistema ItemEffects (rodar da RAIZ do repo)
./client/node_modules/.bin/tsx tools/item-effects/audit_item_effects.ts
# esperado: OK=89 PARTIAL=0 MISSING=0 CRITICAL=0

# servidor (só sintaxe; precisa de MongoDB para rodar de verdade)
node --check server/src/models/Player.js
cd server && npm install && npm test   # 11 testes (gameUtils + schemas mongoose offline)
```

---

## 5. SISTEMA ITEMEFFECTS (Prompt 19) — O CORAÇÃO ATUAL

### 5.1 Contrato de dados
- **Todo efeito é numérico**: `ItemEffect` = pares `e1..e10` (effectId) + `v1..v10` (value), máx. 10, sem gaps, effectId 0 proibido.
- **`effects` é a fonte de verdade**; `stats{}` coexiste por retrocompat e é derivado dos effects.
- **Formato serializado (itemStr)**: `"numId|e1:v1|e2:v2|..."` ex. `"1005|1:65|4:5|7:3"`; sem effects = só `"1005"`. Usado para correio/mercado/trades/banco.
- **Convenção percentual (importante!)**: itens guardam inteiros (15 = 15%), mas o `ResolvedEffects` do engine usa **frações 0–1** (`critChance: 0.07`). Quem consome (combat) NÃO divide mais por 100.

### 5.2 Tabela de effects (effectRegistry.ts)
74 definidos + 26 slots reservados ("Reservado" nos 4 idiomas):
- **1–11** primários (ATK, DEF, STR, AGI, VIT, ARC, PER, WIL, LCK, HP, MP)
- **21–30** combate (CRIT_CHANCE, CRIT_DMG, ELEM_RES, DMG/DEF/HEAL/XP/GOLD/LOOT_BONUS, SPEED)
- **41–60** status (BURN…BERSERK; 55=REGENERATE, 56=REFLECT, 57=SHIELD, 58=BARRIER)
- **61–66** on-hit (chance de aplicar status) · **67–80** condicionais (on_kill 67-68, low_hp 69-70, on_crit 71-72, on_block 73, on_dodge 74, vs_* 75-78, party_aura 79-80)
- **81–85** pet · **91–93** montaria · **96–100** especiais (SOUL_BIND, QUEST_ITEM=97 — materiais usam `97:0`, ENCHANT_SLOT, UPGRADE_LEVEL, SET_ID)
- Constantes nomeadas: `EFFECT.ATK` etc. (use sempre, nunca número literal).
- `getEffectPairs()` para nos gaps; `unit: 'percent'` no registry dispara conversão /100 no engine.

### 5.3 Fluxo de resolução
```
item.effects ──▶ effectEngine.resolveEffects(item) ──▶ ResolvedEffects (frações 0-1)
equipment(15 slots) ──▶ calculatePlayerStats(baseStats, equipment) ──▶ totais
                        (aceita id de catálogo OU itemStr via resolveItemRef)
usePlayerStore.getEquipmentItemStats ──▶ effects > stats (resolvedToItemStats)
```
- `EQUIPMENT_SLOTS` (15): weapon_main, weapon_off, head, chest, legs, gloves, boots, earring, necklace, belt, resistance, amulet, spirit_stone, pet, mount.

### 5.4 Integração no combate (combat.ts) — tudo funcional
| Momento | Effects |
|---|---|
| start | calculatePlayerStats + pools de SHIELD/BARRIER |
| ataque | DMG_BONUS, VS_BEAST/UNDEAD (por `enemy.race`), VS_WEAK (inimigo stun/slow), VS_BOSS, LOW_HP_ATK (<20%), PARTY_ATK_AURA (party viva), on-hit 61–66 |
| crítico | CRIT_CHANCE/CRIT_DMG + ON_CRIT_BLEED(71)/ON_CRIT_DMG(72) |
| receber dano | esquiva (AGI) + ON_DODGE_ATK(74), block + ON_BLOCK_COUNTER(73), DEF_BONUS + LOW_HP_DEF(70), REFLECT(56), SHIELD(57)/BARRIER(58), slow no inimigo −10% |
| vitória | ON_KILL_HEAL/MP (67/68), XP_BONUS(27), GOLD_BONUS(28), LOOT_BONUS(29) na sorte do drop |
| por turno | REGENERATE(55) flat; stun inimigo pula turno |
| skills | HEAL_BONUS(26) amplifica healPercent |
- Estrutura interna: `activeEffects` (cache do combate), `getResolvedEffects()`, `endEnemyTurn()` (helper compartilhado), `healPlayerFlat()`.

### 5.5 UI (ItemsPanel.tsx)
- Modal de detalhe: tabela de effects (ícone + nome traduzido + valor colorido via `describeEffect`), tooltip com descrição, `itemStr` exibido, **diff effect-a-effect vs. equipado** (verde/vermelho `old → new (Δ)`).
- `getItemMeta()` usa `resolveItemRef` (aceita id ou itemStr) com fallback inferido.
- Nomes/descrições de itens vêm de `itemNames.ts` por `lang` do `useI18n`.

---

## 5.6 SISTEMAS CONSTRUIDOS SOBRE O ITEMEFFECTS (correio/mercado/crafting)

### Inventário itemStr + BAÚ
- **Capacidades: mochila 60 entradas · baú 500 entradas** (`DEFAULT_MAX_INVENTORY=60`, `DEFAULT_MAX_STORAGE=500`; server: `maxInventory default 60`, `storage [] + maxStorage default 500`; criação de personagem idem; `allowedFields` inclui `storage`/`maxStorage`).
- `InventoryItem = { itemStr?, id?, qty }` — `refOf(entry)` dá a referência canônica.
- `addItem/removeItem/equip` aceitam id de catálogo OU itemStr (testado com roll custom `"1005|1:99"`).
- `equip()` guarda a ref no slot; engine/store resolvem os dois formatos.
- **Baú**: `PlayerData.storage: InventoryItem[]`; store tem `depositItem/withdrawItem/isStorageFull` (merge por ref, respeita limites dos dois lados); UI = aba **storage** do ItemsPanel (5 abas: equipado/mochila/baú/crafting/mercado) + botões Depositar (modal da mochila) e Retirar (modal do baú).
- ⚠ `getMaxInventory` usa `Math.min(valor, default)` — se mudar o default, o teto muda junto.

### Correio (mail)
- **Server**: `models/Mail.js` (fromName, toName, subject, message, itemStr regex-validado, gold, read/claimed, expira em 30d) + `routes/mail.routes.js`: GET `/api/mail/inbox?charName=`, POST `/send` (deduz item/ouro do remetente no banco), `/read`, `/claim` (adiciona anexo ao personagem, checa inventário cheio), DELETE.
- **Client**: `components/panels/MailPanel.tsx` — aba **mail** da CityPanel (tabs agora são 6). Anexo exibido com effects via resolveItemRef.
- Ouro de venda no mercado chega ao vendedor **por carta automática** ("Mercado de Eclipsia").

### Mercado (market)
- **Server**: `models/MarketListing.js` (custódia do itemStr, numId/rarity indexados, status active/sold/cancelled, expira 7d) + `routes/market.routes.js`: GET `/listings` (filtros rarity/numId), `/my`, POST `/list` (tira do inventário), `/buy` (ouro → item; vendedor recebe por mail), `/cancel`.
- **Client**: `components/panels/items/MarketPanel.tsx` — aba **market** do ItemsPanel (substituiu o "Em breve"), sub-abas buy/sell/mine.
- ⚠ Server NÃO tem o catálogo de itens: numId vem do parse do itemStr; rarity é informada pelo client (uso cosmético p/ filtro).

### Crafting + Upgrade
- `data/recipes.ts` — 12 receitas (inputs materiais → output id do catálogo) + `upgradeCost(level)` (ouro 150·(n+1)² + 1× mat_9350).
- `components/panels/items/CraftingPanel.tsx` — aba **crafting** do ItemsPanel.
- **Upgrade**: +5% (round) nos effects flat 1–11, grava `UPGRADE_LEVEL (99)` no item → novo itemStr no inventário. Máx. nível 10; bloqueado se 10 effects sem slot 99.

### Links de item no chat
- Formato: `[item:numId|e:v|...]` — regex `/\[item:([0-9|:-]+)\]/g` no ChatPanel.
- Chips clicáveis com tooltip de effects; clique expande detalhes inline. O sanitize do socket preserva `[ ] | : -`.

### Consumidores novos de effects
- **SPEED (30)** + MOUNT_SPEED (91): `world.ts getMountReduction` via `calculatePlayerStats` (cap 0.85).
- **HASTE (59)**: reduz cooldown de skills em combat (`skill.cd * (1 - haste)`, mín. 1).
- **LOOT_BONUS (29)**: sorte efetiva do drop + lootBonus·200 na vitória.
- **HEAL_BONUS (26)**: amplifica healPercent das skills.

### Helpers de servidor
- `server/src/utils/gameUtils.js`: `ITEM_STR_REGEX`, `isValidItemRef`, `getNumId`, `addToInventory`, `removeFromInventory`, `getCharacter` — usados por mail/market (reutilize em trades/leilão).

### Estado offline
- MarketPanel/MailPanel mostram aviso e seguem funcionando localmente quando o server está fora (API retorna success:false).

---

## 5.7 TRADE P2P, ENCANTAMENTO, SETS, CHAT PERSISTENTE, TESTES

### Trade P2P (socket)
- **Server** (`server.js`, seção TRADE): estado em memória (`trades` Map), eventos `trade:request/respond/update/confirm/cancel`; execução `executeTrade()` valida posse/ouro/capacidade ANTES de mutar (sem mutação parcial) e troca via `addToInventory/removeFromInventory`; snapshot do personagem volta por `trade:completed`.
- Máx. 3 itens/lado; só personagens online; um trade ativo por jogador; disconnect cancela.
- **Client**: `components/panels/TradePanel.tsx` — aba **trade** da CityPanel (7 abas). Eventos socket → CustomEvents `eclipsia:trade:*` no window; TradePanel escuta.

### Encantamento (ENCHANT_SLOT 98) e Conjuntos (SET_ID 100)
- Itens com slots de encantamento: linha Eclipse (98:1) e linha Fragmento/relic (98:2) — `w1h_1007/w1h_1010/hd_2603/hd_2506/ch_3103/ch_3006/bt_4603`.
- **Encantar** (CraftingPanel): consome pedra espiritual + item → adiciona o par on-hit/regen/dreno da pedra ao item (novo itemStr). Pedra fornece o primeiro par em [61-66, 55, 49].
- **Sets** (`data/sets.ts`): id 1 Eclipse (2pc DMG_BONUS 5%, 3pc CRIT_CHANCE 5%), id 2 Fragmento (2pc DEF_BONUS 10%, 3pc SHIELD 150). Aplicados em `calculatePlayerStats` (conta peças pelo effect 100 e aplica tiers via applyEffectPair).

### Chat persistente
- `models/ChatMessage.js` (últimas mensagens); server salva em `chat:message` e envia `chat:history` (50) no identify; ChatPanel faz prepend do histórico.

### Notificações push
- `server/src/utils/notify.js`: `onlinePlayers` (Map nome→socket), `setIO`, `notifyPlayer(name, event, payload)`.
- Rotas notificam: `mail:new` (send), `market:sold` (buy). Socket client reemite como `eclipsia:*` + toast no gameStore.

### Testes de servidor
- `server/tests/` com node:test: gameUtils (regex/insert/remove/capacidade) + schemas mongoose offline (validateSync). `cd server && npm test` → **11/11**.
- Regex itemStr endurecida: effectId não pode ser 0 (`[1-9]\d*`) — server E client (`isSerializedItemStr`).
- `addToInventory` agora usa `character.maxInventory` como default (bug pego por teste).

### Regras de negócio importantes
- Server NÃO tem catálogo de itens: numId/rarity de listings vêm do parse do itemStr/client.
- Ouro de venda e trades usa o Mail como transporte (carta automática do "Mercado de Eclipsia").

---

## 6. CATÁLOGO DE ITENS

### 6.1 Faixas de numId (itemRegistry.ts)
| Faixa | Categoria | Faixa | Categoria |
|---|---|---|---|
| 1000–1499 | armas 1H | 5000–5499 | brincos |
| 1500–1999 | armas 2H | 5500–5999 | colares |
| 2000–2499 | off-hand | 6000–6499 | cintos |
| 2500–2999 | cabeça | 6500–6999 | resistência |
| 3000–3499 | peito | 7000–7499 | amuletos |
| 3500–3999 | calça | 7500–7999 | pedras espirituais |
| 4000–4499 | luvas | 8000–8499 | pets |
| 4500–4999 | botas | 8500–8999 | montarias |
|  |  | 9000–9499 materiais · 9500+ especiais |

### 6.2 Sub-faixas do spec (implementadas)
- 1H: espadas 1000–1010 (1010 relíquia) · adagas 1100–1105 · cajados 1150–1154 · arcos curtos 1200–1204
- 2H: espadas 1500–1505 · martelos 1600–1604 (**AGI negativa**) · lanças 1650–1654 · arcos longos 1700–1704 · cajados 1750–1755 · + `eclipse_halberd_epic_2h` (1506, mantido do repo antigo)
- Off: escudos 2000–2005 · adagas off 2100–2102 · orbes 2150–2153 · tomos 2200–2203
- Cabeça: elmos 2500–2506 · capuzes 2600–2603 · coroas 2700–2703
- Pedras por linha elemental: fogo 7500–7503 · gelo 7550–7552 · raio 7600–7602 · natureza 7650–7652 · sombria 7700–7702 · arcana 7750–7752 · pura 7800–7802
- Pets: pt_8000–pt_8250 (15) · Montarias: mt_8500–mt_8702 (14, mt_8700 = Dragão do Vazio)
- Materiais: 9000–9303 regionais (antigos) · 9350–9352 gerais (novos) · 9400–9404 de boss (azhur_fang etc.) · 9405 last_eclipse_core · 9150/9151 void_mirror_shard
- IDs seguem o esquema `w1h_1005`, `ch_3004`, `ss_7502`, `pt_8250`, `mt_8700`, `mat_9350`.

### 6.3 Decisões & desvios documentados
- Itens antigos do repo (sword_one_basic etc.) foram **substituídos** pelos do spec; referências atualizadas em shop/quests/hiddenEvents/loot/CityPanel/QuestPanel.
- Exemplo ss_7502 do doc original tinha gap (e3 sem v3) → interpretado `{1:32, 21:7, 22:20, 3:10, 61:25}`.
- **Loot de monstros só dropa materiais**; equipamento vem de shop/quests/eventos.
- `race` dos inimigos: rat/wolves/scorpion/beasts = beast · goblin/bandit = humanoid · wraith/sprite = undead · golems/titan/root_guardian = elemental · void_mirror/velkaryn = aberration.

---

## 7. SERVIDOR / BANCO (server/src/models/Player.js)

- `Player` → `characters[]` (CharacterSchema). Auth: username/email unique + bcrypt + JWT (`middleware/auth.middleware.js`).
- **Inventário**: `{ itemStr: String (regex-validado), id: String (legado), qty }`. Regex: `/^\d+(\|-?\d+:-?\d+)*$/` — aceita `"1000"` e `"1005|1:65|4:-2"`.
- **Equipamento**: 15 slots `String` (aceita id de catálogo OU itemStr).
- Índices: `characters.name` (1) e `characters.level` (-1).
- ⚠ Client ainda envia inventário como `{id, qty}` (retrocompat mantida). Migrar para itemStr no client = trabalho futuro (afeta addItem/removeItem/equip/loot).
- Rotas: `player.routes.js` salva personagem com whitelist `allowedFields`; criação via `archetypeDefaults` (6 arquétipos: blade/arcane/druid/vanguard/ranger/spectre).

---

## 8. FERRAMENTAS (`tools/item-effects/`)

| Arquivo | O que faz | Como usar |
|---|---|---|
| `audit_item_effects.ts` | 89 verificações (registry, nomes 4 idiomas, types, catálogo, regras, engine, serializer, combate, UI, banco, 5 simulações do spec, cruzado, arquivos) | da raiz: `./client/node_modules/.bin/tsx tools/item-effects/audit_item_effects.ts` |
| `gen_run.js` + `gen_data1/2.js` | Gerador do catálogo do spec (258 itens + itemNames + shop). `gen_data1/2.js` contêm TODOS os efeitos/nomes do design doc — servem como referência canônica dos valores | `node tools/item-effects/gen_run.js` (da raiz). ⚠ REESCREVE os arquivos de itens e itemNames — só rode para regenerar o catálogo inteiro |

---

## 9. ARMADILHAS CONHECIDAS (já caímos / quase caímos nelas)

1. **`registerPlayerItems`/`registerPetData` eram definidos mas nunca chamados** até o Prompt 19 — sem o registro no `App.tsx` o equipamento não dá stats e pets usam fallback genérico (50 HP/5 ATK).
2. **O nome do repo termina com `.`** — URLs: `https://github.com/BanditGrey/ECLIPSIA-FRONTEIRA-DOS-ARCANOS.` (gh/git funcionam normal; só não "corrija" o ponto).
3. **numIds colidem entre spec e itens antigos** — o catálogo atual É o spec; não reintroduza itens antigos com numId 1000–8702.
4. **Percentuais**: item = inteiro; `ResolvedEffects` = fração 0–1. Não divida por 100 duas vezes.
5. **`recoverHp/recoverMp` recebem porcentagem 0–100** (não fração) — effects on_kill multiplicam por 100 antes de chamar.
6. **i18n**: strings de UI em `i18n/index.ts` (t('caminho.chave')); nomes de ITENS em `data/itemNames.ts`; nomes de EFFECTS em `data/effectNames.ts`; abilities de pet usam chaves genéricas existentes em `pet.abilities.*` (wolf_bite, stone_wall, lucky_paw...).
7. **Arquivos de itens são JSON-like** (chaves entre aspas, `satisfies Record<string, Item>` no fim) — dá para parsear com eval após remover import/satisfies (padrão usado nos scripts de tools/).
8. **`getEffectPairs` para no primeiro gap** — comportamento proposital (regra "sem gaps").
9. `tsx` não está nas dependências — instale com `--no-save` quando precisar rodar scripts TS.
10. Build emite warning de chunk size (>500 kB) — esperado com o catálogo grande; não é erro.

---

## 10. TRABALHO FUTURO

Feito nesta leva: ✅ correio, ✅ mercado (leilão simples), ✅ links de item no chat, ✅ inventário itemStr, ✅ crafting + upgrade, ✅ SPEED/HASTE/LOOT_BONUS/HEAL_BONUS consumidos, ✅ `npm run audit` (client).

Feito na segunda leva: ✅ trade P2P via socket, ✅ encantamento (98) + 2 conjuntos (100), ✅ chat persistente, ✅ testes de servidor (11/11), ✅ notificações push (mail:new/market:sold), ✅ regex itemStr endurecida.

### Deploy, segurança e economia (terceira leva)
- **Deploy**: `railway.json` na raiz (build/start em `server/`, healthcheck `/api/health`) + `DEPLOY.md` com passo a passo (Railway + MongoDB Atlas + Vercel). Client já suporta `VITE_API_URL` (default prod: `https://eclipsia-server.railway.app/api`).
- **Rate limiting** (`express-rate-limit`): API global 600/15min · auth 20/15min · mail/send + market/list/buy 60/min. Socket: chat 5 msgs/10s, trade:update 10/10s por conexão.
- **Graceful shutdown**: SIGTERM/SIGINT fecham o server com timeout de 5s.
- **Economia do mercado (gold sinks)** em `market.routes.js`: `MARKET_TAX_RATE = 0.05` (vendedor recebe líquido via carta) e `MARKET_LISTING_FEE = 2` (listagem, não reembolsável). UI avisa na aba de venda (`market.taxNote`).
- ⚠ Server é stateless exceto trades em memória — reiniciar derruba trades pendentes.

### Guildas (sistema completo)
- **Server**: `models/Guild.js` (name único 3-24, leaderName, motd ≤160, members[{name, role, joinedAt}], maxMembers 20) + `routes/guild.routes.js`: list, my, create, join, leave (líder sai → sucessão por antiguidade; último sai → dissolve), kick (líder todos / oficial só membro), promote (líder alterna officer↔member), motd (líder/oficial), disband. Mutações notificam membros online via `guild:updated` (notify.js); expulso recebe `guild:kicked`.
- **Chat de guilda**: room socket `guild:<id>` — cliente emite `guild:room` (servidor valida membership antes do join), `chat:guild` com throttle 5/10s.
- **Client**: `GuildPanel.tsx` completo (criar/diretório/entrar, cargos com badges, promover/rebaixar/expulsar por permissão, MOTD editável, chat da guilda, sair/dissolver) + `API.guild.*` + `socketService.joinGuildRoom/sendGuildMessage`.
- i18n: `guild.*` completo nos 4 idiomas (incl. `guild.role.{leader,officer,member}`).

### Dungeons (sistema completo)
- `data/dungeons.ts`: 7 dungeons guiadas por dados — bandit_camp (5 andares, lvl 5), root_crypt (8, lvl 15), mirror_sanctum (12, lvl 30), azhur_pit (15, lvl 40), velkaryn_spire (18, lvl 55), thal_mora_abyss (20, lvl 60 + título mist_bearer), fragment_nexus (25, lvl 65 + título eclipse_awakened). Cada uma: região (monstros dos andares), bossId, rewardGold e rewardItems (materiais de boss garantidos).
- **Motor**: `combatEngine.start(region, { dungeon, dungeonId, maxFloor })` — o boss entra automaticamente no último andar (`bossId` resolvido da def); `dungeonId` persiste entre andares no CombatState; autoAdvance carrega o dungeonId; ao limpar: ouro+itens garantidos e NÃO reinicia caça (fica na vitória).
- **UI**: aba dungeons do TravelPanel reescrita (cards com boss/região/andares/recompensas, gate por nível/título). O antigo `enterDungeon` hack (setState manual) foi substituído pelo motor real.
- i18n: `travel.dungeons.<id>.name/desc` (mesclado no bloco existente) + dungeonFloors/dungeonBoss/dungeonReward + `combat.dungeonCleared` em 4 idiomas.
- ⚠ Regex da auditoria bloco 8 usa janela de 1200 chars (código de dungeon afastou o calculatePlayerStats do start()).

### 💎 Cristais (moeda paga) + Party real + Daily quests
- **Cristais (`crystals`)**: moeda premium separada do ouro. `PlayerData.crystals` (client) + schema/criação/allowedFields (server). Header mostra 💎 ao lado do ouro.
- **Mercado mundial é 100% em crystals** (decisão de produto: protege o ouro da economia P2P): compra debita crystals do comprador; venda paga o vendedor em crystals líquidos (imposto 5%) via correio; taxa de listagem 2 💎.
- **Mail suporta crystals**: enviar/resgatar 💎 (campo `crystals` no modelo Mail).
- **Venda de crystals**: `POST /api/player/crystals/grant` protegido por `x-admin-key` = env `ADMIN_KEY` (vendas out-of-band: PIX etc.). Documentado no DEPLOY.md.
- **Party real (socket)**: handlers `party:invite/respond/leave/kick` (estado em memória no server, máx. 5, limpeza no disconnect); PartyPanel tem seção "Grupo de jogadores" (convite por nome, aceitar/recusar, líder 👑, kick, sair) acima da lista de companheiros locais. ⚠ membros reais ainda NÃO participam do combate (companheiros locais seguem separados).
- **Daily quests** (`data/dailyQuests.ts`): 4 diárias (20 kills, 15 explorações, 2 crafts, 3 andares de dungeon) rastreadas em `PlayerData.daily { date, progress, claimed }` via `recordDailyEvent()` (hooks em combat/world/CraftingPanel) e resgatadas com `claimDaily()`. Aba **DIÁRIAS** no QuestPanel. Reinício automático por data (YYYY-MM-DD).

### 💬 Camada social viva (chat integrado)
- **ChatPanel reescrito** com tipos de mensagem: system, global, party, whisper-in/out e **cards de convite de party clicáveis** (aceitar/recusar direto no chat).
- **Comandos de chat** (client-side, antes do envio):
  - `/convite <nome>` (ou /invite) → party:invite + eco no chat
  - `/w <nome> <msg>` (ou /msg, /sussurrar) → sussurro privado (entrega só ao alvo)
  - `/r <msg>` → responde ao último sussurro recebido
  - `/p <msg>` (ou /party) → chat da party (room socket `party:<id>`)
  - `/help` lista os comandos
- **Nomes clicáveis** no chat → barra de ações (🤝 Convidar ao grupo / 💬 Sussurrar / ✕); sussurrar pré-preenche `/w Nome ` no input.
- **Presença online**: broadcast `chat:presence` no identify/disconnect → linhas de sistema "entrou/saiu da fronteira".
- **Server**: handlers `chat:whisper` (com `chat:whisper_failed` se offline), `chat:party` (restrito à room), rooms de party gerenciadas no accept/leave/kick/disconnect (`leavePartyRoom`); throttles de 5 msgs/10s por canal.
- Links de item `[item:...]` seguem funcionando no chat (chips com nome real via itemNames).
- i18n: `chat.commandHint/partyPrefix/whisperFrom/whisperTo/inviteCard/presenceIn/...` nos 4 idiomas.
- ⚠ node_modules é limpo entre sessões (excluído do snapshot): reinstalar com `cd client && npm install && npm i --no-save tsx` e `cd server && npm install`.

### 🎯 Caçada de party em combate (Caso 1 do ROADMAP — Modo A)
- **Server** (`server.js`): `partyHunts` Map por party; eventos `party_combat:start` (líder, valida party+liderança), `join` (snapshot de auras 79/80 somadas e capadas em 100%), `turn` (reporte dano/sofrido/kills com sanity cap 200k), `end`, `leave`; broadcast `party_combat:updated` throttled (1,5s); fim paga `xpBonus = kills*8/membros`; sessão morre com leave/disband/disconnect do último.
- **Client**: `store/usePartyCombatStore.ts` (sessão/contribuições/auras); `PartyCombatBridge` no GameLayout (auto-join com snapshot de auras via calculatePlayerStats, aplica XP final, toasts); combatEngine reporta turnos e aplica auraAtk/auraDef **apenas quando combat.region === sessão.region**; PartyPanel inicia (select de regiões com gate) e encerra; CombatPanel mostra barra da sessão com ranking de contribuições.
- Regras: XP de equipe é EXTRA (cada um já ganha o seu do próprio combate); loot individual; auras coletivas são o benefício em tempo real.
- **Bônus por tamanho do grupo** (autoritativo no server, `SIZE_BONUS_PER_MEMBER`): por membro na sessão → +10% XP, +5% ouro, +3% loot (5 membros = +50%/+25%/+15%). Aplicado em handleVictory apenas com região da sessão; `sizeBonus` viaja no snapshot (`huntSnapshot.sizeBonus`) e aparece nas barras de sessão do CombatPanel/PartyPanel.
- Dungeons em party: andares compartilhados via `party_combat:floor` (server guarda hunt.floor; handleVictory reporta floor+1; PartyPanel tem botão 🏰 dungeon em grupo + entrar no andar).
- Regras puras em `server/src/utils/partyHuntRules.js` (clamp/sizeBonus/teamworkXp) com 7 testes; server.js importa de lá.
- **`tools/audit_social.ts`**: 23 checks da camada social/hunt — `cd client && npm run audit:social`.
- Caso 1 ✅ concluído (ROADMAP marcado).

### 🔔 Sussurros persistentes + mute + /who (Caso 4 do ROADMAP)
- **Server**: `models/Whisper.js` (from/to/text/read, índices) + `routes/whisper.routes.js` (inbox não lidos, send offline, read em lote); `who:online → who:list` no socket; `chat:whisper_failed` agora carrega o texto p/ fallback.
- **Client**: ChatPanel carrega inbox offline ao conectar (aviso + mensagens + marca lidas); sussurro p/ jogador offline persiste via REST (aviso "guardado para entrega"); mute por nome (`/mute`, `/unmute`, botão 🔇 na barra de ações, `localStorage eclipsia_muted`, filtra global/whisper/party); `/who` lista online.
- **Caso 5 rápido**: busca por nome no mercado (filtro client-side) + "meus lances" no leilão (`GET /auction/bids`) + CI `.github/workflows/ci.yml`.

### 🏛 Leilão com bids (Caso 2 do ROADMAP)
- **Server**: `models/Auction.js` (itemStr regex-validado, bids, expiração, status) + `routes/auction.routes.js`: create (taxa `AUCTION_LISTING_FEE=3💎`, item custodiado, duração 6/12/24h), bid (debita 💎 do licitante, reembolsa o coberto na hora ou por carta), cancel (só sem lances), **settleExpired lazy** na listagem (vencedor recebe item por carta; vendedor recebe 💎 líquido de `AUCTION_TAX_RATE=5%` por carta; sem lances o item volta).
- Notificações socket: `auction:outbid`, `auction:won`, `auction:sold`.
- **Client**: `API.auction.*` + aba **Leilões** no MarketPanel (tempo restante, lance por valor ou ⚡lance mínimo, criar/cancelar).
- Auditoria social cobre o leilão (8 checks). Pendente menor: tela "meus lances".

Restante:
1. 🖥 **Tela "meus lances"** no leilão (acompanhar lances cobertos/vencedores)
2. 🧪 Testes de integração das rotas mail/market (precisa mongodb-memory-server) e do fluxo de trade
3. 💾 Trade/party state em memória no server (reiniciou = pendências somem) — mover p/ Mongo se necessário
4. 🎛 Balancear economia (preços em crystals, custos de craft/upgrade) com dados reais
5. 🔎 Busca de itens no mercado por nome (hoje só filtro rarity/numId)
6. ⚔ Membros da party real no combate (hoje só companheiros locais)
7. 💳 Gateway de pagamento real para crystals (hoje a concessão é manual via ADMIN_KEY)
8. 🔔 Histórico de sussurros/party persistente (hoje só global é persistido)

---

## 11. CHECKLIST DE INÍCIO DE SESSÃO

```bash
git branch --show-current        # confirme a branch da sessão
git log --oneline -3             # últimos commits
cat PROJECT_MEMORY.md            # você está aqui
cd client && npm install         # node_modules não persiste (tsx agora é devDep)
cd client && npm run audit   # baseline 89/89 (roda da raiz do client)
```

Se a auditoria não der 89/89 OK, algo regressiu — investigue antes de continuar.
