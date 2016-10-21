"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const weather = require("./api/weather/weather.js");
const city = require("./api/city/city.js");
app.use(bodyParser.json({ type: 'application/json' }));

app.use('/', express.static('../public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
});


app.use((err, req, res, next) => {
  res.status(err.status || 500)
  .json({
    status: 'error',
    message: err.message
  });
  next();
});

app.use('/api', weather);
app.use('/api', city);

module.exports = app;
