import { db } from "../firebaseConfig.js";
import admin from "firebase-admin"; // for FieldValue
import { CollectionName } from "../key_words/collection_name.js";

export class FirebaseFoodInfoCalculatedMethods {
  // Add restaurant
  async addRestaurant(foodInfoCalculated) {
    let res = "Some error has occured";
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoCalculated)
        .collection(CollectionName.restaurants)
        .doc(foodInfoCalculated.restaurantIdentification)
        .set({
          menuCalculated: foodInfoCalculated.menuCalculated,
          restaurantIdentification: foodInfoCalculated.restaurantIdentification,
          restaurantInfoCalculated: foodInfoCalculated.restaurantInfoCalculated,
        });
      res = "success";
    } catch (err) {
      res = err.toString();
    }
    return res;
  }

  // Delete restaurant
  async deleteRestaurant(restaurantIdentification) {
    let res = "Some error has occured";
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoCalculated)
        .collection(CollectionName.restaurants)
        .doc(restaurantIdentification)
        .delete();
      res = "success";
    } catch (err) {
      res = err.toString();
    }
    return res;
  }

  // Update restaurant
  async updateRestaurant(foodInfoCalculated) {
    let res = "Some error has occured";
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoCalculated)
        .collection(CollectionName.restaurants)
        .doc(foodInfoCalculated.restaurantIdentification)
        .update({
          menuCalculated: foodInfoCalculated.menuCalculated,
          restaurantIdentification: foodInfoCalculated.restaurantIdentification,
          restaurantInfoCalculated: foodInfoCalculated.restaurantInfoCalculated,
        });
      res = "success";
    } catch (err) {
      res = err.toString();
    }
    return res;
  }

  // Update restaurant info only
  async updateRestaurantInfoCalculated(restaurantIdentification, restaurantInfoCalculated) {
    let res = "Some error has occurred";
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoCalculated)
        .collection(CollectionName.restaurants)
        .doc(restaurantIdentification)
        .update({
          restaurantInfoCalculated: restaurantInfoCalculated,
        });
      res = "success";
    } catch (err) {
      res = err.toString();
    }
    return res;
  }

  // Get restaurant by ID
  async getRestaurant(restaurantIdentification) {
    try {
      const snapshot = await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoCalculated)
        .collection(CollectionName.restaurants)
        .doc(restaurantIdentification)
        .get();

      if (snapshot.exists && snapshot.data()) {
        return snapshot.data();
      } else {
        return {
          restaurantIdentification: "Error: Restaurant not found",
          menuCalculated: [""],
          restaurantInfoCalculated: "",
        };
      }
    } catch (e) {
      return {
        restaurantIdentification: `Error: ${e.toString()}`,
        menuCalculated: [""],
        restaurantInfoCalculated: "",
      };
    }
  }

  // Get all restaurants
  async getAllRestaurants() {
    try {
      const snapshot = await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoCalculated)
        .collection(CollectionName.restaurants)
        .get();

      return snapshot.docs.map((doc) => doc.data());
    } catch (e) {
      return [
        {
          restaurantIdentification: `Error: ${e.toString()}`,
          menuCalculated: [""],
          restaurantInfoCalculated: "",
        },
      ];
    }
  }

  // Add menu item
  async addMenuItem(restaurantId, menuItem) {
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoCalculated)
        .collection(CollectionName.restaurants)
        .doc(restaurantId)
        .update({
          menuCalculated: admin.firestore.FieldValue.arrayUnion(menuItem),
        });
      return "success";
    } catch (e) {
      return `Error: ${e.toString()}`;
    }
  }

  // Remove menu item
  async removeMenuItem(restaurantId, menuItem) {
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoCalculated)
        .collection(CollectionName.restaurants)
        .doc(restaurantId)
        .update({
          menuCalculated: admin.firestore.FieldValue.arrayRemove(menuItem),
        });
      return "success";
    } catch (e) {
      return `Error: ${e.toString()}`;
    }
  }

  // Update menu item
  async updateMenuItem(restaurantId, oldItem, newItem) {
    try {
      const snapshot = await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoCalculated)
        .collection(CollectionName.restaurants)
        .doc(restaurantId)
        .get();

      if (!snapshot.exists || !snapshot.data()) return "Restaurant not found";

      const menu = snapshot.data().menuCalculated || [];
      const index = menu.indexOf(oldItem);
      if (index === -1) return "Item not found";

      menu[index] = newItem;

      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoCalculated)
        .collection(CollectionName.restaurants)
        .doc(restaurantId)
        .update({ menuCalculated: menu });

      return "success";
    } catch (e) {
      return `Error: ${e.toString()}`;
    }
  }

  // Utilities
  addFoodInfoStrings(a, b) {
    const partsA = a.split(",");
    const partsB = b.split(",");

    const numsA = partsA.slice(1).map(Number);
    const numsB = partsB.slice(1).map(Number);

    while (numsA.length < numsB.length) numsA.push(0);
    while (numsB.length < numsA.length) numsB.push(0);

    const summed = numsA.map((val, i) => val + numsB[i]);
    return `${partsA[0]},${summed.join(",")}`;
  }

  findStringContainingSubstring(text, list) {
    for (const item of list) {
      if (item.includes(text)) return item;
    }
    return "";
  }
}
