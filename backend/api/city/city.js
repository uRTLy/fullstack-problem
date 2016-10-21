'use strict';
const express = require('express');
const router = express.Router();

const { db, sql } = require('../../utils/db.js');
const getAllCitiesSQL = sql('./getCities.sql');
const addCitySQL = sql('./addCity.sql');
const deleteCitySQL = sql('./deleteCity.sql');
const updateCitySQL = sql('./updateCity.sql');


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

const apiAddCityRoute = (req, res, next) => {
  let { woeid = "Woeid not specified.",
       country = "Country not specified.",
       region = "Region not specified.",
       district = "District not specified.",
       county = "County not specified.",
       city = "City not specified",
       nameOrZip } = req.body.city;
       city = city.includes("not specified") ? nameOrZip : city;

  db.result(addCitySQL , [woeid, country, region, district, county, city])
    .then(data => {
      res
        .status(200)
        .json({
        status: "success",
        data,
        message: "City has been added successfully"})
    })
    .catch(error => next(error));

};

const apiGetAllCities = (req, res, next) => {
  db.any(getAllCitiesSQL)
    .then(data => res.json(data))
    .catch(error => next(error));
};

const apiEditCityRoute = (req, res, next) => {
  const { woeid, country, region, district, county, city, id } = req.body.city;
  db.none(updateCitySQL, [woeid, country, region, district, county, city, id])
    .then(() => {
      res
       .status(200)
       .json({
         status: "success",
         message: "City has been updated successfully"});
    })
    .catch(error => next(error));

};

const apiDeleteCityRoute = (req, res, next) => {
  console.log(req.params);
  db.result(deleteCitySQL, [req.params.woeid])
    .then(result => {
      res
       .status(200)
       .json({
         status: "success",
         result,
         message: "City has been deleted successfully"});
    })
    .catch(error => next(error));
};



router.get('/cities', apiGetAllCities)

router.get('/city/check/:zipcode', apiCheckCityRoute);

router.post('/city/add', apiAddCityRoute);

router.put('/city/edit', apiEditCityRoute);

router.delete('/city/delete/:woeid', apiDeleteCityRoute);


module.exports = router;
