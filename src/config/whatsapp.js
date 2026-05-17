const { Client, RemoteAuth } = require('whatsapp-web.js');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const { handleIncomingMessage, handleOutgoingMessage } = require('../controllers/messageController');
const { setQR, expireQR } = require('../controllers/qrController');

let client = null;

function getClient() {
    return client;
}

async function initializeWhatsApp() {
    const store = new MongoStore({ mongoose });

    client = new Client({
        authStrategy: new RemoteAuth({
            clientId: 'procont',
            store,
            backupSyncIntervalMs: 300000,
            dataPath: '/tmp/.wwebjs_auth'
        }),
        puppeteer: {
            headless: true,
            executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
            ]
        }
    });

    client.on('loading_screen', (percent, message) => {
        console.log(`Carregando: ${percent}% - ${message}`);
    });

    client.on('authenticated', () => {
        console.log('Autenticado com sucesso!');
    });

    client.on('auth_failure', msg => {
        console.error('Falha na autenticação:', msg);
    });

    client.on('disconnected', reason => {
        console.log('Cliente desconectado:', reason);
    });

    client.on('qr', qr => {
        console.log('QR code gerado! Acesse: /qr');
        setQR(qr);
        setTimeout(expireQR, 60000);
    });

    client.on('ready', () => {
        console.log('Cliente pronto e conectado!');
    });

    client.on('message_create', async msg => {
        try {
            await handleOutgoingMessage(msg, client);
        } catch (err) {
            console.error('Erro em message_create:', err.message);
        }
    });

    client.on('message', async msg => {
        try {
            await handleIncomingMessage(msg, client);
        } catch (err) {
            console.error('Erro em message:', err.message);
        }
    });

    console.log('Cliente WhatsApp inicializando...');
    client.initialize();
}

module.exports = { initializeWhatsApp, getClient };
