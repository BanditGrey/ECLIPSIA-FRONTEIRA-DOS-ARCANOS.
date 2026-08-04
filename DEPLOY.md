# 🚀 Deploy — ECLIPSIA: FRONTEIRA DOS ARCANOS

Arquitetura: **client** (Vite/React → Vercel) + **server** (Express + Socket.io → Railway) + **MongoDB Atlas**.

## 1. MongoDB Atlas
1. Crie um cluster gratuito (M0) e um database user.
2. Em **Network Access**, libere `0.0.0.0/0` (ou o IP do serviço).
3. Connection string: `mongodb+srv://USER:PASS@cluster.mongodb.net/eclipsia`

## 2. Server → Railway
1. Novo projeto no Railway → **Deploy from GitHub repo** (este repositório).
2. O `railway.json` na raiz já define build/start (`server/`) e healthcheck `/api/health`.
3. Variáveis de ambiente (ver `server/.env.example`):
   ```
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=<string longa e aleatória>
   CLIENT_URL=https://<seu-client>.vercel.app
   PORT            # o Railway injeta automaticamente
   ```
4. Anote a URL pública gerada (ex.: `https://eclipsia-server-production.up.railway.app`).

## 3. Client → Vercel
1. Importe o repo na Vercel (o `vercel.json` já aponta build/output do client).
2. Variável de ambiente:
   ```
   VITE_API_URL=https://<url-do-server>.up.railway.app/api
   ```
   Sem ela, produção usa o default `https://eclipsia-server.railway.app/api` (ver `client/src/services/api.ts`).

## 4. CORS
O servidor aceita origens: `localhost:3000/4173/5173`, `*.vercel.app` e `CLIENT_URL`.
Se o client sair da Vercel, ajuste `CLIENT_URL` no server.

## 5. Verificação
- `GET https://<server>/api/health` → `{ status: 'ok', online: N }`
- Abra o client → login → chat global e correio devem conectar (socket).

## Economia do mercado (ajustável em `server/src/routes/market.routes.js`)
- **O mercado mundial usa 💎 Cristais (moeda paga)** — o ouro do jogo fica isolado da economia P2P.
- `MARKET_TAX_RATE = 0.05` → imposto de 5% sobre vendas (pago em crystals).
- `MARKET_LISTING_FEE = 2` → taxa de listagem em crystals, não reembolsável.
- **Concessão de crystals (vendas)**: `POST /api/player/crystals/grant` com header
  `x-admin-key: $ADMIN_KEY` e body `{ charName, amount }`. Configure `ADMIN_KEY`
  no ambiente do servidor (ver `.env.example`) e use para vendas out-of-band (PIX etc.).

## Segurança ativa
- Rate limiting: API global 600/15min · auth 20/15min · ações de economia 60/min.
- Socket: chat 5 msgs/10s · trade:update 10/10s (por conexão).
- Payloads JSON limitados a 1 MB; helmet + CORS restrito.
