# 🗺 ROADMAP — ECLIPSIA: FRONTEIRA DOS ARCANOS

> Checklist mestra de tudo que está pendente. Status validado em 2026-08-03
> (auditoria ItemEffects 89/89 · testes de servidor 11/11 · build OK).
> Ver também `PROJECT_MEMORY.md` (como se localizar) e `DEPLOY.md` (como subir).

---

## ✅ JÁ IMPLEMENTADO (resumo rápido — não mexer sem motivo)

- Sistema ItemEffects completo (registry 74+26, engine, serializer, sets, encantamento, upgrade)
- Catálogo: ~300 itens com effects · receitas de crafting · 7 dungeons com boss/recompensas
- Correio (item+ouro+💎) · Mercado mundial em 💎 Cristais (imposto 5%, taxa 2💎) · Trade P2P
- Guildas (cargos, MOTD, chat próprio) · Party real (convites, kick, rooms)
- Chat social vivo: /convite, /w, /r, /p, presença, cards de convite, nomes clicáveis
- Daily quests (4 diárias com reset por data) · Baú 500 / mochila 60
- Deploy config (Railway+Atlas+Vercel) · rate limiting · concessão de crystals via ADMIN_KEY

---

## 🎯 CASO 1 — Party real DENTRO do combate (✅ CONCLUÍDO)

Hoje a party real é social (chat/convites). Membros não lutam juntos —
só os companheiros locais participam do combate. Meta: grupo lutar junto.

### 1.1 Decisão de arquitetura (fazer PRIMEIRO)
- [x] Escolher o modo de jogo cooperativo (✅ Modo A implementado):
  - **Modo A — Sessão paralela sincronizada** (recomendado p/ começar): cada
    membro luta na própria máquina contra monstros da mesma região; servidor
    agrega contribuições por turno e distribui XP/loot. Simples, sem simulação
    central.
  - **Modo B — Combate centralizado**: estado do combate no servidor (ou cliente
    host), turnos sincronizados via socket. Mais fiel, muito mais complexo.
- [x] Definir regras: XP dividido (fórmula `getXpMultiplier` já existe no
      usePartyStore), loot (cada um rola o seu + LOOT_BONUS), morte (membro
      cai → segue lutando sozinho até o fim da sessão?).

### 1.2 Servidor — sessão de combate de party
- [x] Estado `partyCombat` (Map): partyId → { region, members[], round,
      kills, contributions: Map<name, {dmgDealt, dmgTaken, kills}> }
- [ ] Eventos socket novos:
  - [x] `party_combat:start { partyId, region, dungeonId? }` (líder inicia)
  - [x] `party_combat:join/leave` (membro entra/sai da sessão)
  - [x] `party_combat:turn { dmgDealt, dmgTaken, killed? }` (cada
        cliente reporta seu turno; servidor valida com sanity caps por nível)
  - [x] `party_combat:summary` → `party_combat:updated` (broadcast throttled 1,5s p/ UI)
  - [x] `party_combat:ended { xpBonus, stats }` (bônus de equipe por kills)
- [x] Validar: só membros da party entram; sessão morre com disband/disconnect
      do líder (ou passa liderança, como na party)
- [x] Sanity anti-cheat básico: teto de dano por turno (200k por reporte)
      possível do catálogo) — log de suspeita

### 1.3 Client — integração no motor de combate
- [x] `combatEngine` reporta turnos (dano causado/sofrido/kills) à sessão via socket
- [x] Ao fim de cada turno local → enviar `party_combat:turn`
- [x] Receber `party_combat:updated` → alimentar feed de contribuições
- [x] Auras reais: membros enviam snapshot de `ResolvedEffects` resumido
      (PARTY_ATK_AURA 79 / PARTY_DEF_AURA 80) no start; servidor agrega e
      devolve bônus efetivo que o client aplica via effectEngine
- [x] XP da sessão aplicado via `gainXp` no PartyCombatBridge (GameLayout)
- [x] Bônus progressivo por nº de membros (+10% XP / +5% ouro / +3% loot por membro, server-autoritativo)
- [x] Dungeons em party: andares compartilhados via party_combat:floor
      (recompensa de dungeon já é individual por membro no Modo A)

### 1.4 UI
- [x] CombatPanel: barra de sessão (contribuições ⚔/💀 por membro, auras, aviso de região)
      dano por turno, kills)
- [x] PartyPanel: seletor de região + "🎯 Caçar em grupo" (líder) + encerrar + status
- [x] Chat de party já funciona dentro do combate (`/p`)
- [x] Toast de XP de equipe no fim da sessão (loot segue individual)

### 1.5 Qualidade
- [x] Testes: server/src/utils/partyHuntRules.js (funções puras) +
      partyHuntRules.test.js (7 testes: clamp/sizeBonus/teamworkXp)
- [x] i18n: `partyCombat.*` nos 4 idiomas
- [x] Auditoria: tools/audit_social.ts (23 checks) + npm run audit:social
      (ou auditoria social separada)
- [x] Atualizar PROJECT_MEMORY.md (§5.6, seção caçada)

---

## 🏛 CASO 2 — Leilão com bids (✅ CONCLUÍDO — falta: 'meus lances')

- [x] Modelo `Auction`: itemStr (regex-validado), sellerName, startPrice,
      minIncrement, bids[{name, amount, at}], expiresAt, status
- [x] Rotas: create (taxa 3💎 + custódia), bid (bloqueia 💎 e reembolsa
      licitante coberto na hora), cancel (só sem lances), settleExpired
      (lazy no list: item ao vencedor por carta + 💎 líquido de 5% ao
      vendedor; sem lances o item volta)
- [x] Client: aba Leilões no MarketPanel (tempo restante, lance por valor
      ou ⚡lance mínimo, criar 6/12/24h, cancelar; 'meus lances' pendente)
- [x] Edge cases: cancel bloqueado após 1º lance; lance no próprio leilão
      bloqueado; expirado rejeita lance e liquida
- [x] Notificar via socket: auction:outbid, auction:won, auction:sold

## 💳 CASO 3 — Gateway de pagamento para crystals (próxima etapa sugerida)

- [ ] Escolher gateway (Mercado Pago / Stripe / Pagar.me — BR: Pix via
      Mercado Pago é o caminho natural)
- [ ] Modelo `Purchase`: playerId, charName, amountCrystals, amountBRL,
      provider, providerRef, status(pending/paid/failed), createdAt
- [ ] Webhook do provider → valida assinatura → credita crystals (idempotente
      por providerRef)
- [ ] Tela de compra no client (pacotes: 100/550/1200/2600 💎 com bônus)
- [ ] Rota grant via ADMIN_KEY vira fallback interno (manter p/ suporte)
- [ ] LGPD/básico: sem armazenar dados de cartão (provider tokeniza)

## 🔔 CASO 4 — Persistência de sussurros + melhorias sociais (✅ CONCLUÍDO — falta histórico de party)

- [x] Modelo `Whisper` (from, to, text, read, createdAt) + rotas inbox/send/read
- [x] Inbox offline carregada no ChatPanel ao conectar (sistema + mensagens + marcar lidas)
- [ ] Histórico de chat de party persistente (opcional, como ChatMessage com scope) — segue aberto
- [x] Mute: /mute /unmute + botão 🔇 na barra de ações + localStorage
- [x] `/who` lista jogadores online (evento who:online → who:list)

## 🧪 CASO 5 — Robustez & qualidade (contínuo)

- [ ] Testes de integração mail/market/guild com mongodb-memory-server — segue aberto
- [ ] Teste do fluxo de trade (validação pré-mutação)
- [ ] Persistir trades/parties em Mongo (hoje em memória) — segue aberto
- [x] Busca por nome no mercado (filtro client-side sobre o catálogo)
- [ ] Code-splitting do bundle client (lazy-load dos painéis) — segue aberto
- [ ] Logs estruturados no server (pino) + health detalhado
- [ ] Balanceamento: preços 💎, custos craft/upgrade, drop rates (com dados
      reais após deploy)
- [x] CI escrito: tools/ci-workflow.yml (client: tsc+build+2 auditorias · server: tests+syntax) — para ativar, copiar para .github/workflows/ci.yml com conta que tenha permissão 'workflows' (o App da integração não tem)

## 📦 CASO 6 — Colocar no ar (bloqueia testes reais multiplayer)

- [x] **Ambiente de teste online no ar (preview)** — frontend + backend + banco
      rodando com URL pública: registro → login → chat global → sussurro →
      party → mercado funcionando ponta a ponta (verificado com REST + socket)
- [x] Servidor roda sem Atlas: fallback `mongodb-memory-server` (efêmero) e
      suporte a `mongod` local (MongoDB 4.4+ testado) — ver `DEPLOY.md` §6
- [x] Client dev com proxy `/api` + `/socket.io` e URL relativa fora de
      localhost (preview) — `vite.config.ts` + `api.ts`
- [ ] Criar cluster MongoDB Atlas (M0) + user + IP liberado — **conta do dono**
- [ ] Subir server no Railway com as envs (MONGO_URI, JWT_SECRET, CLIENT_URL,
      ADMIN_KEY) — `railway.json` já pronto — **conta do dono**
- [ ] Vercel: importar repo + env `VITE_API_URL` apontando pro Railway — **conta do dono**
- [ ] Testar fluxo ponta a ponta com 2 navegadores no ambiente definitivo
- [ ] Definir URL final e atualizar defaults no `api.ts` se necessário

---

## 🎨 CASO 7 — Identidade visual "Fronteira Arcana" (✅ QUASE COMPLETO)

- [x] Design system novo: paleta azul-noite/dourado/teal arcano, painéis
      ornamentados (`panel-arcane`), tipografia dourada (`title-gold`), botões
      `btn-gold`/`btn-glass`, barras com gradiente/glow, estrelas + granulação
      (`bg-eclipsia`), vinheta
- [x] Arte gerada (20): emblema · login · hub · combate · mundo · 6 regiões
      (incl. Fragmento) · 6 retratos de arquétipos · 3 bosses (bandit_leader,
      root_guardian, void_mirror) — em `client/public/assets/` (mapa
      centralizado em `client/src/data/art.ts`)
- [x] Componente `Portrait.tsx` (pintura em anel de sigilo + fallback emoji)
      + `ClassSigil.tsx` (sigilos SVG heráldicos)
- [x] Telas redesenhadas: login (hero + emblema + online count), criar/selecionar
      personagem (retratos), hub, header/navbar, combate (campo de batalha +
      arte do boss quando aplicável), viagem (regiões + dungeons com boss),
      perfil (retrato), wiki, loading
- [x] Baselines intactos após a reforma (89/89 · 41/41 · 18/18 · build)
- [ ] Pinturas pendentes (limite de 10 imagens/sessão): bosses azhur,
      thal_mora e velkaryn (hoje: anel de sigilo com emoji) — gerar em
      sessão futura
- [ ] Monstros (15) sem pintura dedicada (hoje: emoji em anel de sigilo) —
      opcional, sessão futura

## ⚔ CASO 8 — Sistema de Proficiência de Armas (✅ CONCLUÍDO)

- [x] Arquétipos → **Origens cosméticas** (retrato/sigilo/título; zero mecânica;
      criação com stats neutros + 5 pontos livres)
- [x] 14 proficiências (uma por categoria de arma do catálogo) em
      `data/proficiencies.ts`: XP por uso (ataque/skill/abate), cap 1000,
      bônus passivo +0,2% ATK/ponto
- [x] 20 skills redistribuídas por proficiência com thresholds (10–120);
      skills = f(arma equipada + proficiência) — trocar de arma troca o arsenal
- [x] Criação de personagem: nome + origem + arma inicial (4 opções nível 1);
      servidor equipa a arma e concede 5 pts de proficiência (itemStr por numId)
- [x] Escudo equipado = tanque na party (substitui o antigo "vanguard")
- [x] Sorte: teto 1000 (+0,1% XP/ponto; loot fator /1000)
- [x] UI: criação, perfil (14 profs com progresso/next skill), wiki (origens +
      proficiências), skills derivadas no combate e modal
- [x] Baselines intactos: 89/89 · 41/41 · 18/18 · build · smoke test client
- [ ] Balancear thresholds/XP de proficiência com dados reais (Caso 5)

## ⚔ CASO 9 — Sistema completo de proficiências & skills (✅ v1.0 — ver SKILLS_SYSTEM.md)

- [x] Documento mestre criado: `SKILLS_SYSTEM.md` (contrato de cálculo, XP,
      marcos, 28 skills, passivas, combinações, checklist futuro)
- [x] Nomes de combinação para **todas as 210 combinações** (matriz 15×15 com
      arma única) em `data/weaponCombos.ts` + i18n 4 idiomas
- [x] UI: Perfil mostra arma principal + secundária + **nome da combinação**;
      Wiki ganhou tabela completa de combinações
- [x] 7 novas skills (Cross Slash, Twin Fang, Quick Shot, Astral Barrier,
      Arcane Ward, Seismic Slam, Aegis Guard) — **todas as 14 armas com kit**
      (28 skills no total)
- [x] **Passivas por marcos** (50/150/300): cada arma concede dmg/crit/critDmg/
      cura/defesa — integradas em combate, cura e defesa total
- [x] i18n 4 idiomas (combos + 7 skills) · baselines intactos (89/89 · 41/41 ·
      18/18 · build)
- [ ] Balanceamento fino com telemetria real (Caso 5) — ver SKILLS_SYSTEM.md §7

## ⚔ CASO 10 — Equipamento livre + 7 skills por arma (✅ CONCLUÍDO)

- [x] **Toda arma equipável em qualquer mão** (main/off) — fim da exclusividade
      de slot e da restrição de "duas mãos" (espadão + escudo agora é válido)
- [x] **Regra: mesma categoria de arma não pode nas duas mãos** (ex.: 2 espadas
      1H) — validada no `usePlayerStore.equip` com smoke test
- [x] UI: modal de item de arma mostra "Equipar (mão principal)" e
      "Equipar (mão secundária)" + aviso de categoria duplicada (i18n 4 idiomas)
- [x] **98 skills — exatamente 7 por arma** (14 × 7), geradas por
      `tools/gen_skills.mjs` (fonte de verdade: editar o gerador e rodar)
- [x] **Revisão completa de balanceamento (v2)**: burst nunca regride por arma,
      DPS ≥ 30, MP ≈ 20-35% do burst, controles/DoTs pagam em dano — auditoria
      automática embutida no gerador (falha se violar)
- [x] i18n 4 idiomas (98 skills com descrições por template + 3 chaves de equip)
- [x] Baselines intactos: tsc · build · 89/89 · 41/41 · 18/18 · smoke tests
- [ ] Balanceamento fino com telemetria real (Caso 5)

## ⚔ CASO 11 — Balanceamento de passivas + sistema de effects de skill/arma (✅ CONCLUÍDO)

- [x] **Passivas rebalanceadas**: tetos por arma (dmg ≤ 12% · crit ≤ 8% ·
      critDmg ≤ 25% · def ≤ 12% · heal ≤ 10%), tiers sem regressão, identidade
      por arma (espadão=dmg/critDmg, adaga=crit, arco longo=critDmg, escudo=def)
- [x] **Auditoria de balanceamento automática** (`tools/audit_balance.ts` +
      `npm run audit:balance`) — valida passivas + 98 skills, falha se regra violada
- [x] **10 effects novos (slots 31–40)** que afetam skills/armas:
      SKILL_DMG, BASIC_ATK_DMG, SKILL_CD_REDUCE, SKILL_MP_REDUCE, DOT_DMG_BONUS,
      SKILL_HEAL_BONUS, CONTROL_DURATION, EXECUTE_THRESHOLD, REFLECT_BONUS,
      CRIT_SKILL_DMG
- [x] Registry + engine (ResolvedEffects/resolveEffects/calculatePlayerStats) + nomes 4 idiomas
- [x] Integração completa no combate (skill/attack/cooldown/MP/DoT/cura/controle/execução/reflexo/crítico)
- [x] Itens exemplo: espadão relic (SKILL_DMG+12%, EXECUTE_THRESHOLD+10%) e amuleto relic
      (SKILL_DMG+10%, CD-REDUCE+8%, MP-REDUCE+5%)
- [x] Auditoria item-effects atualizada (74→84 definidos, 26→16 reservados) — 89/89 OK
- [x] Baselines intactos: tsc · build · 89/89 · 41/41 · 18/18 · smoke tests
- [ ] Balanceamento fino com telemetria real (Caso 5)

## 📏 REGRAS DE OURO (para qualquer item acima)

1. Nunca quebrar a auditoria: `cd client && npm run audit` → 89/89
2. Nunca quebrar os testes: `cd server && npm test` → 11/11
3. Moedas: mercado/leilão/trades SEMPRE em 💎 crystals; ouro fica fora do P2P
4. Tudo que vai pro wire usa itemStr (`numId|e:v|...`), nunca objeto de item
5. i18n sempre nos 4 idiomas (pt-BR, en-US, es-ES, ja-JP)
6. node_modules não persiste entre sessões: reinstalar ao iniciar
7. Atualizar PROJECT_MEMORY.md + esta checklist ao concluir itens
