import { temperatureUnits } from '@models/temperature-units';

export const convertFarenheitTo = (tempUnit: temperatureUnits, degrees: number) => {
  // Celsius
  if (tempUnit === temperatureUnits.celsius) return ((degrees - 32) * 5) / 9;
  // Kelvin
  if (tempUnit === temperatureUnits.kelvin) return 273.15 + convertFarenheitTo(temperatureUnits.celsius, degrees);

  // Farenheit
  return degrees;
};
