import React, { Component } from "react";
import CardBody from "./cardBody";
import { getWoeId, getWeather } from "../services/weatherServices";
import { toast, ToastContainer } from "react-toastify";
import Thumbnail from "./thumbnail";

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
    const { weathers, nowWeather, query } = this.state;
    return (
      <div className="container-fluid" style={{ padding: "30px" }}>
        <ToastContainer />
        <input
          className="col-md-12"
          onChange={this.handleChange}
          id="weather-input"
          type="text"
          placeholder="Search Cities..."
        />
        <br />
        <button
          className="btn btn-success"
          onClick={() => this.queryWeather(query)}
        >
          Go
        </button>
        <div id="weather-content">
          {weathers.length > 0 && (
            <div>
              <Thumbnail currentWeather={nowWeather} />
              <div className="row">
                <div className="col-12 col-md-1" />
                {weathers.map(weather => (
                  <div className="col-12 col-md-2 mb-2" key={weather.id}>
                    <CardBody weather={weather} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Weather;
