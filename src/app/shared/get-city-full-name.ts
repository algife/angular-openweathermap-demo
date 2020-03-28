import { capitalizeString } from './capitalize-string';

export const getCityFullName = (city: string, state: string, country: string) =>
  [capitalizeString(city), (state || '').toLocaleUpperCase(), (country || '').toLocaleUpperCase()]
    // Remove State is is undefined or null
    .filter(Boolean)
    .join(', ');
