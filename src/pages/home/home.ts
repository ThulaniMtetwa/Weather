import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,
		private storage: Storage,) {
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
    });
  }

}
