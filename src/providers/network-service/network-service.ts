import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
/*
  Generated class for the NetworkServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class NetworkServiceProvider {


  disconnectSubscription: any;
  connectSubscription: any;
  constructor(public http: Http, private network: Network) {
    console.log('Hello NetworkServiceProvider Provider');
  }
  noConnection() {
    return (this.network.type === 'none');
  }

}
