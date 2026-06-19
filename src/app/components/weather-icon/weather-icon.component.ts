import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-weather-icon',
    templateUrl: './weather-icon.component.html',
    styleUrls: ['./weather-icon.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class WeatherIconComponent {

  icon = "weather";

  @Input() set code(value: number | undefined) {
    this.icon = '';

    if (value === undefined) return;

    if (value >= 200 && value <= 250) { this.icon = "day"; }
    if (value >= 300 && value <= 350) { this.icon = "rainy-4"; }
    if (value >= 500 && value <= 550) { this.icon = "rainy-7"; }
    if (value == 600) this.icon = "snowy-4";
    if (value == 601) this.icon = "snowy-5";
    if (value > 600 && value <= 650) this.icon = "snowy-6";
    if (value == 800) this.icon = "day";
    if (value == 801) this.icon = "cloudy-day-1";
    if (value == 802) this.icon = "cloudy-day-2";
    if (value == 803) this.icon = "cloudy-day-3";
    if (value == 804) this.icon = "cloudy";
  }
}
