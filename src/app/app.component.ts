import { GeolocationService } from './services/geolocation.service';
import { ForecastService } from './services/forecast.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Weather App';

  constructor(private forecastService: ForecastService, public geolocationService: GeolocationService) {}

  ngOnInit() {
    // this.forecastService.weather$.subscribe(console.log);
    // this.geolocationService.requestGeolocation();
  }
}
