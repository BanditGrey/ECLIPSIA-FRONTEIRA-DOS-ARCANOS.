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

## 🎯 CASO 1 — Party real DENTRO do combate (prioridade máxima)

Hoje a party real é social (chat/convites). Membros não lutam juntos —
só os companheiros locais participam do combate. Meta: grupo lutar junto.

### 1.1 Decisão de arquitetura (fazer PRIMEIRO)
- [ ] Escolher o modo de jogo cooperativo:
  - **Modo A — Sessão paralela sincronizada** (recomendado p/ começar): cada
    membro luta na própria máquina contra monstros da mesma região; servidor
    agrega contribuições por turno e distribui XP/loot. Simples, sem simulação
    central.
  - **Modo B — Combate centralizado**: estado do combate no servidor (ou cliente
    host), turnos sincronizados via socket. Mais fiel, muito mais complexo.
- [ ] Definir regras: XP dividido (fórmula `getXpMultiplier` já existe no
      usePartyStore), loot (cada um rola o seu + LOOT_BONUS), morte (membro
      cai → segue lutando sozinho até o fim da sessão?).

### 1.2 Servidor — sessão de combate de party
- [ ] Estado `partyCombat` (Map): partyId → { region, members[], round,
      kills, contributions: Map<name, {dmgDealt, dmgTaken, kills}> }
- [ ] Eventos socket novos:
  - [ ] `party_combat:start { partyId, region, dungeonId? }` (líder inicia)
  - [ ] `party_combat:join/leave` (membro entra/sai da sessão)
  - [ ] `party_combat:turn { dmgDealt, dmgTaken, killed?, enemyId }` (cada
        cliente reporta seu turno; servidor valida com sanity caps por nível)
  - [ ] `party_combat:summary` (broadcast do agregado por turno p/ UI)
  - [ ] `party_combat:end { xpShare, goldShare, lootRolls }` (distribuição)
- [ ] Validar: só membros da party entram; sessão morre com disband/disconnect
      do líder (ou passa liderança, como na party)
- [ ] Sanity anti-cheat básico: teto de dano por turno = f(nível, ATK máximo
      possível do catálogo) — log de suspeita

### 1.3 Client — integração no motor de combate
- [ ] `combatEngine.start()` ganha modo party: registra na sessão via socket
- [ ] Ao fim de cada turno local → enviar `party_combat:turn`
- [ ] Receber `party_combat:summary` → alimentar feed de contribuições
- [ ] Auras reais: membros enviam snapshot de `ResolvedEffects` resumido
      (PARTY_ATK_AURA 79 / PARTY_DEF_AURA 80) no start; servidor agrega e
      devolve bônus efetivo que o client aplica via effectEngine
- [ ] XP/ouro da sessão aplicados via `gainXp/gainGold` + `recordDailyEvent`
- [ ] Dungeons em party: andares compartilhados (todos avançam juntos) e
      recompensa de dungeon para cada membro

### 1.4 UI
- [ ] CombatPanel: barra lateral de party (HP dos membros, contribuição de
      dano por turno, kills)
- [ ] PartyPanel: botão "🎯 Caçar em grupo" (líder) + estado da sessão
- [ ] Chat de party já funciona dentro do combate (`/p`)
- [ ] Toast de distribuição de loot/XP no fim da sessão

### 1.5 Qualidade
- [ ] Testes: sanity caps e divisão de XP (extrair lógica p/ função pura +
      node:test)
- [ ] i18n: `partyCombat.*` nos 4 idiomas
- [ ] Auditoria: novos checks no `tools/item-effects/audit_item_effects.ts`
      (ou auditoria social separada)
- [ ] Atualizar PROJECT_MEMORY.md §5.7

---

## 🏛 CASO 2 — Leilão com bids (evolução do mercado)

- [ ] Modelo `Auction`: itemStr, sellerName, startPrice, minIncrement,
      bids[{name, amount, at}], expiresAt, status
- [ ] Rotas: criar leilão (taxa em 💎), dar lance (bloqueia 💎 do licitante),
      retract (devolve), finalizar (auto por expiração — job/cron ou lazy
      check no acesso), entregar item ao vencedor + 💎 ao vendedor (mail)
- [ ] Client: aba "Leilões" no MarketPanel (listagem, contagem regressiva,
      lance rápido +2/+5/+10%, meus lances)
- [ ] Edge cases: vendedor cancela com lances? (regra: não pode após 1º lance)
- [ ] Notificar via socket: outbid, arremate

## 💳 CASO 3 — Gateway de pagamento para crystals

- [ ] Escolher gateway (Mercado Pago / Stripe / Pagar.me — BR: Pix via
      Mercado Pago é o caminho natural)
- [ ] Modelo `Purchase`: playerId, charName, amountCrystals, amountBRL,
      provider, providerRef, status(pending/paid/failed), createdAt
- [ ] Webhook do provider → valida assinatura → credita crystals (idempotente
      por providerRef)
- [ ] Tela de compra no client (pacotes: 100/550/1200/2600 💎 com bônus)
- [ ] Rota grant via ADMIN_KEY vira fallback interno (manter p/ suporte)
- [ ] LGPD/básico: sem armazenar dados de cartão (provider tokeniza)

## 🔔 CASO 4 — Persistência de sussurros + melhorias sociais

- [ ] Modelo `Whisper` (from, to, text, read, createdAt) — caixa de entrada
      de sussurros offline
- [ ] Badge de não lidas no ChatPanel/Navbar
- [ ] Histórico de chat de party persistente (opcional, como ChatMessage com
      scope)
- [ ] Bloquear/mutar jogador (client-side filter + flag no perfil)
- [ ] `/who` lista jogadores online

## 🧪 CASO 5 — Robustez & qualidade (contínuo)

- [ ] Testes de integração mail/market/guild com mongodb-memory-server
- [ ] Teste do fluxo de trade (validação pré-mutação)
- [ ] Persistir trades/parties em Mongo (hoje em memória — reiniciou, perdeu)
- [ ] Busca/ordenação no mercado por nome
- [ ] Code-splitting do bundle client (lazy-load dos painéis; bundle já ~480 kB)
- [ ] Logs estruturados no server (pino) + health detalhado
- [ ] Balanceamento: preços 💎, custos craft/upgrade, drop rates (com dados
      reais após deploy)
- [ ] CI: GitHub Actions (tsc + build + audit + npm test)

## 📦 CASO 6 — Colocar no ar (bloqueia testes reais multiplayer)

- [ ] Criar cluster MongoDB Atlas (M0) + user + IP liberado
- [ ] Subir server no Railway com as envs (MONGO_URI, JWT_SECRET, CLIENT_URL,
      ADMIN_KEY) — `railway.json` já pronto
- [ ] Vercel: importar repo + env `VITE_API_URL` apontando pro Railway
- [ ] Testar fluxo ponta a ponta: registro → criar char → chat global com 2
      navegadores → sussurro → convite de party → mercado
- [ ] Definir URL final e atualizar defaults no `api.ts` se necessário

---

## 📏 REGRAS DE OURO (para qualquer item acima)

1. Nunca quebrar a auditoria: `cd client && npm run audit` → 89/89
2. Nunca quebrar os testes: `cd server && npm test` → 11/11
3. Moedas: mercado/leilão/trades SEMPRE em 💎 crystals; ouro fica fora do P2P
4. Tudo que vai pro wire usa itemStr (`numId|e:v|...`), nunca objeto de item
5. i18n sempre nos 4 idiomas (pt-BR, en-US, es-ES, ja-JP)
6. node_modules não persiste entre sessões: reinstalar ao iniciar
7. Atualizar PROJECT_MEMORY.md + esta checklist ao concluir itens
