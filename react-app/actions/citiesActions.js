import * as actionTypes from "./actionTypes";
import axios from "axios";

// const url = "http://colortv-92112.onmodulus.net"
const url = "http://localhost:3000";

export function addCity (cityObj) {
  const { nameOrZip , city } = cityObj;
  const cityToAdd = Object.assign({}, city, { nameOrZip });

  return function (dispatch) {
    axios.post(`${url}/api/city/add`, { city: cityToAdd })
      .then(response => dispatch(addCitySuccess(city)))
      .catch(error => dispatch(addCityFailure(error)));
  };
};

export function addCitySuccess (city) {
  return {
    type: actionTypes.ADD_CITY,
    city,
  };
};

export function addCityFailure (error) {
  return {
    type: actionTypes.ADD_CITY_FAILURE,
    notification: error
  };
};

export function deleteCity (woeid) {
  return function (dispatch) {
    axios.delete(`${url}/api/city/delete/${woeid}`)
      .then(res => dispatch(deleteCitySuccess(woeid)))
      .catch(error => dispatch(deleteCityFailure(error)));

      return {
        type: actionTypes.DURING_ACTION,
        duringAction: true
      };
  };
}

export function deleteCitySuccess (woeid) {
  return {
    type: actionTypes.DELETE_CITY,
    woeid
  };
};

export function deleteCityFailure (error) {
  return {
    type: actionTypes.DELETE_CITY_FAILURE,
    notification: error
  };
}

export function checkSimilarCities (nameOrZip) {
  return function (dispatch) {
    axios.get(`${url}/api/city/check/${nameOrZip}`)
      .then(response => dispatch(checkSimilarCitiesSuccess(response.data.places)))
      .catch(err => dispatch(checkSimilarCitiesFailure(err)));

      return {
        type: actionTypes.DURING_ACTION,
        duringAction: true
      };
  }
};

export function checkSimilarCitiesSuccess (cities) {
  return {
    type: actionTypes.SIMILAR_CITIES_ARRIVED,
    similarCities: cities
  };
};


export function checkSimilarCitiesFailure (error) {
  return {
    type: actionTypes.SIMILAR_CITIES_FAILURE,
    notification: error
  };
};



export function editCity (city) {
  return function (dispatch) {
    axios.put(`${url}/api/city/edit/`, { city })
      .then(res => dispatch(editCitySuccess(city)))
      .catch(error => dispatch(editCityError(error)));

      return {
        type: actionTypes.DURING_ACTION,
        duringAction: true
      };
  };
};

export function editCitySuccess (city) {
  return {
    type: actionTypes.EDIT_CITY,
    city
  };
}

export function editCityError (error) {
  return {
    type: actionTypes.EDIT_CITY_FAILURE,
    notification: error
  }
}

export function fetchCitiesSuccess (res) {
  const cities = res.data;
  return {
    type: actionTypes.FETCH_CITIES_SUCCESS,
    cities
  };
}

export function fetchCitiesError (error) {
  return {
    type: actionTypes.FETCH_CITIES_FAILURE,
    notification: error
  }
}

export function getAllCitiesFromDB () {
  return function (dispatch) {
    axios.get(`${url}/api/cities`)
      .then(response => dispatch(fetchCitiesSuccess(response)))
      .catch(error => dispatch(fetchCitiesError(error)));

      return {
        type: actionTypes.DURING_ACTION,
        duringAction: true
      };
  };
}
