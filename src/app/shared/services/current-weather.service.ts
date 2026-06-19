import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeolocationService } from './geolocation.service';
import { Subject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Weather } from '../../core/interfaces/weather';
import { Coords } from '../../core/interfaces/coords';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  public weatherSubject: Subject<any> = new Subject<any>();
  public weather$: Observable<any>;
  public error$: Subject<boolean> = new Subject<boolean>();

  endpoint = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient, private geolocationService: GeolocationService) {
    this.weather$ = this.weatherSubject.asObservable().pipe(
      map((data: any) => {
        if (!data) return null;
        const mainWeather = data.weather[0];
        const weather: Weather = {
          name: data.name,
          cod: data.cod,
          temp: data.main.temp,
          ...mainWeather
        };
        return weather;
      })
    );

    this.geolocationService.coords$.subscribe((coords) => {
      this.get(coords);
    });
  }

  get(coords: Coords) {
    this.error$.next(false);
    const args = `?lat=${coords.lat}&lon=${coords.lon}&APPID=${environment.key}&units=metric`;
    const url = this.endpoint + args;

    this.http.get(url).pipe(
      catchError(() => {
        this.error$.next(true);
        return of(null);
      })
    ).subscribe((data) => this.weatherSubject.next(data));
  }
}
