
import { FoodInfoCalculatedModel } from "../models/food_info_calculated_model.js";
import { FirebaseFoodInfoMethods } from "../firebase_methods/firebase_food_info_methods.js";
import { FirebaseFoodInfoCalculatedMethods } from "../firebase_methods/firebase_food_info_calculated_methods.js";
import { CollectionName } from "../key_words/collection_name.js";
import { StringConstants } from "../utils/string_constant.js";
import { isListEmpty, cleanNaNValues } from "../utils/utils.js";


export class FoodInfoCalculatedServiceMethod {
countFoodViewOccurrencesWithTimeCondition(data, minGapForCountingInSec) {
  const foodCountMap = new Map();
  const lastSeenTimeMap = new Map();
  const resIdMap = new Map();
   const sortedData = [...data].sort((a, b) => {
    const timeA = Number(a.split(",")[2]?.trim());
    const timeB = Number(b.split(",")[2]?.trim());
    return timeA - timeB;
  });

  for (const entry of sortedData) {
    const parts = entry.split(",");
    if (parts.length < 4) continue;

    const foodId = parts[0].trim();
    const userId = parts[1].trim();
    const timestampString = parts[2].trim();
const timestamp = Number(timestampString);
if (!timestampString || !Number.isSafeInteger(timestamp)) {
  continue;
}
    const resId = parts[3].trim();

    if (
      !foodId ||
      !userId ||
      !Number.isFinite(timestamp) ||
      !resId
    ) {
      continue;
    }

    if (!foodCountMap.has(foodId)) {
      foodCountMap.set(foodId, [0, 0]);
    }

    resIdMap.set(foodId, resId);

    const key = `${foodId}-${userId}`;
    const previous = lastSeenTimeMap.get(key);

    if (
      previous !== undefined &&
      timestamp - previous < minGapForCountingInSec * 1000
    ) {
      continue;
    }

    const counts = foodCountMap.get(foodId);

    if (userId.includes("DeviceId")) {
      counts[1]++;
    } else {
      counts[0]++;
    }

    lastSeenTimeMap.set(key, timestamp);
  }

  return [...foodCountMap.entries()]
    .map(([foodId, counts]) =>
      `${foodId},${counts[0]},${counts[1]},${resIdMap.get(foodId)}`
    )
    .sort();
}

countOccurrencesFoodWithTimeCondition(data, minGapInSec) {
  const counts = new Map();
  const lastSeen = new Map();
  const resIdMap = new Map();
  const sortedData = [...data].sort((a, b) => {
  const timeA = Number(a.split(",")[2]?.trim());
  const timeB = Number(b.split(",")[2]?.trim());
  return timeA - timeB;
});

  for (const entry of sortedData) {
    const parts = entry.split(",");
    if (parts.length < 4) continue;

    const foodId = parts[0].trim();
    const userId = parts[1].trim();
    const timestampString = parts[2].trim();
const timestamp = Number(timestampString);

if (!timestampString || !Number.isSafeInteger(timestamp)) {
  continue;
}
    const resId = parts[3].trim();

    if (
      !foodId ||
      !userId ||
      !Number.isFinite(timestamp) ||
      !resId
    ) {
      continue;
    }

    const key = `${foodId}-${userId}`;
    const previous = lastSeen.get(key);

    if (
      previous !== undefined &&
      timestamp - previous < minGapInSec * 1000
    ) {
      continue;
    }

    counts.set(foodId, (counts.get(foodId) ?? 0) + 1);
    resIdMap.set(foodId, resId);
    lastSeen.set(key, timestamp);
  }

  return [...counts.entries()]
    .map(([foodId, count]) =>
      `${foodId},${count},${resIdMap.get(foodId)}`
    )
    .sort();
}

countSales(data) {
  const sales = new Map();
  const resIdMap = new Map();

  for (const entry of data) {
    const parts = entry.split(",");
    if (parts.length < 5) continue;

    const foodId = parts[0].trim();
    const amount = Number.parseInt(parts[3].trim(), 10);
    const resId = parts[4].trim();

    if (!foodId || !Number.isFinite(amount) || !resId) {
      continue;
    }

    sales.set(foodId, (sales.get(foodId) ?? 0) + amount);
    resIdMap.set(foodId, resId);
  }

  return [...sales.entries()]
    .map(([foodId, amount]) =>
      `${foodId},${amount},${resIdMap.get(foodId)}`
    )
    .sort();
}

countRestaurantViewOccurrencesWithTimeCondition(
  data,
  minGapForCountingInSec
) {
  const resCountMap = new Map();
  const lastSeenTimeMap = new Map();
  const sortedData = [...data].sort((a, b) => {
  const timeA = Number(a.split(",")[2]?.trim());
  const timeB = Number(b.split(",")[2]?.trim());
  return timeA - timeB;
});

  for (const entry of sortedData) {
    const parts = entry.split(",");
    if (parts.length < 3) continue;

    const resId = parts[0].trim();
    const userId = parts[1].trim();
   const timestampString = parts[2].trim();
const timestamp = Number(timestampString);

if (!timestampString || !Number.isSafeInteger(timestamp)) {
  continue;
}

    if (!resId || !userId || !Number.isFinite(timestamp)) {
      continue;
    }

    if (!resCountMap.has(resId)) {
      resCountMap.set(resId, [0, 0]);
    }

    const key = `${resId}-${userId}`;
    const previous = lastSeenTimeMap.get(key);

    if (
      previous !== undefined &&
      timestamp - previous < minGapForCountingInSec * 1000
    ) {
      continue;
    }

    const counts = resCountMap.get(resId);

    if (userId.includes("DeviceId")) {
      counts[1]++;
    } else {
      counts[0]++;
    }

    lastSeenTimeMap.set(key, timestamp);
  }

  return [...resCountMap.entries()]
    .map(([resId, counts]) => `${resId},${counts[0]},${counts[1]}`)
    .sort();
}

countOccurrencesRestaurantWithTimeCondition(data, minGapInSec) {
  const counts = new Map();
  const lastSeen = new Map();
  const sortedData = [...data].sort((a, b) => {
  const timeA = Number(a.split(",")[2]?.trim());
  const timeB = Number(b.split(",")[2]?.trim());
  return timeA - timeB;
});
  

  for (const entry of sortedData) {
    const parts = entry.split(",");
    if (parts.length < 3) continue;

    const resId = parts[0].trim();
    const userId = parts[1].trim();
    const timestampString = parts[2].trim();
const timestamp = Number(timestampString);

if (!timestampString || !Number.isSafeInteger(timestamp)) {
  continue;
}

    if (!resId || !userId || !Number.isFinite(timestamp)) {
      continue;
    }

    const key = `${resId}-${userId}`;
    const previous = lastSeen.get(key);

    if (
      previous !== undefined &&
      timestamp - previous < minGapInSec * 1000
    ) {
      continue;
    }

    counts.set(resId, (counts.get(resId) ?? 0) + 1);
    lastSeen.set(key, timestamp);
  }

  return [...counts.entries()]
    .map(([resId, count]) => `${resId},${count}`)
    .sort();
}
  sumcompletcalculatedRes(infos) {
    if (infos.length === 0) return "";

    const maxLength = Math.max(
      ...infos.map((info) => info.split(",").length),
    );

    const totals = Array(maxLength).fill(0);

    for (const info of infos) {
      const parts = info.split(",");

      for (let i = 0; i < parts.length; i++) {
        const value = Number(parts[i]);

        if (parts[i].trim() !== "" && Number.isFinite(value)) {
          totals[i] += value;
        }
      }
    }

    return totals.map((value) => value.toFixed(0)).join(",");
  }

  sumcompletcalculatedFood(infos) {
    if (infos.length === 0) return "";

    const foodID = infos[0].split(",")[0];

    const maxLength = Math.max(
      ...infos.map((item) => item.split(",").length),
    );

    const totals = Array(maxLength - 1).fill(0);

    for (const info of infos) {
      const parts = info.split(",");

      for (let i = 1; i < parts.length; i++) {
        const value = Number(parts[i]);

        if (parts[i].trim() !== "" && Number.isFinite(value)) {
          totals[i - 1] += value;
        }
      }
    }

    return `${foodID},${totals.map((value) => value.toFixed(0)).join(",")}`;
  }

  calculatedStringFood(input, { index }) {
    const parts = input.split(",");
    const values = Array(9).fill("0");

    if (index === 7) {
      values[7] = parts[1] ?? "0";
      values[8] = parts[2] ?? "0";
    } else {
      values[index] = parts[1] ?? "0";
    }

    return `${parts[0]},${values.join(",")}`;
  }

  calculatedStringResUnFav(resCalculatedStringNew) {
    const parts = resCalculatedStringNew.split(",");

    return `0,${parts[1] ?? "0"},0,0`;
    // return `${parts[0]},0,${parts[1] ?? "0"},0,0`;
  }

  calculatedStringResFav(resCalculatedStringNew) {
    const parts = resCalculatedStringNew.split(",");

    return `${parts[1] ?? "0"},0,0,0`;
    // return `${parts[0]},${parts[1] ?? "0"},0,0,0`;
  }

  calculatedStringResView(resCalculatedStringNew) {
    const parts = resCalculatedStringNew.split(",");

    return `0,0,${parts[1] ?? "0"},${parts[2] ?? "0"}`;
    // return `${parts[0]},0,0,${parts[1] ?? "0"},${parts[2] ?? "0"}`;
  }

  async updateFoodInfo(foodCalculatedStringNew, combinedAppData, type) {
    try {
      const resId = foodCalculatedStringNew.split(",").at(-1);
      let finalString = "";

      const foodIndexes = {
        [CollectionName.typeFoodCart]: 0,
        [CollectionName.typeFoodFav]: 1,
        [CollectionName.typeFoodLiked]: 2,
        [CollectionName.typeFoodSale]: 3,
        [CollectionName.typeFoodUnCart]: 4,
        [CollectionName.typeFoodUnFav]: 5,
        [CollectionName.typeFoodUnLiked]: 6,
        [CollectionName.typeFoodView]: 7,
      };

      if (!Object.hasOwn(foodIndexes, type)) {
        return StringConstants.error;
      }

      finalString = this.calculatedStringFood(foodCalculatedStringNew, {
        index: foodIndexes[type],
      });

      const firebaseMethods = new FirebaseFoodInfoCalculatedMethods();

      const restaurantCalculated = await firebaseMethods.getRestaurantRealTime(
        resId,
        combinedAppData,
      );

      if (
        restaurantCalculated.restaurantIdentification ===
        StringConstants.thisDataNotFound
      ) {
        const newRestaurant = new FoodInfoCalculatedModel({
          restaurantIdentification: resId,
          restaurantInfoCalculated: "0,0,0,0",
          menuCalculated: [finalString],
        });

        return await firebaseMethods.addRestaurant(newRestaurant);
      }

      if (
        restaurantCalculated.restaurantIdentification.includes("Error")
      ) {
        return StringConstants.error;
      }

      // let foodCalculatedStringFromDB =
      //   firebaseMethods.findStringContainingSubstring(
      //     finalString.split(",")[0],
      //     restaurantCalculated.menuCalculated,
      //   );
        const foodId = finalString.split(",")[0].trim();
let foodCalculatedStringFromDB =
  restaurantCalculated.menuCalculated?.find(
    (item) => item.split(",")[0].trim() === foodId,
  ) ?? "";

      if (foodCalculatedStringFromDB.includes("NaN")) {
        foodCalculatedStringFromDB = cleanNaNValues(
          foodCalculatedStringFromDB,
        );
      }

      if (foodCalculatedStringFromDB === "") {
        return await firebaseMethods.addMenuItem(resId, finalString);
      }

      const combinedString = this.sumcompletcalculatedFood([
        foodCalculatedStringFromDB,
        finalString,
      ]);

      return await firebaseMethods.updateMenuItem(
        resId,
        foodCalculatedStringFromDB,
        combinedString,
      );
    } catch (error) {
      return `Error: ${error.message ?? error}`;
    }
  }

  async updateResInfo(resCalculatedStringNew, combinedAppData, type) {
    try {
      const restaurantIdentification = resCalculatedStringNew.split(",")[0];

      const typeMap = {
        [CollectionName.typeResFav]: () =>
          this.calculatedStringResFav(resCalculatedStringNew),
        [CollectionName.typeResUnFav]: () =>
          this.calculatedStringResUnFav(resCalculatedStringNew),
        [CollectionName.typeResView]: () =>
          this.calculatedStringResView(resCalculatedStringNew),
      };

      if (!Object.hasOwn(typeMap, type)) {
        return StringConstants.error;
      }

      const finalString = typeMap[type]();

      const firebaseMethods = new FirebaseFoodInfoCalculatedMethods();

      const restaurantCalculated = await firebaseMethods.getRestaurantRealTime(
        restaurantIdentification,
        combinedAppData,
      );

      if (
        restaurantCalculated.restaurantIdentification ===
        StringConstants.thisDataNotFound
      ) {
        const newRestaurant = new FoodInfoCalculatedModel({
          restaurantIdentification:restaurantIdentification,
          restaurantInfoCalculated: finalString,
          menuCalculated: [""],
        });

        return await firebaseMethods.addRestaurant(newRestaurant);
      }

      if (
        restaurantCalculated.restaurantIdentification.includes("Error")
      ) {
        return StringConstants.error;
      }

      let  oldInfo = restaurantCalculated.restaurantInfoCalculated;

      if (oldInfo.includes("NaN")) {
        oldInfo = cleanNaNValues(oldInfo);
      }

      const combinedString = this.sumcompletcalculatedRes([
        oldInfo,
        finalString,
      ]);

      return await firebaseMethods.updateRestaurantInfoCalculated(
        restaurantIdentification,
        combinedString,
      );
    } catch (error) {
      return `Error: ${error.message ?? error}`;
    }
  }



  async addRestaurant(model) {
    return new FirebaseFoodInfoCalculatedMethods().addRestaurant(model);
  }

  async deleteRestaurant(restaurantIdentification) {
    return new FirebaseFoodInfoCalculatedMethods().deleteRestaurant(restaurantIdentification);
  }

  async updateRestaurant(model) {
    return new FirebaseFoodInfoCalculatedMethods().updateRestaurant(model);
  }

  async updateRestaurantInfoCalculated(
    restaurantIdentification,
    restaurantInfoCalculated,
  ) {
    return new FirebaseFoodInfoCalculatedMethods().updateRestaurantInfoCalculated(
      restaurantIdentification,
      restaurantInfoCalculated,
    );
  }

  async getRestaurant(restaurantIdentification, combinedAppData) {
    return new FirebaseFoodInfoCalculatedMethods().getRestaurant(restaurantIdentification, combinedAppData);
  }

  async getAllRestaurants(appData) {
    return new FirebaseFoodInfoCalculatedMethods().getAllRestaurants(appData);
  }

  // async getRestaurantsByIds(ids, appData) {
  //   return new FirebaseFoodInfoCalculatedMethods().getRestaurantsByIds(ids, appData);
  // }

  async addMenuItem(restaurantId, menuItem) {
    return new FirebaseFoodInfoCalculatedMethods().addMenuItem(restaurantId, menuItem);
  }

  async removeMenuItem(restaurantId, menuItem) {
    return new FirebaseFoodInfoCalculatedMethods().removeMenuItem(restaurantId, menuItem);
  }

  async updateMenuItem(restaurantId, oldItem, newItem) {
    return new FirebaseFoodInfoCalculatedMethods().updateMenuItem(restaurantId, oldItem, newItem);
  }

  async getRestaurantWithCache(restaurantIdentification, combinedAppData) {
    return this.getRestaurant(restaurantIdentification, combinedAppData);
  }

  async getAllRestaurantsWithCache(appData) {
    return this.getAllRestaurants(appData);
  }

  // async getRestaurantsByIdsWithCache(ids, appData) {
  //   return this.getRestaurantsByIds(ids, appData);
  // }

  async cleanFoodCartData(foodInfoDataTemp, combinedAppData) {
    return this._cleanFoodData({
      data: foodInfoDataTemp.foodCartData,
      combinedAppData,
      gap: combinedAppData.recommandation.cartCountGapInSec,
      type: CollectionName.typeFoodCart,
      countMethod: "countOccurrencesFoodWithTimeCondition",
      backupMethod: "addCartBackUp",
      clearMethod: "clearCartData",
    });
  }

  async cleanFoodFavData(foodInfoDataTemp, combinedAppData) {
    return this._cleanFoodData({
      data: foodInfoDataTemp.foodFavoriteData,
      combinedAppData,
      gap: combinedAppData.recommandation.foodFavCountGapInSec,
      type: CollectionName.typeFoodFav,
      countMethod: "countOccurrencesFoodWithTimeCondition",
      backupMethod: "addFoodFavBackUp",
      clearMethod: "clearFoodFavData",
    });
  }

  async cleanFoodLikedData(foodInfoDataTemp, combinedAppData) {
    return this._cleanFoodData({
      data: foodInfoDataTemp.foodLiked,
      combinedAppData,
      gap: 0,
      type: CollectionName.typeFoodLiked,
      countMethod: "countOccurrencesFoodWithTimeCondition",
      backupMethod: "addFoodLikedBackUp",
      clearMethod: "clearFoodLikedData",
    });
  }

  async cleanFoodSaleData(foodInfoDataTemp, combinedAppData) {
    return this._cleanFoodData({
      data: foodInfoDataTemp.foodSaleData,
      combinedAppData,
      type: CollectionName.typeFoodSale,
      countMethod: "countSales",
      backupMethod: "addSaleBackUp",
      clearMethod: "clearSaleData",
    });
  }

  async cleanFoodUnCartData(foodInfoDataTemp, combinedAppData) {
    return this._cleanFoodData({
      data: foodInfoDataTemp.foodUnCartData,
      combinedAppData,
      gap: combinedAppData.recommandation.unCartCountGapInSec,
      type: CollectionName.typeFoodUnCart,
      countMethod: "countOccurrencesFoodWithTimeCondition",
      backupMethod: "addUnCartBackUp",
      clearMethod: "clearUnCartData",
    });
  }

  async cleanFoodUnFavData(foodInfoDataTemp, combinedAppData) {
    return this._cleanFoodData({
      data: foodInfoDataTemp.foodUnFavoriteData,
      combinedAppData,
      gap: combinedAppData.recommandation.foodUnFavCountGapInSec,
      type: CollectionName.typeFoodUnFav,
      countMethod: "countOccurrencesFoodWithTimeCondition",
      backupMethod: "addFoodUnFavBackUp",
      clearMethod: "clearFoodUnFavData",
    });
  }

  async cleanFoodUnLikedData(foodInfoDataTemp, combinedAppData) {
    return this._cleanFoodData({
      data: foodInfoDataTemp.foodUnliked,
      combinedAppData,
      gap: 0,
      type: CollectionName.typeFoodUnLiked,
      countMethod: "countOccurrencesFoodWithTimeCondition",
      backupMethod: "addFoodUnlikedBackUp",
      clearMethod: "clearFoodUnlikedData",
    });
  }

  async cleanFoodViewData(foodInfoDataTemp, combinedAppData) {
    return this._cleanFoodData({
      data: foodInfoDataTemp.foodViewData,
      combinedAppData,
      gap: combinedAppData.recommandation.foodViewCountGapInSec,
      type: CollectionName.typeFoodView,
      countMethod: "countFoodViewOccurrencesWithTimeCondition",
      backupMethod: "addFoodViewBackUp",
      clearMethod: "clearFoodViewData",
    });
  }

  async cleanResFavData(foodInfoDataTemp, combinedAppData) {
    return this._cleanRestaurantData({
      data: foodInfoDataTemp.restaurantFavoriteData,
      combinedAppData,
      gap: combinedAppData.recommandation.resFavCountGapInSec,
      type: CollectionName.typeResFav,
      backupMethod: "addResFavBackUp",
      clearMethod: "clearResFavData",
    });
  }

  async cleanResUnFavData(foodInfoDataTemp, combinedAppData) {
    return this._cleanRestaurantData({
      data: foodInfoDataTemp.restaurantUnFavoriteData,
      combinedAppData,
      gap: combinedAppData.recommandation.resUnFavCountGapInSec,
      type: CollectionName.typeResUnFav,
      backupMethod: "addResUnFavBackUp",
      clearMethod: "clearResUnFavData",
    });
  }

  async cleanResViewData(foodInfoDataTemp, combinedAppData) {
    return this._cleanRestaurantData({
      data: foodInfoDataTemp.restaurantViewData,
      combinedAppData,
      gap: combinedAppData.recommandation.resViewCountGapInSec,
      type: CollectionName.typeResView,
      backupMethod: "addResViewBackUp",
      clearMethod: "clearResViewData",
    });
  }

  async _cleanFoodData({
    data,
    combinedAppData,
    gap,
    type,
    countMethod,
    backupMethod,
    clearMethod,
  }) {
    try {
      if (isListEmpty(data)) return StringConstants.success;
      const results =
        countMethod === "countSales"
          ? this.countSales(data)
          : this[countMethod](data, gap);

      if (isListEmpty(results)) return StringConstants.success;

      for (const result of results) {
          const updateResult = await this.updateFoodInfo(
            result,
            combinedAppData,
            type,
          );

        //   if (updateResult !== StringConstants.success) {
        //     return updateResult;
        //   }
      }

      const firebaseFoodInfo = new FirebaseFoodInfoMethods();

      await firebaseFoodInfo[backupMethod](data);
      await firebaseFoodInfo[clearMethod]();

      return StringConstants.success;
    } catch (error) {
      return String(error);
    }
  }

  async _cleanRestaurantData({
    data,
    combinedAppData,
    gap,
    type,
    backupMethod,
    clearMethod,
  }) {
    try {
      if (isListEmpty(data)) return StringConstants.success;



      const results =
        type === CollectionName.typeResView
          ? this.countRestaurantViewOccurrencesWithTimeCondition(
              data,
              gap,
            )
          : this.countOccurrencesRestaurantWithTimeCondition(
              data,
              gap,
            );

      if (isListEmpty(results)) return StringConstants.success;

      for (const result of results) {
         const updateResult = await this.updateResInfo(
             result,
             combinedAppData,
             type,
           );
         
          //  if (updateResult !== StringConstants.success) {
          //    return updateResult;
          //  }
      }

      const firebaseFoodInfo = new FirebaseFoodInfoMethods();

      await firebaseFoodInfo[backupMethod](data);
      await firebaseFoodInfo[clearMethod]();

      return StringConstants.success;
    } catch (error) {
      return String(error);
    }
  }

  async cleanAllData(foodInfoDataTemp, combinedAppData) {
    try {
      const methods = [
        "cleanFoodCartData",
        "cleanFoodFavData",
        "cleanFoodLikedData",
        "cleanFoodSaleData",
        "cleanFoodUnCartData",
        "cleanFoodUnFavData",
        "cleanFoodUnLikedData",
        "cleanFoodViewData",
        "cleanResFavData",
        "cleanResUnFavData",
        "cleanResViewData",
      ];

      for (const method of methods) {
        const result = await this[method](foodInfoDataTemp, combinedAppData);

        if (result !== StringConstants.success) {
          console.error(`${method} failed:`, result);
          return result;
        }
      }

      return StringConstants.success;
    } catch (error) {
      return String(error);
    }
  }
}
