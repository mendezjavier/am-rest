const express = require('express');
const app = express();

app.use(require('./hoteles'));

app.use(require('./imagenes'));

module.exports = app;