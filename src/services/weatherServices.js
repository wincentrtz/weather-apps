import http from "./httpServices";
import config from "../config.json";

export function getWoeId(query) {
  return http.get(config.apiUrl + "api/location/search/?query=" + query);
}

export function getWeather(woeid) {
  return http.get(config.apiUrl + "api/location/" + woeid);
}
