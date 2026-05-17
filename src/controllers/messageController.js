const { getEstado, setEstado } = require('../states/userState');
const { handleMenu } = require('../handlers/menuHandlers');
const { handleState } = require('../handlers/stateHandlers');
const { GREETING_REGEX } = require('../constants/messages');
const { responder } = require('../utils/responder');
const { MENUS } = require('../constants/menus');

async function handleOutgoingMessage(msg, client) {
    if (!msg.fromMe) return;
    if (msg.body !== '!fechar') return;

    await setEstado(msg.to, 'livre');
    console.log('Atendimento encerrado para:', msg.to);

    try {
        await client.sendMessage(msg.to, MENUS.encerramentoAtendente);
    } catch (err) {
        console.error('Erro ao enviar mensagem de encerramento:', err.message);
    }
}

async function handleIncomingMessage(msg, client) {
    if (!msg.from.endsWith('@c.us')) return;

    console.log(`Mensagem de: ${msg.from} | corpo: "${msg.body}"`);

    const estado = await getEstado(msg.from);

    if (estado === 'em_atendimento') return;

    if (GREETING_REGEX.test(msg.body.trim()) || !estado || estado === 'livre') {
        await handleGreeting(msg, client);
        return;
    }

    if (estado && estado !== 'livre' && estado !== 'bot') {
        const handled = await handleState(msg, client, estado);
        if (handled) return;
    }

    await handleMenu(msg, client);
}

async function handleGreeting(msg, client) {
    try {
        await setEstado(msg.from, 'bot');
        const contact = await msg.getContact();
        const firstName = (contact.pushname || 'Usuário').split(' ')[0];
        await responder(msg, client, MENUS.principal(firstName));
    } catch (err) {
        console.error('Erro ao tratar saudação:', err.message);
    }
}

module.exports = { handleIncomingMessage, handleOutgoingMessage };
