import * as actionTypes from "./actionTypes";
import axios from "axios";

const url = "http://colortv-92112.onmodulus.net"

export function fetchWeather (zipOrZips) {
  const cityOrCities = (zipOrZips.length > 1) ? "cities" : "city";
  const places = zipOrZips.join(",");
  return function (dispatch) {
    axios.get(`${url}/api/weather/${cityOrCities}/${places}`)
      .then(response => dispatch(fetchSuccess(response)))
      .catch(error => dispatch(fetchError(error)));

      return {
        type: actionTypes.DURING_ACTION,
        duringAction: true
      };
  };
}

export function fetchError (error) {
  return {
    type: actionTypes.FETCH_WEATHER_FAILURE,
    notification: error,
  };
}

export function fetchSuccess (weather) {
  return {
    type: actionTypes.FETCH_WEATHER_SUCCESS,
    weather: weather.data
  };
}
