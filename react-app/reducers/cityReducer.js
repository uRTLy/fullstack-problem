import * as actionTypes from "../actions/actionTypes";
import shortid from "shortid";

const initialState = {
  cities: [],
  similarCities: [],
  duringAction: false,
  failureNotification: false,
  notification: ""
};

export default function (state = initialState, action) {

  switch (action.type) {

    case actionTypes.ADD_CITY: {
      return Object.assign({}, {
        ...state,
        similarCities: [],
        failureNotification: false,
        duringAction: false,
        cities: [...state.cities, action.city]
      });
    }
    break;

    case actionTypes.ADD_CITY_FAILURE: {
      return {
        ...state,
        duringAction: false,
        failureNotification: true,
        notification: action.notification
      };
    }
    break;

    case actionTypes.DELETE_CITY: {
      return {
        ...state,
        duringAction: false,
        failureNotification: false,
        cities: state.cities.filter(city => city.woeid !== action.woeid)
      };
    }
    break;

    case actionTypes.DELETE_CITY_FAILURE: {
      return {
        ...state,
        duringAction: false,
        failureNotification: true,
        notification: action.notification
      };
    }
    break;

  case actionTypes.EDIT_CITY: {
    const { city: cityToEdit } = action;

    const cities = state.cities.map(city => {
      if (city.id === cityToEdit.id) {
        return cityToEdit;
      }
      return city;
    });

    return {
      ...state,
      duringAction: false,
      cities
      };
    }
    break;

    case actionTypes.EDIT_CITY_FAILURE: {

      return {
        ...state,
        failureNotification: true,
        notification: action.notification
        };
      }
      break;

  case actionTypes.SIMILAR_CITIES_ARRIVED: {
    return {
      ...state,
      duringAction: false,
      similarCities: action.similarCities
    };
  }

  case actionTypes.FETCH_CITIES_SUCCESS: {
    return {
      ...state,
      duringAction: false,
      cities: action.cities,
      failureNotification: false,
    };
  }
  break;

  case actionTypes.FETCH_CITIES_FAILURE: {
    console.log(action);
    return {
      ...state,
      duringAction: false,
      failureNotification: true,
      notification: action.notification
    };
  }
  break;


  case actionTypes.GET_CITIES_FROM_DB: {
    return { ...state };
  }
  break;

  case actionTypes.DURING_ACTION: {
    return {...state, duringAction: actionType.duringAction };
  }

  default:
    return state;
  }
};
