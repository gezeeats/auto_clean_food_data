// service_methods/food_info_calculated_service_method.js

import { FirebaseFoodInfoCalculatedMethods } from "../firebase_methods/firebase_food_info_calculated_methods.js";
import { FoodIdResIdServiceMethod } from "./food_id_res_id_service_method.js";
import { FoodInfoCalculatedModel } from "../models/food_info_calculated_model.js";

export class FoodInfoCalculatedServiceMethod {
  // 🔹 Sum complete calculated restaurant info
  sumcompletcalculatedRes(infos) {
    if (!infos || infos.length === 0) return "";

    const first = infos[0].split(",");
    const resID = first[0];
    const totals = new Array(first.length - 1).fill(0);

    for (const info of infos) {
      const parts = info.split(",");
      for (let i = 1; i < parts.length; i++) {
        totals[i - 1] += parseFloat(parts[i]) || 0;
      }
    }

    return `${resID},${totals.map((e) => e.toFixed(0)).join(",")}`;
  }

  // 🔹 Sum specific restaurant fields
  sumSelectedFieldsRes(x, newData, { type }) {
    const fieldNames = ["resID", "unsubscribedview", "subscribedview", "fav"];
    const data = { unsubscribedview: 0, subscribedview: 0, fav: 0 };
    let resID = "";

    const parts = x ? x.split(",") : [];
    if (parts.length) resID = parts[0];
    if (parts.length === fieldNames.length) {
      data.unsubscribedview = parseFloat(parts[1]) || 0;
      data.subscribedview = parseFloat(parts[2]) || 0;
      data.fav = parseFloat(parts[3]) || 0;
    }

    const newParts = newData.split(",");
    if (newParts.length) resID = newParts[0];

    switch (type) {
      case "ResView":
        data.unsubscribedview += parseFloat(newParts[1]) || 0;
        data.subscribedview += parseFloat(newParts[2]) || 0;
        break;
      case "Fav":
        data.fav += parseFloat(newParts[1]) || 0;
        break;
    }

    return `${resID},${data.unsubscribedview},${data.subscribedview},${data.fav}`;
  }

  // 🔹 Sum specific food fields
  sumSelectedCalculatedFood(x, newData, { type }) {
    const fieldNames = [
      "foodID",
      "unsubscribedview",
      "subscribedview",
      "sales",
      "fav",
      "cart",
    ];

    const data = {
      unsubscribedview: 0,
      subscribedview: 0,
      sales: 0,
      fav: 0,
      cart: 0,
    };

    let foodID = "";

    if (x && x.trim()) {
      const parts = x.split(",");
      if (parts.length) foodID = parts[0];
      if (parts.length === fieldNames.length) {
        data.unsubscribedview = parseFloat(parts[1]) || 0;
        data.subscribedview = parseFloat(parts[2]) || 0;
        data.sales = parseFloat(parts[3]) || 0;
        data.fav = parseFloat(parts[4]) || 0;
        data.cart = parseFloat(parts[5]) || 0;
      }
    }

    const newParts = newData.split(",");
    if (newParts.length) foodID = newParts[0];

    switch (type) {
      case "FoodView":
        data.unsubscribedview += parseFloat(newParts[1]) || 0;
        data.subscribedview += parseFloat(newParts[2]) || 0;
        break;
      case "Sale":
        data.sales += parseFloat(newParts[1]) || 0;
        break;
      case "Fav":
        data.fav += parseFloat(newParts[1]) || 0;
        break;
      case "Cart":
        data.cart += parseFloat(newParts[1]) || 0;
        break;
    }

    return `${foodID},${data.unsubscribedview},${data.subscribedview},${data.sales},${data.fav},${data.cart}`;
  }

  // 🔹 Sum all food info
  sumcompletcalculatedFood(infos) {
    if (!infos || infos.length === 0) return "";

    const first = infos[0].split(",");
    const foodID = first[0];
    const totals = new Array(first.length - 1).fill(0);

    for (const info of infos) {
      const parts = info.split(",");
      for (let i = 1; i < parts.length; i++) {
        totals[i - 1] += parseFloat(parts[i]) || 0;
      }
    }

    return `${foodID},${totals.map((e) => e.toFixed(0)).join(",")}`;
  }

  // 🔹 Update food info in Firestore
  async updateFoodInfo(foodCalculatedStringNew, foodIdResId, type) {
    try {
      const firebaseMethods = new FirebaseFoodInfoCalculatedMethods();
      const foodIdResService = new FoodIdResIdServiceMethod();

      const foodId = foodCalculatedStringNew.split(",")[0];
      const foodCalculatedStringNewComplete = this.sumSelectedCalculatedFood(
        "",
        foodCalculatedStringNew,
        { type }
      );

      const restaurantIdentification = foodIdResService.getResIdFromFoodId(
        foodIdResId.foodIdResIdItem,
        foodId
      );

      const restaurantCalculated =
        await firebaseMethods.getRestaurant(restaurantIdentification);

      if (
        restaurantCalculated.restaurantIdentification &&
        restaurantCalculated.restaurantIdentification.includes("Error")
      ) {
        const newRestaurant = new FoodInfoCalculatedModel({
          restaurantIdentification,
          restaurantInfoCalculated: "",
          menuCalculated: [foodCalculatedStringNewComplete],
        });
        return await firebaseMethods.addRestaurant(newRestaurant);
      } else {
        const foodCalculatedStringFromDB =
          firebaseMethods.findStringContainingSubstring(
            foodId,
            restaurantCalculated.menuCalculated
          );

        if (!foodCalculatedStringFromDB) {
          await firebaseMethods.addMenuItem(
            restaurantIdentification,
            foodCalculatedStringNewComplete
          );
        } else {
          const combinedString = this.sumcompletcalculatedFood([
            foodCalculatedStringFromDB,
            foodCalculatedStringNewComplete,
          ]);
          return await firebaseMethods.updateMenuItem(
            restaurantIdentification,
            foodCalculatedStringFromDB,
            combinedString
          );
        }
      }
    } catch (e) {
      return `Error: ${e.message}`;
    }
  }

  // 🔹 Update restaurant info in Firestore
  async updateResInfo(resCalculatedStringNew, type) {
    try {
      const firebaseMethods = new FirebaseFoodInfoCalculatedMethods();

      const restaurantIdentification = resCalculatedStringNew.split(",")[0];
      const resCalculatedStringNewComplete = this.sumSelectedFieldsRes(
        "",
        resCalculatedStringNew,
        { type }
      );

      const restaurantCalculated = await firebaseMethods.getRestaurant(
        restaurantIdentification
      );

      if (
        restaurantCalculated.restaurantIdentification &&
        restaurantCalculated.restaurantIdentification.includes("Error")
      ) {
        const newRestaurant = new FoodInfoCalculatedModel({
          restaurantIdentification,
          restaurantInfoCalculated: resCalculatedStringNewComplete,
          menuCalculated: [""],
        });
        return await firebaseMethods.addRestaurant(newRestaurant);
      } else {
        const combinedString = this.sumcompletcalculatedFood([
          restaurantCalculated.restaurantInfoCalculated,
          resCalculatedStringNewComplete,
        ]);

        return await firebaseMethods.updateRestaurantInfoCalculated(
          restaurantIdentification,
          combinedString
        );
      }
    } catch (e) {
      return `Error: ${e.message}`;
    }
  }
}
