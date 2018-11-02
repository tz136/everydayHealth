import { Component, OnInit } from "@angular/core";
import { WeatherService } from "../../services/weather.service";

@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.css"]
})
export class PageComponent implements OnInit {

  latitude = null;
  longitude = null;
  iconUrl = null;
  description = null;
  temperature = null;
  windSpeed = null;
  humidity = null;

  constructor(private weather: WeatherService) {
    this.getCurrentLocation(); 
  }

  ngOnInit() {
    
  }
  /* sometimes this funtion dosen't work, so I have another solution to get location*/
  //get user current location
  // getCurrentLocation() {
  //   var ip = window.location.origin;
  //   console.log(ip);
  //   if ("geolocation" in navigator) {
  //     window.navigator.geolocation.getCurrentPosition(position => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.weather
  //         .getWeather(this.latitude, this.longitude)
  //         .subscribe((res: any) => {
  //           console.log(res);
  //           this.getIcon(res.weather[0].icon);
  //           this.getWeatherDetails(res);
  //         });
  //     });
  //   } else {
  //     alert("Please allow browser to get your location!");
  //   }
  // }
  getCurrentLocation() {
    this.weather.getIpAddress().subscribe((res: any) => {
      let ip = res.ip;
      this.weather.getLocation(ip).subscribe((res: any) => {
        this.latitude = res.latitude;
        this.longitude = res.longitude;
        this.weather
          .getWeather(this.latitude, this.longitude)
          .subscribe((res: any) => {
            this.getIcon(res.weather[0].icon);
            this.getWeatherDetails(res);
          });
      });
    });
  }
  //get weather icon
  getIcon(icon) {
    this.iconUrl = this.weather.getIcon(icon);
  }

  getWeatherDetails(info: any) {
    console.log(info);
    this.description = info.weather[0].description;
    this.temperature = info.main.temp;
    this.windSpeed = info.wind.speed;
    this.humidity = info.main.humidity;
  }
}
