

import { FirebaseFoodIdResIdMethods } from "../firebase methods/firebase_food_id_res_id_methods.js";
import { FoodIdResIdModel } from "../models/food_id_res_id_model.js";

export class FoodIdResIdServiceMethod {
  constructor() {
    this.firebaseMethods = new FirebaseFoodIdResIdMethods();
  }

  // Add a new foodId-resId pair
  async addFoodIdResId(foodId, resId) {
    try {
      const res = await this.firebaseMethods.addFoodIdResId(`${foodId},${resId}`);
      return res;
    } catch (error) {
      return error.message || "Some error has occurred";
    }
  }

  // Get all pairs (foodId, resId)
  async getFoodIdResIdDetail() {
    try {
      return await this.firebaseMethods.getFoodIdResIdDetail();
    } catch (error) {
      console.error("Error getting FoodIdResIdDetail:", error);
      return new FoodIdResIdModel();
    }
  }

  // Create a new document in Firestore
  async createFoodIdResId(foodIdResIdData) {
    try {
      return await this.firebaseMethods.createFoodIdResId(foodIdResIdData);
    } catch (error) {
      return error.message || "Some error has occurred";
    }
  }

  // Given a foodId, return resId
  getResIdFromFoodId(pairs, foodId) {
    for (const pair of pairs) {
      const parts = pair.split(",");
      if (parts.length !== 2) continue;
      if (parts[0] === foodId) return parts[1];
    }
    return "";
  }

  // Given a resId, return foodId
  getFoodIdFromResId(pairs, resId) {
    for (const pair of pairs) {
      const parts = pair.split(",");
      if (parts.length !== 2) continue;
      if (parts[1] === resId) return parts[0];
    }
    return "";
  }
}
