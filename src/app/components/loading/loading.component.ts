import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CurrentWeatherService } from 'src/app/shared/services/current-weather.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LoadingComponent {

  constructor(public currentWeatherService: CurrentWeatherService) { }
}
