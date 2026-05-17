const { delay } = require('./delay');

async function responder(msg, client, textos) {
    try {
        const mensagens = Array.isArray(textos) ? textos : [textos];
        const chat = await msg.getChat();

        for (const texto of mensagens) {
            await delay(800);
            await chat.sendStateTyping();
            await delay(1000);
            await client.sendMessage(msg.from, texto);
        }
    } catch (err) {
        console.error('Erro ao enviar mensagem:', err.message);
    }
}

module.exports = { responder };
