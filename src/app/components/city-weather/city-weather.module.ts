import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainCitiesComponent } from './city-weather-selector/main-cities/main-cities.component';

@NgModule({
  declarations: [MainCitiesComponent],
  imports: [CommonModule, RouterModule],
  exports: [RouterModule, MainCitiesComponent]
})
export class CityWeatherModule {}
