import React, { Component } from "react";
import config from "../config.json";

class CardBody extends Component {
  getDateName = d => {
    const date = new Date(d);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    return days[date.getDay()];
  };

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {this.getDateName(this.props.weather.applicable_date)}
          </h5>
          <hr />
          <div className="row">
            <div className="col-6">
              <img
                src={
                  config.apiUrl +
                  "/static/img/weather/png/64/" +
                  this.props.weather.weather_state_abbr +
                  ".png"
                }
              />
            </div>
            <div className="col-6 text-right">
              <h6>{Math.ceil(this.props.weather.max_temp)}°</h6>
              <h6>{Math.ceil(this.props.weather.min_temp)}°</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardBody;
