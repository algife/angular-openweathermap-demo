import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICityWeather } from '@models/store-state/slices/city-weather';
import { WeatherService } from '@services/weather/weather.service';
import { getCityFullName } from '@shared/get-city-full-name';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const itemsPerPage = 15;

@Component({
  selector: 'app-city-weather-selector',
  templateUrl: './city-weather-selector.component.html',
  styleUrls: ['./city-weather-selector.component.scss']
})
export class CityWeatherSelectorComponent implements OnInit, OnDestroy {
  public get totalCount() {
    return this.weatherService.totalCount || 0;
  }

  constructor(private readonly weatherService: WeatherService) {}
  private readonly destroyed$ = new Subject();
  public isLoading = true;
  public pageCountInit = 0;

  // public get cities(): ICityWeather[] {
  //   return this.weatherService.cities;
  // }
  public searchCityList: ICityWeather[];

  public getCityFullName = getCityFullName;

  ngOnInit() {
    // Reset search filtering in each load
    this.weatherService.filteredCities$.next(null);
    this.loadCities();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private loadCities() {
    this.weatherService.getCityWeathers();

    this.weatherService.filteredCities$.pipe(takeUntil(this.destroyed$)).subscribe((cities: ICityWeather[]) => {
      this.searchCityList = cities && cities.length > 0 ? cities.slice(this.pageCountInit, this.pageCountInit + itemsPerPage) : [];
    });
  }
}
