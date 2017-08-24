import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { Keyboard } from '@ionic-native/keyboard';
import { AppConfig }    from '../config/app.config';
import { WeatherServiceProvider } from '../providers/weather-service/weather-service';
import { HttpModule} from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
  ],
  providers: [
    AppConfig,
    StatusBar,
    SplashScreen,
    Keyboard,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WeatherServiceProvider
  ]
})
export class AppModule {}
