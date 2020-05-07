import { Component, OnInit, Input } from '@angular/core';
import { Weather } from 'src/app/core/interfaces/weather';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.sass']
})
export class WeatherCardComponent implements OnInit {

  @Input() weather: Weather;

  constructor() { }

  ngOnInit(): void {
  }

}
