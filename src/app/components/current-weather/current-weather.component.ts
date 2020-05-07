import { Component, OnInit } from '@angular/core';
import { CurrentWeatherService } from 'src/app/shared/services/current-weather.service';
import { showUp } from '../../shared/animations/showUp.animation';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.sass'],
  animations: [showUp]
})
export class CurrentWeatherComponent implements OnInit {

  constructor(public weatherService: CurrentWeatherService) { }

  ngOnInit(): void {
  }

}
