# Procont Bot — WhatsApp

Bot de atendimento WhatsApp da Procont, rodando no Render com MongoDB Atlas.

## Estrutura

```
src/
├── app.js               → Express setup
├── server.js            → Entry point
├── config/
│   ├── database.js      → Conexão MongoDB
│   └── whatsapp.js      → Client WhatsApp
├── controllers/
│   ├── messageController.js
│   └── qrController.js
├── handlers/
│   ├── menuHandlers.js  → Mapa de opções do menu
│   └── stateHandlers.js → Fluxos de estado (ex: aguardando_data)
├── routes/
│   ├── healthRoutes.js
│   └── qrRoutes.js
├── utils/
│   ├── delay.js
│   ├── responder.js     → Helper que elimina código repetido
│   ├── validators.js
│   └── holidayValidator.js
├── states/
│   └── userState.js     → Estado dos usuários em memória
├── constants/
│   ├── menus.js         → Textos dos menus
│   └── messages.js      → Regex e constantes
├── middlewares/
│   └── errorHandler.js
└── jobs/
    └── keepAlive.js     → Ping periódico (dias úteis, 7h-19h)
```

## Variáveis de Ambiente

Copie `.env.example` para `.env` e preencha:

```
PORT=3000
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/procont
CHROMIUM_PATH=/usr/bin/chromium
RAILWAY_URL=https://chatbot-production-d647.up.railway.app/health
```

## Deploy no Railway

1. Suba o projeto para o GitHub
2. No Railway, crie um novo projeto → "Deploy from GitHub repo"
3. Adicione as variáveis de ambiente acima nas Settings do Railway
4. O Railway detecta automaticamente o `npm start` do `package.json`
5. Acesse `https://seu-app.up.railway.app/qr` para escanear o QR Code

## Comando !fechar

Para encerrar um atendimento humano e liberar o bot novamente, o atendente envia:
```
!fechar
```
na conversa do cliente via WhatsApp Web/App do atendente.

## Para escalar futuramente

- **Estado em Redis**: substitua `src/states/userState.js` por conexão Redis (ex: `ioredis`)
- **Novo menu**: adicione entrada em `src/handlers/menuHandlers.js` e texto em `src/constants/menus.js`
- **Novo estado de fluxo**: adicione handler em `src/handlers/stateHandlers.js`
