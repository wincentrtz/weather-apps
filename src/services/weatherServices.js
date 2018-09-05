import http from "./httpServices";
import config from "../config.json";

export function getWoeId() {
  return http.get(config.apiUrl + "api/location/search/?query=london");
}

export function getWeather(woeid) {
  return http.get(config.apiUrl + "api/location/" + woeid);
}
