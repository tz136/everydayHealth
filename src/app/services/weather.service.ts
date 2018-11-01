import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  //initial weather & icon api endpoint;
  weather_api_endPoint = "http://api.openweathermap.org/data/2.5/weather";
  api_key = "&appid=1c959f6ac6d9c3c9415b335dfdc09bfa";

  icon_api_endPoint = "http://openweathermap.org/img/w/";

  constructor(private http: HttpClient) { }

  //get curent weather
  getWeather(lat, lon) {
    let url = this.weather_api_endPoint + '?lat=' + lat + '&lon=' + lon + this.api_key;
    return this.http.get(url);

  }
  //get weather icon
  getIcon(icon) {
    let url = this.icon_api_endPoint + icon + '.png';
    return url;
  }
}
