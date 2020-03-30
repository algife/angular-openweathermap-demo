import { Component, OnInit } from '@angular/core';
import { ICityWeather } from '@models/store-state/slices/city-weather';
import { WeatherService } from '@services/weather/weather.service';

@Component({
  selector: 'app-main-cities',
  templateUrl: './main-cities.component.html',
  styleUrls: ['./main-cities.component.scss']
})
export class MainCitiesComponent implements OnInit {
  public mainCities: ICityWeather[];

  constructor(private readonly weatherService: WeatherService) {}

  ngOnInit() {
    this.loadMainCities();
  }

  private async loadMainCities() {
    this.mainCities = [
      await this.findCityById(2964574), // Dublin
      await this.findCityById(5128581), // NYC
      await this.findCityById(2643743), // London
      await this.findCityById(3117735), // Madrid
      await this.findCityById(6356055) // Barcelona
    ].sort();
  }

  private async findCityById(id: number) {
    return (await this.weatherService.getCityWeathers()).find(city => city.id === id);
  }

  // Just in case we want to trigger the navigation programmatically:
  // public onCityClick(id: number) {
  //   const city = this.weatherService.cities.find(c => c.id === id);
  //   this.route.navigate([`/weather/${city.country}/${city.name}`]);
  // }
}
