const https = require('https');

const RAILWAY_URL = process.env.RAILWAY_URL || 'https://chatbot-production-d647.up.railway.app/health';
const INTERVALO_MS = 14 * 60 * 1000;

function pingKeepAlive() {
    const agora = new Date();
    const horaBrasilia = new Date(agora.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const diaSemana = horaBrasilia.getDay();
    const hora = horaBrasilia.getHours();

    const ehDiaUtil = diaSemana >= 1 && diaSemana <= 5;
    const ehHorarioComercial = hora >= 7 && hora < 19;

    if (!ehDiaUtil || !ehHorarioComercial) {
        console.log('Keep-alive: fora do horário comercial, sem ping.');
        return;
    }

    https.get(RAILWAY_URL, (res) => {
        console.log(`Keep-alive ping: ${res.statusCode}`);
    }).on('error', err => {
        console.error('Erro no keep-alive:', err.message);
    });
}

setInterval(pingKeepAlive, INTERVALO_MS);
