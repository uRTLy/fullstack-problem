'use strict';

const app = require('./backend/server.js');
const express = require('express');
app.use('/', express.static('public'));

app.listen(process.env.PORT || 8080);
