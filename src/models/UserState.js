const mongoose = require('mongoose');

const userStateSchema = new mongoose.Schema({
    from: { type: String, required: true, unique: true },
    estado: { type: String, default: 'livre' }
}, { timestamps: true });

module.exports = mongoose.model('UserState', userStateSchema);
