import { Injectable } from '@angular/core';
declare var process: any;
@Injectable()
export class AppConfig {  
  public apiBaseUrl: string;
  public googleMapApiKey: string;
constructor() {
    this.apiBaseUrl = this._readString('API_URL', 'http://localhost:3000/api/v1');
    this.googleMapApiKey = this._readString('GOOGLE_MAP_API_KEY', 'xxxyyy111');
console.debug('AppConfig', this);
  }
private _readString(key: string, defaultValue?: string): string {
    const v = process.env[key];
    return v === undefined ? defaultValue : String(v);
  }
}