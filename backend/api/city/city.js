'use strict';
const express = require('express');
const router = express.Router();

const {
  transform,
  mapResponseToReadableObject } = require('../../utils/yahooParser.js');

const request = require('request-promise');

const yahooURL = 'https://query.yahooapis.com/v1/public/yql?q=';
const endURL = '&format=json'

// woeid - where on earth id - yahoo's equivalent of zipcode
const woeidQuery = location => `select * from geo.places where text='${location}'`;

const get = query => request(`${yahooURL}${query}${endURL}`);

const apiCheckCityRoute = (req, res) => {
  const query = woeidQuery(req.params.zipcode);

  const getPossibleWoeids = get(query)
    .then(location => {
      const response = JSON.parse(location).query.results.place;
      res.json({
        places: mapResponseToReadableObject(response)
      });
    });
};

const apiAddCityRoute = (req, res) => {


};


router.get('/city/check/:zipcode', apiCheckCityRoute);

router.post('/city/add', apiAddCityRoute);

module.exports = router;
