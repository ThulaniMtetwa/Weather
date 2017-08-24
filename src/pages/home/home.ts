import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WeatherServiceProvider } from '../../providers/weather-service/weather-service';
import { WeatherModel } from '../../classes/weather-model';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	public weatherModels: WeatherModel[];
	current_weather: any;
	latitude: number;
	longitude: number;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public platform: Platform,
		private storage: Storage,
		private weather: WeatherServiceProvider,
		private geolocation: Geolocation,
		public alertCtrl: AlertController
	) {
		this.current_weather = WeatherModel;
	}

	getUserLocation() {
		this.geolocation
			.getCurrentPosition()
			.then(resp => {
				// resp.coords.latitude
				// resp.coords.longitude
				this.latitude = resp.coords.latitude;
				this.longitude = resp.coords.longitude;

				this.weather.getCurrentWeatherStats(this.latitude, this.longitude).then(data => {
					this.current_weather = data;
				});
			})
			.catch(error => {
				console.log('Error getting location', error);
				this.showAlert(error);
			});
	}
	showAlert(message) {
		let alert = this.alertCtrl.create({
			title: 'Information',
			message: message,
			buttons: [
				{
					text: 'OK',
					handler: data => {
						this.getUserLocation();
					}
				}
			]
		});
		alert.present();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad HomePage');

		this.platform.ready().then(() => {
			// Check for intro slide was shown

			this.storage.get('introShown').then(val => {
				console.log(val);
				if (!val) {
					this.storage.set('introShown', true);
					this.navCtrl.setRoot('IntroPage');
				}
			});

			this.getUserLocation();
		});
	}
}
