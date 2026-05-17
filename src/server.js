require('dotenv').config();
const app = require('./app');
const { connectDatabase } = require('./config/database');
const { initializeWhatsApp } = require('./config/whatsapp');
require('./jobs/keepAlive');

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await connectDatabase();
        await initializeWhatsApp();

        app.listen(PORT, () => {
            console.log(`Servidor HTTP rodando na porta ${PORT}`);
        });
    } catch (err) {
        console.error('Erro fatal ao iniciar servidor:', err);
        process.exit(1);
    }
}

start();
