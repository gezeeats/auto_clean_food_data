import { DateTime } from "luxon";

/**
 * 🥗 Count total food sales from a list of entries.
 * Each entry format: "foodId,userId,amount,date"
 */
export function countFoodSales(data) {
  const foodOrdersMap = {};

  for (const entry of data) {
    const splitEntry = entry.split(",");
    if (splitEntry.length >= 3) {
      const foodId = splitEntry[0];
      const orders = parseInt(splitEntry[2]) || 0;

      foodOrdersMap[foodId] = (foodOrdersMap[foodId] || 0) + orders;
    }
  }

  const result = [];
  for (const [foodId, totalOrders] of Object.entries(foodOrdersMap)) {
    result.push(`${foodId},${totalOrders}`);
  }

  return result;
}

/**
 * 🍟 Count how many times a food was favorited or added to cart.
 * Each entry format: "foodId,userId,date,isAdd"
 */
export function countFoodFavoriteOrCartOccurrences(data) {
  const foodCountMap = {};

  for (const entry of data) {
    const splitEntry = entry.split(",");
    if (splitEntry.length > 3) {
      const foodId = splitEntry[0];
      const isIncrease = splitEntry[3].trim() === "true";

      foodCountMap[foodId] = (foodCountMap[foodId] || 0) + (isIncrease ? 1 : -1);
    }
  }

  const result = [];
  for (const [foodId, count] of Object.entries(foodCountMap)) {
    result.push(`${foodId},${count}`);
  }

  return result;
}

// utils/recommandation_method_fixed.js

/**
 * Parse timestamp strings like "2025-10-13 12:00:00.000000"
 * into a JS Date. Returns null if parsing fails.
 */
function parseTimestampToDate(ts) {
  if (!ts) return null;
  // replace space between date and time with 'T'
  let s = ts.trim().replace(" ", "T");

  // If there is a fractional part (microseconds), keep up to 3 digits (ms)
  if (s.includes(".")) {
    const [left, fracAndRest] = s.split(".", 2);
    // fracAndRest might contain timezone or nothing; strip non-digits after fraction
    const fracDigits = fracAndRest.match(/^\d+/);
    const frac = fracDigits ? fracDigits[0].substring(0, 3).padEnd(3, "0") : "000";
    s = `${left}.${frac}Z`; // treat as UTC
  } else {
    s = `${s}Z`; // treat as UTC
  }

  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Count food occurrences based on time condition.
 * Each entry format: "foodId,middleValue,timestamp"
 * middleValue is userId or contains "DeviceId" for devices.
 */
export function countFoodOccurrencesWithTimeCondition(data, timeDifferenceInMinutes) {
  const foodCountMap = {}; // foodId => [userCount, deviceCount]
  const lastSeenTimeMap = {}; // `${foodId}-${middleValue}` => Date

  for (const entry of data) {
    const splitEntry = entry.split(",");
    if (splitEntry.length < 3) continue;

    const foodId = splitEntry[0].trim();
    const middleValue = splitEntry[1].trim();
    const timestampStr = splitEntry.slice(2).join(",").trim(); // join back in case timestamp contains commas

    const timestamp = parseTimestampToDate(timestampStr);
    if (!timestamp) continue; // skip invalid

    if (!foodCountMap[foodId]) foodCountMap[foodId] = [0, 0];

    const key = `${foodId}-${middleValue}`;
    const isDevice = middleValue.includes("DeviceId");

    if (timeDifferenceInMinutes === 0) {
      if (isDevice) foodCountMap[foodId][1]++;
      else foodCountMap[foodId][0]++;
      lastSeenTimeMap[key] = timestamp;
    } else {
      const lastSeen = lastSeenTimeMap[key];
      if (!lastSeen) {
        if (isDevice) foodCountMap[foodId][1]++;
        else foodCountMap[foodId][0]++;
        lastSeenTimeMap[key] = timestamp;
      } else {
        const diffMs = timestamp.getTime() - lastSeen.getTime();
        const diffMinutes = diffMs / (1000 * 60);
        if (diffMinutes >= timeDifferenceInMinutes) {
          if (isDevice) foodCountMap[foodId][1]++;
          else foodCountMap[foodId][0]++;
          lastSeenTimeMap[key] = timestamp;
        }
      }
    }
  }

  const result = [];
  for (const [foodId, counts] of Object.entries(foodCountMap)) {
    result.push(`${foodId},${counts[0]},${counts[1]}`);
  }

  // sort alphabetically by foodId (optional)
  return result.sort();
}
