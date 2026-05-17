const UserState = require('../models/UserState');

async function getEstado(from) {
    const doc = await UserState.findOne({ from });
    return doc ? doc.estado : null;
}

async function setEstado(from, estado) {
    await UserState.findOneAndUpdate(
        { from },
        { estado },
        { upsert: true, new: true }
    );
    console.log(`Estado de ${from} → ${estado}`);
}

async function limparEstado(from) {
    await UserState.findOneAndUpdate(
        { from },
        { estado: 'livre' },
        { upsert: true }
    );
}

module.exports = { getEstado, setEstado, limparEstado };
