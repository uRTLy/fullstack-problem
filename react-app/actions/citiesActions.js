import * as actionTypes from "./actionTypes";
import axios from "axios";

export function addCity (cityObj) {
  const { nameOrZip , city } = cityObj;
  const cityToAdd = Object.assign({}, city, { nameOrZip });
  return function (dispatch) {
    axios.post(`http://localhost:3000/api/city/add`, { city: cityToAdd })
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
    axios.delete(`http://localhost:3000/api/city/delete/${woeid}`)
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
    axios.get(`http://localhost:3000/api/city/check/${nameOrZip}`)
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
    axios.put("http://localhost:3000/api/city/edit/", { city })
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
  console.log(cities);
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
    axios.get("http://localhost:3000/api/cities")
      .then(response => dispatch(fetchCitiesSuccess(response)))
      .catch(error => dispatch(fetchCitiesError(error)));

      return {
        type: actionTypes.DURING_ACTION,
        duringAction: true
      };
  };
}
