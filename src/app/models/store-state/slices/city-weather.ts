export interface ICityWeather {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
  timezone?: number;
  sunrise?: number;
  sunset?: number;
  list?: ICityWeatherForecast[];
}

export interface ICityWeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ICityWeatherForecast[];
  city: ICityWeather;
}

export interface ICityWeatherForecast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: { id: number; main: string; description: string; icon: string }[];
  clouds?: { all: number };
  wind?: { speed: number; deg: number; gust: number };
  rain?: {
    '3h': number;
  };
  snow?: {
    '3h': number;
  };
  dt_txt: string;
}
