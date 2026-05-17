let ultimoQR = null;
let qrExpirado = false;

function setQR(qr) {
    ultimoQR = qr;
    qrExpirado = false;
}

function expireQR() {
    qrExpirado = true;
    ultimoQR = null;
    console.log('QR code expirado, aguardando novo...');
}

function getQR() {
    return { ultimoQR, qrExpirado };
}

module.exports = { setQR, expireQR, getQR };
