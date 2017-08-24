import {Observable} from 'rxjs/Observable';

export class WeatherModel {
  
    

    constructor(
        public city: string,
        public conditionDescription: string,
        public min: string,
        public max: string,
        public temp: string,
        public weatherImage?: string
            ){
            
        }
}