import { Injectable } from '@angular/core';
declare var process: any;
@Injectable()
export class AppConfig {  
  public apiBaseUrl: string;
  public openWeatherMapApiKey: string;
constructor() {
    this.apiBaseUrl = this._readString('API_URL', 'http://api.openweathermap.org/data/2.5');
    this.openWeatherMapApiKey = this._readString('OPEN_WEATHER_MAP', '747fab67e372280346a277e69b0f95fe');
console.debug('AppConfig', this);
  }
private _readString(key: string, defaultValue?: string): string {
    const v = process.env[key];
    return v === undefined ? defaultValue : String(v);
  }
}