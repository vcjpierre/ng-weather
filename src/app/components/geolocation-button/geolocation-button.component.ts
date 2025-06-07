import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';

@Component({
    selector: 'app-geolocation-button',
    templateUrl: './geolocation-button.component.html',
    styleUrls: ['./geolocation-button.component.sass'],
    standalone: false
})
export class GeolocationButtonComponent implements OnInit {

  active: boolean = false;

  constructor(public geolocationService: GeolocationService) { }

  ngOnInit() {
    this.geolocationService.permission$.then((status) => {
      // alert(status)
      this.active = (status == 'granted')

      if (this.active)
        this.geolocationService.requestGeolocation();
    });
  }
}
