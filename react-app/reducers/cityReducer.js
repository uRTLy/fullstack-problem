import * as actionTypes from "../actions/actionTypes";
import shortid from "shortid";

const initialState = {
  saveToDbError: false,
  fetchFromDbError: false,
  cities: [],
  similarCities: []
};

export default function (state = initialState, action) {

  switch (action.type) {

    case actionTypes.ADD_CITY: {
      return Object.assign({}, {
        ...state,
        cities: [...state.cities, action.city]
      });
    }
    break;

    case actionTypes.DELETE_CITY: {
      return {
        ...state,
        cities: state.cities.filter(city => city !== action.city)
      };
    }
    break;

  case actionTypes.EDIT_CITY: {
    const { city, oldIndex } = action;

    const cities = [
        ...state.cities.slice(0, oldIndex ),
         { name: city.name, zip: city.zip },
        ...state.cities.slice(oldIndex  + 1)
      ];

    return {
      ...state,
      cities
      };
    }
    break;

  case actionTypes.SIMILAR_CITIES_ARRIVED: {
    return {
      ...state,
      similarCities: action.similarCities
    };
  }

  case actionTypes.SAVE_CITIES_SUCCES: {
    return {
      ...state,
      saveToDbError: false,
    };
  }
  break;

  case actionTypes.SAVE_CITIES_ERROR: {
    return {
      ...state,
      saveToDbError: true
    };
  }
  break;

  case actionTypes.FETCH_CITIES_SUCCES: {

    return {
      ...state,
      cities: action.cities,
      fetchFromDbError: false
    };
  }
  break;

  case actionTypes.FETCH_CITIES_ERROR: {
    return {
      ...state,
      fetchFromDbError: true
    };
  }
  break;

  case actionTypes.SAVE_CITIES_TO_DB: {
    return { ...state };
  }
  break;

  case actionTypes.GET_CITIES_FROM_DB: {
    return { ...state };
  }
  break;

  default:
    return state;
  }
};
