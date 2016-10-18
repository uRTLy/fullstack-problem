'use strict';
const express = require('express');
const request = require('request-promise');

const {
  transform,
  mapResponseToReadableObject } = require("../../utils/yahooParser.js");


const router = express.Router();

const yahooURL = 'https://query.yahooapis.com/v1/public/yql?q=';
const endURL = "&format=json"

const weatherQuery = woeid => `select * from weather.forecast where woeid='${woeid}')`;

const get = query => request(`${yahooURL}${query}${endURL}`);

// router.get('/weather/cities/:zipcodes', routingArrayOfZipCodes);

const routingZipCode = function (req, res) {
  const query = woeidQuery(req.params.zipcode);

  const getPossibleWoeids = get(query)
    .then(location => {
      const response = JSON.parse(location).query.results.place;
      res.json({
        places: mapResponseToReadableObject(response)
      });
    });
}


function getWeather (woeid) {
  return get(weatherQuery(woeid))
    .then(response => console.log(response));
}


function routingArrayOfZipCodes (req, res) {

}

router.get('/weather/city/:zipcode', routingZipCode);

module.exports = router;
