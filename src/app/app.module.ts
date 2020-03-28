import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CityWeatherSelectorComponent } from '@components/city-weather/city-weather-selector/city-weather-selector.component';
import { SearchBoxComponent } from '@components/city-weather/city-weather-selector/search-box/search-box.component';
import { CityWeatherModule } from '@components/city-weather/city-weather.module';
import { ErrorsModule } from '@components/errors/errors.module';
import { AppRoutingModule } from '@routes/app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, CityWeatherSelectorComponent, SearchBoxComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, ErrorsModule, CityWeatherModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
