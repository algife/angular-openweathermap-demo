import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICityWeather, ICityWeatherForecast } from '@models/store-state/slices/city-weather';
import { temperatureUnits } from '@models/temperature-units';
import { WeatherService } from '@services/weather/weather.service';
import { convertFarenheitTo } from '@shared/convert-farenheit-to-celsius';
import { getCityFullName } from '@shared/get-city-full-name';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-city-weather-forecast-display',
  templateUrl: './city-weather-forecast-display.component.html',
  styleUrls: ['./city-weather-forecast-display.component.scss']
})
export class CityWeatherForecastDisplayComponent implements OnInit, OnDestroy {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly route: Router,
    private readonly weatherService: WeatherService
  ) {}
  private readonly destroyed$ = new Subject();
  public weeklyForecasts: ICityWeatherForecast[];
  public cityWeather: ICityWeather;
  private city: string;
  private country: string;
  public cityFullName: string = '';
  public temperatureUnit: temperatureUnits = temperatureUnits.farenheit;

  public temperatureUnits = temperatureUnits;
  public getForecastIconUrl = (icon: string) => `https://openweathermap.org/img/wn/${icon}.png`;
  public dateFromNumber = (dateNum: number): { date: Date; time: string } => {
    const localeDateTime = new Date(dateNum * 1000);
    return { date: localeDateTime, time: localeDateTime.toLocaleTimeString() };
  };

  public getForecasts() {
    return this.cityWeather.list;
  }

  ngOnInit() {
    this.initSubscriptions();
    this.onTemperatureUnitsClick(this.temperatureUnits.celsius);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private initSubscriptions() {
    // Sources
    const routeParams$ = this.activatedRoute.paramMap.pipe(takeUntil(this.destroyed$));

    // Subscriptions
    routeParams$.subscribe(async paramMap => {
      const city = (await this.weatherService.getCityWeathers()).find(
        c => c.country === paramMap.get('country') && c.name === paramMap.get('city')
      );

      this.city = city.name;
      this.country = city.country;
      this.cityFullName = getCityFullName(city.name, city.state, city.country);
      this.onCityChanged();
    });
  }

  private async onCityChanged(): Promise<any> {
    console.log(`City has changed to ${this.cityFullName}`);
    return this.weatherService
      .getCityWeather(this.city, this.country)
      .then((cityWeather: ICityWeather) => this.onCityWeatherRetrieved(cityWeather))
      .catch(err => this.handleError(err));
  }

  private onCityWeatherRetrieved(cityWeather: ICityWeather) {
    this.cityWeather = cityWeather;
    this.weeklyForecasts = cityWeather.list;
  }

  private handleError(err) {
    console.error(`[Error]`, err);
  }

  public displayTemperature(degrees: number) {
    // // with 2-decimals Rounding
    // return Math.round(100 * ) * 0.01;
    return Math.round(convertFarenheitTo(this.temperatureUnit, degrees));
  }

  public onTemperatureUnitsClick(type: temperatureUnits) {
    this.temperatureUnit = type;
  }

  public goHome() {
    this.route.navigate([`/`]);
  }
}
