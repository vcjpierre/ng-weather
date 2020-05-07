import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeolocationService } from './geolocation.service';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Weather } from '../../core/interfaces/weather';
import { Coords } from '../../core/interfaces/coords';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  public weatherSubject: Subject<any> = new Subject<any>();
  public weather$: Observable<any>;

  endpoint: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient, private geolocationService: GeolocationService) { 
    this.weather$ = this.weatherSubject.asObservable().pipe(
      map((data: any) => {
        let mainWather = data.weather[0];

        let weather: Weather = {
          name: data.name,
          cod: data.cod,
          temp: data.main.temp,
          ...mainWather
        };
        return weather;
      })
    );

    this.geolocationService.coords$.subscribe((coords) => {
      this.get(coords);
    });
  }

  get(coords: Coords) {
    let args: string = `?lat=${coords.lat}&lon=${coords.lon}&APPID=${environment.key}&units=metric`;
    let url = this.endpoint + args;

    // if(isDevMode()) {
    //   url = 'assets/weather.json';
    // }

    this.http.get(url).subscribe(this.weatherSubject);
  }
}
