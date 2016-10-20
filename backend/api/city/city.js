'use strict';
const express = require('express');
const router = express.Router();

const { db, sql } = require('../../utils/db.js');
const getAllCitiesSQL = sql('./getCities.sql');
const addCitySQL = sql('./addCity.sql');

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
  const { woeid = "Woeid not specified.",
       country = "Country not specified.",
       region = "Region not specified.",
       district = "District not specified.",
       county = "County not specified.",
       city = "City not specified" } = req.body.city;

  const queryParams = [woeid, country, region, district, county, city];
  db.none(addCitySQL , [woeid, country, region, district, county, city])
    .then((data) => res.json({
      status: "succes",
      message: "inserted one puppy",
      data
    }))
    .catch(err => res.json({ err }));

};

const getAllCities = (req, res) => {
  db.any(getAllCitiesSQL)
    .then(data => res.json(data))
    .catch(err => console.log(error));
};



router.get('/cities', getAllCities)

router.get('/city/check/:zipcode', apiCheckCityRoute);

router.post('/city/add', apiAddCityRoute);

module.exports = router;
