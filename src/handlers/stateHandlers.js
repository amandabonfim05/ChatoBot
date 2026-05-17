const { setEstado } = require('../states/userState');
const { responder } = require('../utils/responder');
const { verificarDataInvalida } = require('../utils/holidayValidator');
const { isValidDateFormat } = require('../utils/validators');
const { MENUS } = require('../constants/menus');

const stateHandlers = {
    'aguardando_data': handleAguardandoData,
};

async function handleState(msg, client, estado) {
    const handler = stateHandlers[estado];
    if (!handler) return false;
    await handler(msg, client);
    return true;
}

async function handleAguardandoData(msg, client) {
    if (!isValidDateFormat(msg.body)) {
        await responder(msg, client, 'Data inválida. Por favor, informe no formato dd/MM/yyyy (ex: 15/08/2025).');
        return;
    }

    if (verificarDataInvalida(msg.body)) {
        await responder(
            msg,
            client,
            `A data ${msg.body} não pode ser utilizada pois cai em um feriado ou até 2 dias antes de um feriado.\n\nPor favor, informe uma nova data (Formato: dd/MM/yyyy).`
        );
        return;
    }

    await setEstado(msg.from, 'em_atendimento');
    await responder(msg, client, [
        `Data registrada com sucesso: *${msg.body}*`,
        'Qual o nome do funcionário?',
        MENUS.aguardandoDoc,
    ]);
}

module.exports = { handleState };
