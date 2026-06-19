import { Component } from '@angular/core';
import { ForecastService } from './shared/services/forecast.service';
import { GeolocationService } from './shared/services/geolocation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    standalone: false
})
export class AppComponent {

  constructor(private forecastService: ForecastService, public geolocationService: GeolocationService) { }
}
