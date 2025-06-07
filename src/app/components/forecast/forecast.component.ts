import { Component, OnInit } from '@angular/core';
import { showUpStaggered } from '../../shared/animations/showUp.animation';
import { ForecastService } from 'src/app/shared/services/forecast.service';

@Component({
    selector: 'app-forecast',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.sass'],
    animations: [showUpStaggered],
    standalone: false
})
export class ForecastComponent implements OnInit {

  constructor(public forecastService: ForecastService) { }

  ngOnInit(): void {
  }

}
