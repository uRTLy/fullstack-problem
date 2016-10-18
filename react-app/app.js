import ReactDOM from "react-dom";
import React, { Component } from "react";

import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reduxLogger from "redux-logger";
import { Provider } from "react-redux";
import  mainReducer from "./reducers";

import ListBox from "./components/ListBox/ListBox";

const logger = reduxLogger();
const store = createStore(mainReducer, {}, applyMiddleware(thunkMiddleware, logger));


export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <ListBox />
      </Provider>
    );
  }
}

ReactDOM.render(< App />, document.getElementById("app"));
