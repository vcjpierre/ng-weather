import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Weather } from 'src/app/core/interfaces/weather';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const SCALE_MIN = -5;
const SCALE_MAX = 40;
const SCALE_SPAN = SCALE_MAX - SCALE_MIN;

@Component({
    selector: 'app-weather-card',
    templateUrl: './weather-card.component.html',
    styleUrls: ['./weather-card.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class WeatherCardComponent {
  @Input() weather!: Weather;
  @Input() index = 0;

  dayName = '';

  ngOnInit(): void {
    const date = this.weather?.minMaxTemp?.date
      ? new Date(this.weather.minMaxTemp.date * 1000)
      : new Date(Date.now() + this.index * 86400000);
    this.dayName = DAY_NAMES[date.getDay()];
  }

  get rangeLeft(): number {
    const min = this.weather?.minMaxTemp?.min ?? 0;
    return ((min - SCALE_MIN) / SCALE_SPAN) * 100;
  }

  get rangeWidth(): number {
    const min = this.weather?.minMaxTemp?.min ?? 0;
    const max = this.weather?.minMaxTemp?.max ?? 0;
    return ((max - min) / SCALE_SPAN) * 100;
  }
}
