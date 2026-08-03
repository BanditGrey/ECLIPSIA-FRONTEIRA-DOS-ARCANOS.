# 🧠 MEMÓRIA DO PROJETO — ECLIPSIA: FRONTEIRA DOS ARCANOS

> **Leia este arquivo primeiro.** Ele existe para você se localizar sem varrer o repo inteiro.
> Última atualização: 2026-08-03 (após trade P2P, encantamento/sets, chat persistente, testes — ver §5.6 e §5.7).

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
| Branch de trabalho (Arena) | `arena/019fc92d-eclipsia-fronteira-dos-arcanos` |
| PR aberto | **#2** — sistema ItemEffects (base `main`) |
| `main` | PR #1 (merged) — implementação original full-stack |
| Commits-chave desta branch | `0dc4f9b` sistema ItemEffects original → `4355caf` ações da auditoria (catálogo do spec, combate 73-80, diff UI, DB) → `655c44d` gaps residuais (pets, itemStr, loot/heal) → commit desta memória |
| Auditoria | **89/89 verificações passando** — script em `tools/item-effects/audit_item_effects.ts` |

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

### Inventário itemStr
- `InventoryItem = { itemStr?, id?, qty }` — `refOf(entry)` dá a referência canônica.
- `addItem/removeItem/equip` aceitam id de catálogo OU itemStr (testado com roll custom `"1005|1:99"`).
- `equip()` guarda a ref no slot; engine/store resolvem os dois formatos.

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

Restante:
1. 🏛 **Leilão com bids** (mercado hoje é preço fixo) e **rate limiting** nas rotas
2. 🧪 Testes de integração das rotas mail/market (precisa mongodb-memory-server) e do fluxo de trade
3. 💾 Trade state está em memória no server (reiniciou = trades pendentes somem) — mover p/ Mongo se necessário
4. 🎛 Balancear economia (preços de mercado, custos de craft/upgrade) com dados reais de jogo
5. 🔎 Busca de itens no mercado por nome (hoje só filtro rarity/numId)

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
