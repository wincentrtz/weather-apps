import React, { Component } from "react";
import config from "../config.json";
class Thumbnail extends Component {
  state = {};

  render() {
    const { currentWeather } = this.props;
    console.log(this.props);
    return (
      <React.Fragment>
        <div className="row">
          <div
            className="col-4 offset-2 text-right"
            style={{ alignSelf: "flex-end" }}
          >
            <h2>{Math.ceil(currentWeather.the_temp)}°</h2>
          </div>
          <div className="col-4 text-left">
            <img
              style={{ width: "30%" }}
              src={
                config.apiUrl +
                "/static/img/weather/png/" +
                currentWeather.weather_state_abbr +
                ".png"
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4 offset-2 text-right">
            {Math.ceil(currentWeather.min_temp)}° /
            {Math.ceil(currentWeather.max_temp)}°
          </div>
          <div className="col-2 text-right">
            {"Real Feel@" + Math.ceil(currentWeather.humidity)}°
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">{currentWeather.weather_state_name}</h2>
          </div>
        </div>
        <div className="row">
          <div className="offset-2">
            <i className="fa fa-cloud" />
            {"Wind " +
              Math.ceil(currentWeather.wind_speed) +
              "kmh " +
              currentWeather.wind_direction_compass}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Thumbnail;
