function testCurrent(data, minGapForCountingInSec) {
  const foodCountMap = new Map();
  const lastSeenTimeMap = new Map();
  const resIdMap = new Map();

  const sortedData = [...data].sort(
    (a, b) => Number(a.split(",")[2]) - Number(b.split(",")[2]),
  );

  for (const entry of sortedData) {
    const [foodId, userId, time, resId] = entry.split(",");
    const timestamp = Number.parseInt(time.trim(), 10);

    if (!foodCountMap.has(foodId)) foodCountMap.set(foodId, [0, 0]);

    // Bug: updates the restaurant before checking the gap.
    resIdMap.set(foodId, resId);

    const key = `${foodId}-${userId}`;
    const previous = lastSeenTimeMap.get(key);

    if (
      previous !== undefined &&
      timestamp - previous < minGapForCountingInSec * 1000
    ) continue;

    const counts = foodCountMap.get(foodId);
    if (userId.includes("DeviceId")) counts[1]++;
    else counts[0]++;

    lastSeenTimeMap.set(key, timestamp);
  }

  return [...foodCountMap.entries()].map(
    ([foodId, counts]) =>
      `${foodId},${counts[0]},${counts[1]},${resIdMap.get(foodId)}`,
  );
}

const data = [
  "food1,user1,1000000,restaurantA",
  "food1,user1,1005000,restaurantB",
];

console.log(testCurrent(data, 10));