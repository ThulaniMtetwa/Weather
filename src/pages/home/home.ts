import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController } from 'ionic-angular';
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
	header : boolean = false;
	
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public platform: Platform,
		private storage: Storage,
		private weather: WeatherServiceProvider,
		private geolocation: Geolocation,
		public alertCtrl: AlertController,
		public loading: LoadingController
	) {
		this.current_weather = WeatherModel;
	}

	getUserLocation() {

		let loader = this.loading.create({
			content: 'Getting weather update...',
		  });

		  loader.present();

		this.geolocation
			.getCurrentPosition()
			.then(resp => {

				

				this.latitude = resp.coords.latitude;
				this.longitude = resp.coords.longitude;

				this.weather.getCurrentWeatherStats(this.latitude, this.longitude).then(data => {
					

					if(data == null){
						this.showAlert("Ops. Please check if you connection settings, and TRY AGAIN.")
					}else{
						this.current_weather = data;
					}
					loader.dismiss();
					this.header = true;
				});
			})
			.catch(error => {
				console.log('Error getting location', error);
				this.header = false;
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
		
		this.platform.ready().then(() => {
			this.getUserLocation();
		});
	}
}
	