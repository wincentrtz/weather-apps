import React, { Component } from "react";
import CardBody from "./cardBody";
import { getWoeId, getWeather } from "../services/weatherServices";
import config from "../config.json";

class Weather extends Component {
  state = {
    now_weather: "",
    weathers: []
  };

  async componentDidMount() {
    let { data } = await getWoeId();
    const weather = await getWeather(data[0].woeid);
    const nextDay = weather.data.consolidated_weather.filter(
      w => weather.data.consolidated_weather.indexOf(w) !== 0
    );
    this.setState({
      now_weather: weather.data.consolidated_weather[0],
      weathers: nextDay
    });
  }

  render() {
    const { weathers, now_weather } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-4 offset-2 text-right"
            style={{ alignSelf: "flex-end" }}
          >
            <h2>{Math.ceil(now_weather.the_temp)}°</h2>
          </div>
          <div className="col-4 text-left">
            <img
              style={{ width: "30%" }}
              src={
                config.apiUrl +
                "/static/img/weather/png/" +
                now_weather.weather_state_abbr +
                ".png"
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4 offset-2 text-right">
            {Math.ceil(now_weather.min_temp)}° /
            {Math.ceil(now_weather.max_temp)}°
          </div>
          <div className="col-2 text-right">
            {"Real Feel@" + Math.ceil(now_weather.humidity)}°
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">{now_weather.weather_state_name}</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-1" />
          {weathers.map(weather => (
            <div className="col-12 col-md-2" key={weather.id}>
              <CardBody weather={weather} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Weather;
