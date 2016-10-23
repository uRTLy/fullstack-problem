'use strict';
const express = require('express');
const request = require('request-promise');
const Promise = require('bluebird');

const router = express.Router();

const {
  transform,
  mapResponseToReadableObject,
  weatherResponseParser } = require("../../utils/yahooParser.js");

const yahooURL = 'https://query.yahooapis.com/v1/public/yql?q=';
const endURL = "&format=json"

const weatherQuery = woeid => `select * from weather.forecast where woeid='${woeid}'`;

const get = query => request(`${yahooURL}${query}${endURL}`);

const getWeather = (woeid) => {
  return get(weatherQuery(woeid));
};

const routingZipCode = (req, res, next) => {
  getWeather(req.params.zipcode)
        .then(weather => res.send(weatherResponseParser(weather)))
        .catch(error => next(error));
};

const routingMultipleZipcodes = (req, res, next)=> {
  const zipArray = req.params.zipcodes.split(',');
  const promises = zipArray.map(zip => getWeather(zip));
  Promise.all(promises).then(response => {
    const parsedResponse = response.map(weatherResponseParser);
    res.send(parsedResponse);
  })
  .catch(error => next(error));

};

router.get('/weather/city/:zipcode', routingZipCode);
router.get('/weather/cities/:zipcodes', routingMultipleZipcodes);


module.exports = router;
