import * as actionTypes from "./actionTypes";
import axios from "axios";

export function addCity (city) {

  return function (dispatch) {
    axios.post(`http://localhost:3000/api/city/add`, { city })
      .then(res => dispatch(addCitySuccess(city, res)))
      .catch(error => dispatch(addCityFailure(error)));
  };
};

export function addCitySuccess (city, res) {
  console.log(res);
  return {
    type: actionTypes.ADD_CITY,
    city
  };
};

export function addCityFailure (error) {
  return {
    type: actionTypes.ADD_CITY_FAILURE,
    error
  };
};

export function deleteCity (city) {
  return function (dispatch) {
    axios.delete(`http://localhost:3000/api/city/delete/`)
      .then(res => dispatch(deleteCitySuccess(city)))
      .catch(error => dispatch(deleteCityFailure(error)));
  };
}

export function deleteCitySuccess (city) {
  return {
    type: actionTypes.DELETE_CITY,
    city
  };
};

export function deleteCityFailure (error) {
  return {
    type: actionTypes.DELETE_CITY_FAILURE,
    error
  };
}

export function checkSimilarCities (cityObject) {
  const { nameOrZip } = cityObject;

  return function (dispatch) {
    axios.get(`http://localhost:3000/api/city/check/${nameOrZip}`)
      .then(response => dispatch(checkSimilarCitiesSucces(response.data.places)))
      .catch(err => dispatch(checkSimilarCitiesFailure(err)))
  }
};

export function checkSimilarCitiesSucces (cities) {
  return {
    type: actionTypes.SIMILAR_CITIES_ARRIVED,
    similarCities: cities
  };
};


export function checkSimilarCitiesFailure (error) {
  return {
    type: actionTypes.SIMILAR_CITIES_ERROR,
    error
  };
};



export function editCity (city, oldIndex) {
  return {
    type: actionTypes.EDIT_CITY,
    city,
    oldIndex
  };
};

export function fetchCitiesSuccess (res) {
  const cities = res.data;
  return {
    type: actionTypes.FETCH_CITIES_SUCCES,
    cities
  };
}

export function fetchCitiesError (error) {
  console.log(error);
  return {
    type: actionTypes.FETCH_CITIES_ERROR,
    error,
  }
}

export function getAllCitiesFromDB () {
  return function (dispatch) {
    axios.get("http://localhost:3000/api/cities")
      .then(response => dispatch(fetchCitiesSuccess(response)))
      .catch(error => dispatch(fetchCitiesError(error)));

      return {
        type: actionTypes.GET_CITIES_FROM_DB,
      };
  };

}
