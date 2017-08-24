import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../config/app.config';
import { WeatherModel } from '../../classes/weather-model';
import { NetworkServiceProvider } from '../network-service/network-service';
/*
  Generated class for the WeatherServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class WeatherServiceProvider {
	data: any;
	current_weather: WeatherModel;

	constructor(private http: Http, public appConfig: AppConfig, private network: NetworkServiceProvider) {
		console.log('Hello WeatherServiceProvider Provider');
	}

	getCurrentWeatherStats(lat, long) {
		if (this.data) {
			return Promise.resolve(this.data);
		}

		return new Promise(resolve => {
			if (this.network.noConnection()) {
				resolve(null);
			} else {
				this.http
					.get(
						this.appConfig.apiBaseUrl +
							'/weather?lat=' +
							lat +
							'&lon=' +
							long +
							'&units=metric&APPID=' +
							this.appConfig.openWeatherMapApiKey
					)
					.map(res => res.json())
					.subscribe(
						data => {
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
						},
						err => {
							resolve(null);
						}
					);
			}
		});
	}
}
