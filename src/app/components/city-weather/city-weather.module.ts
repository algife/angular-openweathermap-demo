import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityWeatherForecastDisplayComponent } from './city-weather-forecast-display/city-weather-forecast-display.component';
import { MainCitiesComponent } from './city-weather-selector/main-cities/main-cities.component';

const routes: Routes = [{ path: '', component: CityWeatherForecastDisplayComponent }];

@NgModule({
  declarations: [CityWeatherForecastDisplayComponent, MainCitiesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [MainCitiesComponent]
})
export class CityWeatherModule {}
