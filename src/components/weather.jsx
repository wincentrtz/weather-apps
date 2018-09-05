import React, { Component } from "react";
import CardBody from "./cardBody";

class Weather extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-1" />
          <div className="col-2">
            <CardBody />
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
