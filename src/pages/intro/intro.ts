import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
/**
 * Generated class for the IntroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {


  @ViewChild(Slides) slides: Slides;
	skipMsg: string = 'Skip';
  state: string = 'x';
    
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  skip(): void {
		this.navCtrl.setRoot('HomePage');
	}

	slideChanged(): void {
		if (this.slides.isEnd()) {
			this.skipMsg = 'Alight, I got it.';
		} else {
			this.skipMsg = 'Skip';
		}
	}
}
