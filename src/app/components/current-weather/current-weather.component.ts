import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CurrentWeatherService } from 'src/app/shared/services/current-weather.service';

@Component({
    selector: 'app-current-weather',
    templateUrl: './current-weather.component.html',
    styleUrls: ['./current-weather.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CurrentWeatherComponent {
  error$ = this.weatherService.error$;

  constructor(public weatherService: CurrentWeatherService) { }

  tempColor(temp: number): string {
    if (temp < -10) return '#3B7EBF';
    if (temp < 0)   return '#5B8FBF';
    if (temp < 10)  return '#7FAFD9';
    if (temp < 20)  return '#E8B84B';
    if (temp < 30)  return '#D98A4F';
    if (temp < 40)  return '#C94F4F';
    return '#A13030';
  }
}
