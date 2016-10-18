import * as actionTypes from "./actionTypes";
import axios from "axios";

export function fetchError (error) {
  return {
    type: FETCH_ERROR,
    error,
  };
}

export function  fetchSucces (data) {
  return {
    type: WEATHER_RECEIVED,
    data
  };
}

export function fetchWeather (zipOrZips) {
  const cityOrCities = (Array.isArray(zipOrZips)) ? "cities" : "city";

  return function (dispatch) {
    axios.get(`localhost:3000/api/weather/${cityOrCities}/${zipOrZips}`)
      .then(response => dispatch(fetchSucces(response)))
      .catch(error => dispatch(fetchError(error)));
  };
}
