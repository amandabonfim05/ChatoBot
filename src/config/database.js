const mongoose = require('mongoose');

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado ao MongoDB');
    } catch (err) {
        console.error('Erro ao conectar no MongoDB:', err);
        throw err;
    }
}

module.exports = { connectDatabase, mongoose };
