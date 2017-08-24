import { Component } from '@angular/core';
import { Platform , NavParams} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage:any;
	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.

			this.storage.get('introShown').then(val => {
				if (!val) {
					this.storage.set('introShown', true);
          this.rootPage = 'IntroPage';
				} else {
					this.rootPage = 'HomePage';
				}
			});
			statusBar.styleDefault();
			splashScreen.hide();
		});
	}
}
