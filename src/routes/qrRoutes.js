const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const { getQR } = require('../controllers/qrController');

router.get('/qr', async (req, res) => {
    const { ultimoQR, qrExpirado } = getQR();

    if (!ultimoQR || qrExpirado) {
        return res.send(`
            <html>
                <head>
                    <meta http-equiv="refresh" content="3">
                    <title>Aguardando QR</title>
                </head>
                <body style="font-family:sans-serif;padding:2rem;">
                    <p>⏳ Aguardando QR code... (página atualiza automaticamente)</p>
                </body>
            </html>
        `);
    }

    try {
        const qrImage = await QRCode.toDataURL(ultimoQR);
        res.send(`
            <html>
                <head>
                    <meta http-equiv="refresh" content="55">
                    <title>QR Code Procont</title>
                </head>
                <body style="font-family:sans-serif;padding:2rem;text-align:center;">
                    <h3>📱 Escaneie com o WhatsApp:</h3>
                    <img src="${qrImage}" style="max-width:300px;" />
                    <p style="color:#888;">Página atualiza a cada 55 segundos</p>
                </body>
            </html>
        `);
    } catch (err) {
        console.error('❌ Erro ao gerar QR image:', err.message);
        res.status(500).send('Erro ao gerar QR code.');
    }
});

module.exports = router;
