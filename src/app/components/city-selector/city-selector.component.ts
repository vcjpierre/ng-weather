import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeolocationService } from '../../shared/services/geolocation.service';
import { environment } from '../../../environments/environment';

interface CityResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

@Component({
    selector: 'app-city-selector',
    templateUrl: './city-selector.component.html',
    styleUrls: ['./city-selector.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CitySelectorComponent {
  query = '';
  results: CityResult[] = [];
  open = false;
  private debounceTimer: any;

  constructor(private http: HttpClient, private geolocationService: GeolocationService) {}

  onInput(): void {
    clearTimeout(this.debounceTimer);
    if (this.query.length < 2) {
      this.results = [];
      this.open = false;
      return;
    }
    this.debounceTimer = setTimeout(() => this.search(), 300);
  }

  search(): void {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(this.query)}&limit=5&appid=${environment.key}`;
    this.http.get<CityResult[]>(url).subscribe({
      next: (data) => {
        this.results = data;
        this.open = data.length > 0;
      },
      error: () => {
        this.results = [];
        this.open = false;
      }
    });
  }

  onEnter(): void {
    if (this.results.length > 0) {
      this.select(this.results[0]);
    } else if (this.query.length >= 2) {
      this.search();
    }
  }

  select(city: CityResult): void {
    this.query = `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`;
    this.open = false;
    this.geolocationService.setCoords({ lat: city.lat, lon: city.lon }, city.name);
  }

  onBlur(): void {
    setTimeout(() => { this.open = false; }, 200);
  }

  onFocus(): void {
    if (this.results.length > 0) {
      this.open = true;
    }
  }
}
