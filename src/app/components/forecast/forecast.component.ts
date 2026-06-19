import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ForecastService } from 'src/app/shared/services/forecast.service';

@Component({
    selector: 'app-forecast',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ForecastComponent {
  error$ = this.forecastService.error$;

  constructor(public forecastService: ForecastService) { }
}
