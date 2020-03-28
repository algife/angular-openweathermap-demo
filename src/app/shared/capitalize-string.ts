/**
 * Capitalizes a string (makes the first letter uppercase and the rest of the string lowerCase)
 */
export const capitalizeString = (value: string): string => {
  // Gets the first letter.
  // Makes It uppercase
  // Concatenates it with the rest of the string in lowerCase.
  // Deletes blank spaces at the end and at the start
  if (value && typeof value === 'string') {
    return value
      .charAt(0)
      .toUpperCase()
      .concat(value.toLocaleLowerCase().slice(1))
      .trim();
  } else {
    console.warn(`capitalizeString() can't be applied to a non-string parameter`);
    return value;
  }
};
