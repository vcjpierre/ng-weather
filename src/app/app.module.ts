import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { GeolocationButtonComponent } from './components/geolocation-button/geolocation-button.component';
import { LoadingComponent } from './components/loading/loading.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { WeatherIconComponent } from './components/weather-icon/weather-icon.component';
import { CitySelectorComponent } from './components/city-selector/city-selector.component';

@NgModule({ declarations: [
        AppComponent,
        CurrentWeatherComponent,
        ForecastComponent,
        GeolocationButtonComponent,
        LoadingComponent,
        WeatherCardComponent,
        WeatherIconComponent,
        CitySelectorComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        FormsModule], providers: [provideHttpClient(withXhr(), withInterceptorsFromDi())] })
export class AppModule { }
