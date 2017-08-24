import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../config/app.config';
import { WeatherModel } from "../../classes/weather-model";
/*
  Generated class for the WeatherServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class WeatherServiceProvider {

  data: any;
  current_weather: WeatherModel;

  
	constructor(private http: Http,public appConfig: AppConfig) {
    console.log('Hello WeatherServiceProvider Provider');

  }

 
  

	getCurrentWeatherStats(lat, long) {

    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
  
    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=metric&APPID=747fab67e372280346a277e69b0f95fe")
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          
        this.current_weather = new WeatherModel(
          this.data.name,
          this.data.weather[0].description,
          this.data.main.temp_min,
          this.data.main.temp_max,
          this.data.main.temp,
				'http://openweathermap.org/img/w/' + this.data.weather[0].icon + '.png'
      );
          resolve(this.current_weather);
        });
    });
		
	}
}
