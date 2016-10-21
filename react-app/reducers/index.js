import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import weatherReducer  from "./weatherReducer";


const mainReducer = combineReducers({
  cities: cityReducer,
  weather: weatherReducer
});


export default mainReducer;
