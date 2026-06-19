import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ForecastService } from './shared/services/forecast.service';
import { GeolocationService } from './shared/services/geolocation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent {
  title = 'Weather App';

  constructor(private forecastService: ForecastService, public geolocationService: GeolocationService) { }

  // ngOnInit() {
  //   this.forecastService.weather$.subscribe(console.log);
  //   this.geolocationService.requestGeolocation();
  // }
}
