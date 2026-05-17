const { parse, subDays } = require('date-fns');

const feriadosFixos = [
    '01-01',
    '04-21',
    '05-01',
    '07-02',
    '09-07',
    '10-12',
    '11-02',
    '11-15',
    '12-08',
    '12-25',
];

function getMesDia(date) {
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    return `${mes}-${dia}`;
}

function isFeriado(date) {
    return feriadosFixos.includes(getMesDia(date));
}

function verificarDataInvalida(dataStr) {
    try {
        const data = parse(dataStr, 'dd/MM/yyyy', new Date());

        if (isNaN(data)) return true;
        if (isFeriado(data)) return true;

        for (let i = 1; i <= 2; i++) {
            const anterior = subDays(data, i);
            if (isFeriado(anterior)) return true;
        }

        return false;
    } catch {
        return true;
    }
}

module.exports = { verificarDataInvalida };
