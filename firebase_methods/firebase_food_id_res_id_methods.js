import { db } from "../firebaseConfig.js";
import admin from "firebase-admin"; // for FieldValue
import { CollectionName } from "../key_words/collection_name.js";


/**
 * Represents the FoodIdResId model
 */
export class FoodIdResIdModel {
  constructor(foodIdResIdItem = []) {
    this.foodIdResIdItem = foodIdResIdItem;
  }

  toMap() {
    return {
      foodIdResIdItem: this.foodIdResIdItem,
    };
  }

  static fromMap(map) {
    return new FoodIdResIdModel(map.foodIdResIdItem || []);
  }
}

/**
 * Firebase methods for FoodIdResId collection
 */
export class FirebaseFoodIdResIdMethods {
  /**
   * Fetch the FoodIdResId document from Firestore
   */
  async getFoodIdResIdDetail() {
    try {
      const snap = await db
        .collection(CollectionName.foodIdResId)
        .doc(CollectionName.foodIdResId)
        .get();

      if (!snap.exists) return new FoodIdResIdModel([""]);

      const data = snap.data();
      const model = FoodIdResIdModel.fromMap(data);

      // Remove empty strings
      model.foodIdResIdItem = model.foodIdResIdItem.filter(
        (item) => item && item.trim() !== ""
      );

      return model;
    } catch (e) {
      console.error("Error fetching FoodIdResId:", e.message);
      return new FoodIdResIdModel([""]);
    }
  }

  /**
   * Create a new FoodIdResId document
   */
  async createFoodIdResId(foodIdResIdData) {
    try {
      await db
        .collection(CollectionName.foodIdResId)
        .doc(CollectionName.foodIdResId)
        .set(foodIdResIdData.toMap());
      return "success";
    } catch (err) {
      console.error("Error creating FoodIdResId:", err.message);
      return `Error: ${err.message}`;
    }
  }

  /**
   * Add a new item to the FoodIdResId document
   */
  async addFoodIdResId(info) {
    try {
      await db
        .collection(CollectionName.foodIdResId)
        .doc(CollectionName.foodIdResId)
        .update({
          foodIdResIdItem: admin.firestore.FieldValue.arrayUnion(info),
        });
      return "success";
    } catch (err) {
      console.error("Error adding FoodIdResId item:", err.message);
      return `Error: ${err.message}`;
    }
  }
}
