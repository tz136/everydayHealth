import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  latitude = null;
  longitude = null;
  iconUrl = null;
  description = null;
  temperature = null;
  windSpeed = null;
  humidity = null;

  constructor(private weather: WeatherService) { }

  ngOnInit() {
    this.getCurrentLocation();
  }
  //get user current location
  getCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.weather.getWeather(this.latitude, this.longitude).subscribe((res: any) => {
          console.log(res);
          this.getIcon(res.weather[0].icon);
          this.getWeatherDetails(res);
        });
      })
    } else {
      alert('Please allow browser to get your location!');
    }
  }
  //get weather icon
  getIcon(icon) {
    this.iconUrl = this.weather.getIcon(icon);
  }

  getWeatherDetails(info: any) {
    this.description = info.weather[0].description;
    this.temperature = info.main.temp;
    this.windSpeed = info.wind.speed;
    this.humidity = info.main.humidity;
  }

}
