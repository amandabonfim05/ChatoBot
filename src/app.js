const express = require('express');
const app = express();

app.use(express.json());

const healthRoutes = require('./routes/healthRoutes');
const qrRoutes = require('./routes/qrRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

app.use('/', healthRoutes);
app.use('/', qrRoutes);
app.use(errorHandler);

module.exports = app;