// utils/utils.js

/**
 * Converts a number (1–1000) to its English word representation.
 */
export function numberToWords(number) {
  if (number < 1 || number > 1000) {
    return "Number out of range";
  }

  const ones = [
    "One", "Two", "Three", "Four", "Five",
    "Six", "Seven", "Eight", "Nine"
  ];

  const teens = [
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
    "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];

  const tens = [
    "Ten", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  let words = "";

  if (number >= 100) {
    words += `${ones[Math.floor(number / 100) - 1]} Hundred`;
    number %= 100;
    if (number > 0) words += " and ";
  }

  if (number >= 11 && number <= 19) {
    words += teens[number - 11];
  } else if (number >= 20) {
    words += tens[Math.floor(number / 10) - 1];
    if (number % 10 > 0) words += ` ${ones[number % 10 - 1]}`;
  } else if (number > 0) {
    words += ones[number - 1];
  }

  return words;
}

/**
 * Ensures an integer has two digits by adding a leading zero if needed.
 */
export function convertToTwoDigit(number) {
  return number >= 0 && number < 10 ? `0${number}` : number.toString();
}

/**
 * Rounds a numeric string to two decimal places.
 */
export function roundToTwoDecimalPlaces(input) {
  const value = parseFloat(input) || 0.0;
  return value.toFixed(2);
}

/**
 * Removes empty strings from a list.
 */
export function removeEmptyStrings(foods) {
  return foods.filter((food) => food !== "");
}

/**
 * Removes zero values from a list of integers.
 */
export function removeZerosFromInt(listInt) {
  return listInt.filter((num) => num !== 0);
}

/**
 * Checks if the given value is a list of strings.
 */
export function isListOfString(value) {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

/**
 * Converts a map (object) into a string-keyed object.
 */
export function convertInToMapStringDynamic(dataMap) {
  const newMap = {};
  for (const [key, value] of Object.entries(dataMap)) {
    newMap[String(key)] = value;
  }
  return newMap;
}

/**
 * Safely converts a string to a number (double precision).
 */
export function convertStringToDouble(input) {
  return parseFloat(input) || 0.0;
}

/**
 * Ensures a URL starts with https:// or http://
 */
export function ensureHttps(url) {
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    return `https://${url}`;
  }
  return url;
}

/**
 * Checks if a list index exists.
 */
export function checkIndexExists(list, index) {
  return index >= 0 && index < list.length;
}

/**
 * Ensures a list of strings has exactly `numberOfElements`.
 */
export function ensureNumberOfElements(list, numberOfElements) {
  const newList = [...list];
  while (newList.length < numberOfElements) newList.push("");
  return newList.slice(0, numberOfElements);
}

/**
 * Ensures a list of integers has exactly `numberOfElements`.
 */
export function ensureNumberOfElementsInt(list, numberOfElements) {
  const newList = [...list];
  while (newList.length < numberOfElements) newList.push(0);
  return newList.slice(0, numberOfElements);
}

/**
 * Filters `result` to only include strings that contain any of the substrings in `inputs`.
 */
export function filterStringsContainingInputs(result, inputs) {
  return result.filter((item) => inputs.some((input) => item.includes(input)));
}

/**
 * Finds all substrings from `inputs` that appear in `result`.
 */
export function findMatchingSubstrings(result, inputs) {
  return inputs.filter((input) => result.includes(input));
}

/**
 * Checks if any of the substrings in `inputs` appear in `result`.
 */
export function containsAnySubstring(result, inputs) {
  return inputs.some((input) => result.includes(input));
}

/**
 * Keeps only the *last* occurrence of each ID (based on last element).
 */
export function getLastUniqueEntriesForSearch(data) {
  const idMap = {};
  for (const entry of data) {
    const parts = entry.split(",");
    const id = parts[parts.length - 1];
    idMap[id] = entry;
  }
  return Object.values(idMap);
}

/**
 * Keeps only the *last* occurrence of each ID (based on first element).
 */
export function getLastUniqueEntriesForDocumnetId(data) {
  const idMap = {};
  for (const entry of data) {
    const parts = entry.split(",");
    if (parts.length > 1) {
      const id = parts[0];
      idMap[id] = entry;
    }
  }
  return Object.values(idMap);
}

/**
 * Filters search results to include only foodIds that belong to a specific restaurant.
 */
export function searchItemForSpecificRestaurant(searchWords, foodIds) {
  return searchWords.filter((entry) => {
    const foodId = entry.split(",").pop();
    return foodIds.includes(foodId);
  });
}
