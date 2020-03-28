import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICityWeather, ICityWeatherResponse } from '@models/store-state/slices/city-weather';
import { API_ROUTES } from '@routes/api-routes';
import { StoreService } from '@services/store/store.service';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  public cities$ = new BehaviorSubject<ICityWeather[]>(null);
  public filteredCities$ = new BehaviorSubject<ICityWeather[]>(null);
  private origCities: ICityWeather[];
  public totalCount: number = 0;

  public get cities() {
    return this.cities$.getValue();
  }

  constructor(private readonly store: StoreService, private readonly http: HttpClient) {}

  private fetchCities(): Promise<ICityWeather[]> {
    return this.http
      .get<ICityWeather[]>('/assets/city.list.json')
      .toPromise()
      .then(cities => {
        cities = cities.filter(Boolean);

        this.origCities = cities;

        this.totalCount = cities.length;
        console.log('cities retrieved', cities);
        this.cities$.next(cities);
        return cities;
      });
  }

  public getCityId(reqCity: string, reqCountry: string) {
    const cityId = this.cities$.getValue().find(({ name, state, country }) => country === reqCountry && name === reqCity).id;
    return cityId;
  }

  public async getCityWeather(reqCity: string, reqCountry: string): Promise<ICityWeather> {
    await this.getCityWeathers();

    if (this.store.state.cityWeathers && this.store.state.cityWeathers.length > 0) {
      const stateSlice = this.store.state.cityWeathers.find(({ name, country }) => country === reqCountry && name === reqCity);
      return of(stateSlice).toPromise();
    } else {
      return this.fetchCitiesWeather(reqCity, reqCountry);
    }
  }

  public async getCityWeathers() {
    if (!this.cities$.getValue()) {
      return await this.fetchCities();
    }
    return this.cities;
  }

  private async fetchCitiesWeather(reqCity: string, reqCountry: string): Promise<ICityWeather> {
    const url = `${API_ROUTES.openWeather}&id=${this.getCityId(reqCity, reqCountry)}`;
    const { cod, city, list } = await this.http.get<ICityWeatherResponse>(url).toPromise();

    if (cod === '200') {
      console.log('Success', { cod, city, list });
      const cityWeatherWithForecasts = { ...city, list } as ICityWeather;
      return cityWeatherWithForecasts;
    } else {
      return null;
    }
  }

  // Case insensitive filtering
  public filterCities(query: string) {
    const keywords = query
      .replace('-', ',')
      .replace(' ', ',')
      .split(',')
      .map(k => k.trim().toLocaleLowerCase())
      .filter(Boolean); // Get only elements with content

    const filtered = this.origCities.filter(city => {
      const cityTags = [city.name, city.state, city.country].map(tag => tag.toLocaleLowerCase());
      return keywords.every(
        k =>
          // Exact match
          cityTags.includes(k) ||
          // Matching name of the city / state partially written
          cityTags
            .filter(t => t.length > 2)
            .toString()
            .includes(k)
      );
    });
    this.filteredCities$.next(filtered);
  }
}
