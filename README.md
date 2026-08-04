# Projeto: Eclipsia: Fronteira dos Arcanos

MMORPG de navegador gratuito sem pay to win.

## Stack

React + TypeScript + Vite + Tailwind CSS + Zustand / Node.js + Express + MongoDB + Socket.io + JWT

## Idiomas

Todo texto visível do jogo deve estar no i18n em:

- pt-BR
- en-US
- es-ES
- ja-JP

## Regras principais

- Sem pay to win: apenas cosméticos podem ser vendidos.
- Sem rolagem externa de página: apenas scroll interno em painéis.
- Sem punição por morte.
- Tentativas ilimitadas em todos os conteúdos.
- Combate Auto e Avanço Auto são botões separados.
- Avanço Auto sempre ativa Combate Auto.
- Sem stamina ou energia limitada.
- Sorte tem teto 1000 e nunca é vendida (+0,1% de XP por ponto).

## Como rodar o frontend

```bash
cd client
npm install
npm run dev
```

Frontend local:

```txt
http://localhost:5173
```

> Em dev fora de localhost (ex.: preview online), o client usa caminho relativo
> (`/api` e `/socket.io`) e o Vite faz proxy para `localhost:5000`
> (configurado em `vite.config.ts`). `VITE_API_URL` sempre tem prioridade.
> O dev server aceita qualquer host: `npm run dev -- --host 0.0.0.0`.

## Como rodar o backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Backend local:

```txt
http://localhost:5000
```

## Variáveis do backend

Arquivo: `server/.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/eclipsia
JWT_SECRET=MUDE_ISSO
CLIENT_URL=http://localhost:5173
```

## Deploy

### 1. MongoDB Atlas

1. Criar conta em `mongodb.com/atlas`.
2. Criar cluster gratuito M0.
3. Criar usuário do banco.
4. Liberar IP `0.0.0.0/0`.
5. Copiar a connection string.

### 2. Railway Backend

1. Criar conta em `railway.app`.
2. New Project → Deploy from GitHub.
3. Selecionar a pasta `/server`.
4. Configurar variáveis de ambiente:

```env
MONGO_URI=(sua connection string)
JWT_SECRET=(string longa e aleatória)
CLIENT_URL=https://eclipsia.vercel.app
```

5. Guardar a URL gerada pelo Railway.

### 3. Vercel Frontend

1. Criar conta em `vercel.com`.
2. New Project → Import from GitHub.
3. Root directory: `client`.
4. Build command: `npm run build`.
5. Output: `dist`.
6. Variável de ambiente:

```env
VITE_API_URL=(sua URL do Railway)
```

O frontend normaliza a URL automaticamente e adiciona `/api` quando necessário.

## Checklist final

- [x] Todos os arquivos criados
- [x] `npm install` funciona em `client/`
- [x] `npm install` funciona em `server/`
- [x] Sem erros de TypeScript
- [x] Build do Vite funciona (`npm run build`)
- [x] Traduções nos 4 idiomas
- [x] Backend conecta ao MongoDB via `MONGO_URI`
- [x] Auth implementado com registro + login
- [x] CORS configurado para localhost, produção e Vercel
- [x] `.env.example` atualizado
- [x] README completo
- [x] `.gitignore` correto, sem `.env` ou `node_modules`
