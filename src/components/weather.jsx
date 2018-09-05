import React, { Component } from "react";
import CardBody from "./cardBody";
import { getWoeId, getWeather } from "../services/weatherServices";
import config from "../config.json";
import { toast, ToastContainer } from "react-toastify";

class Weather extends Component {
  state = {
    nowWeather: "",
    weathers: [],
    query: "",
    loading: ""
  };

  async queryWeather(query) {
    try {
      let { data } = await getWoeId(query);
      const weather = await getWeather(data[0].woeid);
      const nextDay = weather.data.consolidated_weather.filter(
        w => weather.data.consolidated_weather.indexOf(w) !== 0
      );
      toast.success("Here's the weather");
      this.setState({
        nowWeather: weather.data.consolidated_weather[0],
        weathers: nextDay
      });
    } catch (ex) {
      console.log(ex);
      toast.error("Cities not found.");
      const weathers = [];
      this.setState({ weathers });
    }
  }

  handleChange = ({ currentTarget: input }) => {
    const query = input.value;
    this.setState({ query });
  };

  render() {
    const { weathers, nowWeather } = this.state;
    console.log(this.state);
    return (
      <div className="container-fluid">
        <ToastContainer />
        <input onChange={this.handleChange} type="text" />
        <button
          className="btn btn-success"
          onClick={() => this.queryWeather(this.state.query)}
        >
          Search
        </button>
        {weathers.length > 0 && (
          <div>
            <div className="row">
              <div
                className="col-4 offset-2 text-right"
                style={{ alignSelf: "flex-end" }}
              >
                <h2>{Math.ceil(nowWeather.the_temp)}°</h2>
              </div>
              <div className="col-4 text-left">
                <img
                  style={{ width: "30%" }}
                  src={
                    config.apiUrl +
                    "/static/img/weather/png/" +
                    nowWeather.weather_state_abbr +
                    ".png"
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4 offset-2 text-right">
                {Math.ceil(nowWeather.min_temp)}° /
                {Math.ceil(nowWeather.max_temp)}°
              </div>
              <div className="col-2 text-right">
                {"Real Feel@" + Math.ceil(nowWeather.humidity)}°
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <h2 className="text-center">{nowWeather.weather_state_name}</h2>
              </div>
            </div>
            <div className="row">
              <div className="offset-2">
                <i className="fa fa-cloud" />
                {"Wind " +
                  Math.ceil(nowWeather.wind_speed) +
                  "kmh " +
                  nowWeather.wind_direction_compass}
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-1" />
              {weathers.map(weather => (
                <div className="col-12 col-md-2" key={weather.id}>
                  <CardBody weather={weather} />
                </div>
              ))}
            </div>{" "}
          </div>
        )}
      </div>
    );
  }
}

export default Weather;
