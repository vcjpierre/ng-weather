import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Coords } from '../../core/interfaces/coords';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  public coordsSubject: Subject<Coords> = new Subject<Coords>();
  public coords$: Observable<Coords> = this.coordsSubject.asObservable();
  public citySubject: Subject<string> = new Subject<string>();
  public city$: Observable<string> = this.citySubject.asObservable();
  public permission$: Promise<string>;
  public coordsPromise!: Promise<Coords>;

  constructor() {
    this.permission$ = (navigator as any).permissions.query({ name: 'geolocation' })
      .then((permission: any) => permission.state);
  }

  requestGeolocation() {
    if (!this.coordsPromise) {
      this.coordsPromise = this.getGeoLocation()
    }

    this.coordsPromise.then(coords => {
      this.coordsSubject.next(coords);
    });
  }

  setCoords(coords: Coords, cityName?: string) {
    if (cityName) {
      this.citySubject.next(cityName);
    }
    this.coordsSubject.next(coords);
  }

  getGeoLocation(): Promise<Coords> {
    return new Promise((res, rej) => {
      if (!navigator || !('geolocation' in navigator)) rej('Geolocation is not available.');

      (navigator as any).geolocation.getCurrentPosition((position: any) => {
        res({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      });
    });
  }
}
