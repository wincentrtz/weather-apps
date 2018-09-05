import React, { Component } from "react";
import CardBody from "./cardBody";
import { getWoeId, getWeather } from "../services/weatherServices";

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
    const { weathers } = this.state;
    return (
      <div className="container-fluid">
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
