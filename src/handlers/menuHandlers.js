const { setEstado } = require('../states/userState');
const { responder } = require('../utils/responder');
const { MENUS } = require('../constants/menus');

const menuHandlers = {
    '1': handleRescisao,
    '2': handleFerias,
    '3': handleRecalculo,
    '4': handleFaturamento,
    '5': handleAtendente,
    '6': handleCancelamento,
    '7': handleAvisoPrevioTrabalhado,
    '8': handleAvisoPrevioIndenizado,
};

async function handleMenu(msg, client) {
    const handler = menuHandlers[msg.body];
    if (!handler) return;
    await handler(msg, client);
}

async function handleRescisao(msg, client) {
    await responder(msg, client, MENUS.rescisao);
}

async function handleFerias(msg, client) {
    await setEstado(msg.from, 'aguardando_data');
    await responder(msg, client, 'Qual a data de início das férias? (Formato: dd/MM/yyyy)');
}

async function handleRecalculo(msg, client) {
    await setEstado(msg.from, 'em_atendimento');
    await responder(msg, client, [
        'Informe qual o imposto e a data para pagamento.',
        MENUS.aguardandoAtendente,
    ]);
}

async function handleFaturamento(msg, client) {
    await setEstado(msg.from, 'em_atendimento');
    await responder(msg, client, [
        'Qual o período do faturamento?',
        MENUS.aguardandoDoc,
    ]);
}

async function handleAtendente(msg, client) {
    await setEstado(msg.from, 'em_atendimento');
    await responder(msg, client, MENUS.aguardandoAtendente);
}

async function handleCancelamento(msg, client) {
    await setEstado(msg.from, 'livre');
    await responder(msg, client, MENUS.encerramento);
}

async function handleAvisoPrevioTrabalhado(msg, client) {
    await setEstado(msg.from, 'em_atendimento');
    await responder(msg, client, [
        'Informe nome do funcionário, data de início do aviso, e observações necessárias.',
        MENUS.aguardandoAtendente,
    ]);
}

async function handleAvisoPrevioIndenizado(msg, client) {
    await setEstado(msg.from, 'em_atendimento');
    await responder(msg, client, [
        'Informe nome do funcionário, data da demissão, e observações necessárias.',
        MENUS.aguardandoAtendente,
    ]);
}

module.exports = { handleMenu };
