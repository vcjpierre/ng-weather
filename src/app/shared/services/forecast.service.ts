import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Weather } from '../../core/interfaces/weather';
import { Coords } from '../../core/interfaces/coords';
import { GeolocationService } from './geolocation.service';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  public weatherSubject: Subject<any> = new Subject<any>();
  public weather$: Observable<any>;
  public error$: Subject<boolean> = new Subject<boolean>();

  endpoint = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient, private geolocationService: GeolocationService) {

    this.weather$ = this.weatherSubject.asObservable().pipe(map(this.structureData));

    this.geolocationService.coords$.subscribe((coords) => {
      this.get(coords);
    });
  }

  structureData(data: any) {
    if (!data || !data.list) return [];

    const minMaxPerDay: { [key: string]: Weather } = {};

    data.list.forEach((weatherObject: any) => {
      const date = new Date(weatherObject.dt * 1000);
      const hours = date.getHours();
      const month = date.getMonth();
      const day = date.getDate();
      const key = `${month}-${day}`;

      let tempPerDay: Weather = minMaxPerDay[key] || {
        minMaxTemp: {} as Weather['minMaxTemp']
      };

      if (!tempPerDay.cod || hours == 16) {
        const source = weatherObject.weather[0];
        tempPerDay = { ...tempPerDay, ...source };
        tempPerDay.cod = source.id;
        tempPerDay.name = data.city.name;
      }

      const minMax = tempPerDay.minMaxTemp!;
      if (!minMax.min || (weatherObject.main.temp_min < minMax.min)) {
        minMax.min = weatherObject.main.temp_min;
      }

      if (!minMax.max || (weatherObject.main.temp_max > minMax.max)) {
        minMax.max = weatherObject.main.temp_max;
      }

      minMaxPerDay[key] = tempPerDay;
    });

    return Object.values(minMaxPerDay);
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
