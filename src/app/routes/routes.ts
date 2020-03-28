import { Routes } from '@angular/router';
import { CityWeatherSelectorComponent } from '@components/city-weather/city-weather-selector/city-weather-selector.component';

export const routes: Routes = [
  // Regular Pages
  {
    path: 'weather/:country/:city',
    pathMatch: 'full',
    loadChildren: () => import('../components/city-weather/city-weather.module').then(m => m.CityWeatherModule)
  },
  {
    path: 'weather',
    component: CityWeatherSelectorComponent,
    pathMatch: 'full'
  },
  // Special routes
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  { path: '**', loadChildren: () => import('../components/errors/errors.module').then(m => m.ErrorsModule) }
];
