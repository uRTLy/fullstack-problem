import React, { Component } from "react";
import { Button, Panel, Col, Glyphicon } from "react-bootstrap";


const getCelsiuses = fahrenheit => {
  const parsedF = parseInt(fahrenheit, 10);
  return Math.round(5/9 * (parsedF - 32));
};

const Forecast = ({date, day, high, low, text}, i) => {
  return (
    <div key={i} className="short-forecast flex-column">
      <h5 className="flex-column forecast-header">{text} <small className="small-flex">{date}, {day}</small> </h5>
      <p className="forecast-table-short">Highest temperature: {high} &deg;F / {getCelsiuses(high)} &deg;C</p>
      <p className="forecast-table-short">Lowest temperature: {low} &deg;F /  {getCelsiuses(low)} &deg;C</p>
    </div>
  );
}


export default class DisplayResults extends Component {
  constructor () {
    super();
    this.state = {

    };
  }
  render () {
    const { astronomy, atmosphere, item, location, units, wind } = this.props.weather;
    const { date, temp, text } = item.condition;
    const { title } = item;
    const { forecast: forecasts } = item;

    return (
      <Col xs={12}>
        <Panel header={title}>

          <div className="flex-row center">

            <section className="weather flex-row wrap">

              <div className="flex-column">
                <p className="forecast-desc">
                  Date <small>{date}</small>
                </p>
                <p className="forecast-desc">
                  Temperature <small>{temp}&deg;F / {getCelsiuses(temp)} &deg;C</small>
                </p>
                <p className="forecast-desc">
                  Condition <small>{text}</small>
                  </p>
                <p className="forecast-desc">
                  Sunrise <small>{astronomy.sunrise}</small>
                </p>
                <p className="forecast-desc">
                  Sunset <small>{astronomy.sunset}</small>
                </p>
                <p className="forecast-desc">
                  Humidity <small>{atmosphere.humidity} % </small>
                </p>

                <p className="forecast-desc">
                  Rising <small> {atmosphere.rising}</small>
                </p>
                <p className="forecast-desc">
                  Pressure <small>{atmosphere.pressure} hPa</small>
                </p>
                <p className="forecast-desc">
                  Visibility <small> {atmosphere.visibility} kilometers</small>
                </p>
                <p className="forecast-desc">
                  Wind Chill <small>{wind.chill}</small>
                </p>
                <p className="forecast-desc">
                  Direction <small> {wind.direction} &deg;</small>
                </p>
                <p className="forecast-desc">
                  Wind Speed <small>{wind.speed} km/h </small>
                </p>
                </div>
          </section>

          <section className="forecasts-section">
            <h4>Forecasts for next {forecasts.length} days: </h4>
            <div className="flex-row wrap">
              {forecasts.map(Forecast)}
            </div>
          </section>
        </div>

        </Panel>
      </Col>
    );
  }
}
