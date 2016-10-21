import * as actionTypes from "../actions/actionTypes";

const initialState = {
  weatherForecasts: [],
  notification: "",
  duringAction: false
};


export default function (state = initialState, action) {

  switch (action.type) {

    case actionTypes.FETCH_WEATHER_SUCCESS: {
      return {
        ...state,
        duringAction: false,
        weatherForecasts: (Array.isArray(action.weather)) ? action.weather : [action.weather]
      };
    }
    break;

    case actionTypes.FETCH_WEATHER_FAILURE: {
      return {
        duringAction: false,
        ...state,
        notification: action.notification
      };
    }
    break;

    case actionTypes.DURING_ACTION: {
      return {
        duringAction: true,
        ...state
      };
    }
    break;

  default:
    return state;
  }
};
