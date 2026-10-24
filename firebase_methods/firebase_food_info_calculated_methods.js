
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { db } from "../firebaseConfig.js";
import { FoodInfoCalculatedModel } from "../models/food_info_calculated_model.js";
import { CollectionName } from "../key_words/collection_name.js";
import { StringConstants } from "../utils/string_constant.js";


function getRestaurantPath(firestore, restaurantId) {
  return firestore
    .collection(CollectionName.foodInfo)
    .doc(CollectionName.foodInfoCalculated)
    .collection(CollectionName.restaurants)
    .doc(restaurantId);
}

function makeErrorModel(message) {
  return new FoodInfoCalculatedModel({
    restaurantIdentification: `Error: ${message}`,
    restaurantInfoCalculated: "",
    menuCalculated: [""],
  });
}

export class FirebaseFoodInfoCalculatedMethods {
  // constructor(databaseConfigData) {
    //   this.isMainDB = true;
  constructor() {
    this._db = db;}

  //   // try {
  //   //   const documentLocation =
  //   //     databaseConfigData?.foodInfoCalculated ?? "";

  //   //   if (documentLocation !== "") {
  //   //     this._db = getFirestore(undefined, documentLocation);
  //   //     this.isMainDB = false;
  //   //   }
  //   // } catch (error) {
  //   //   console.error("Firestore database selection failed:", error);
  //   //   this._db = db;
  //   //   this.isMainDB = true;
  //   // }
  // }

  // Write to the configured database and mirror to the default database
  // when the configured database is not the main database.
  async addRestaurant(foodInfoCalculated) {
    try {
      const data = {
        menuCalculated: foodInfoCalculated.menuCalculated,
        restaurantIdentification:
          foodInfoCalculated.restaurantIdentification,
        restaurantInfoCalculated:
          foodInfoCalculated.restaurantInfoCalculated,
      };

      await getRestaurantPath(
        this._db,
        foodInfoCalculated.restaurantIdentification,
      ).set(data);

      return StringConstants.success;
    } catch (error) {
      return String(error);
    }
  }

  async deleteRestaurant(restaurantIdentification) {
    try {
      await getRestaurantPath(
        this._db,
        restaurantIdentification,
      ).delete();
      return StringConstants.success;
    } catch (error) {
      return String(error);
    }
  }

  async updateRestaurant(foodInfoCalculated) {
    try {
      const data = {
        menuCalculated: foodInfoCalculated.menuCalculated,
        restaurantIdentification:
          foodInfoCalculated.restaurantIdentification,
        restaurantInfoCalculated:
          foodInfoCalculated.restaurantInfoCalculated,
      };

      await getRestaurantPath(
        this._db,
        foodInfoCalculated.restaurantIdentification,
      ).update(data);
      return StringConstants.success;
    } catch (error) {
      return String(error);
    }
  }

  async updateRestaurantInfoCalculated(
    restaurantIdentification,
    restaurantInfoCalculated,
  ) {
    try {
      const data = { restaurantInfoCalculated };

      await getRestaurantPath(
        this._db,
        restaurantIdentification,
      ).update(data);
      return StringConstants.success;
    } catch (error) {
      return String(error);
    }
  }

  async getRestaurant(restaurantId, combinedAppData) {
    try {
      console.log(`📡 Firestore fetch: ${restaurantId}`);
      const snapshot = await getRestaurantPath(
        this._db,
        restaurantId,
      ).get();

      if (!snapshot.exists || snapshot.data() == null) {
        return new FoodInfoCalculatedModel({
          restaurantIdentification: "Error: Not Found",
          menuCalculated: [""],
          restaurantInfoCalculated: "",
        });
      }

      const data = snapshot.data();
      const model = FoodInfoCalculatedModel.fromMap(data);
      return model;
    } catch (error) {
      return makeErrorModel(error.message ?? String(error));
    }
  }

  async getRestaurantRealTime(restaurantId, combinedAppData) {
    try {
      const snapshot = await getRestaurantPath(
        this._db,
        restaurantId,
      ).get();


      if (!snapshot.exists || snapshot.data() == null) {
        return new FoodInfoCalculatedModel({
          restaurantIdentification: StringConstants.thisDataNotFound,
          menuCalculated: [""],
          restaurantInfoCalculated: "",
        });
      }
      const model = FoodInfoCalculatedModel.fromMap(snapshot.data());
      return model;
    } catch (error) {
      return makeErrorModel(error.message ?? String(error));
    }
  }

  async getAllRestaurants(appData) {
    try {
      console.log("📡 Firestore list fetch");
      const snapshot = await this._db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoCalculated)
        .collection(CollectionName.restaurants)
        .get();
      const list = snapshot.docs.map((doc) =>
        FoodInfoCalculatedModel.fromMap(doc.data()),
      );
      return list;
    } catch (error) {
      return [makeErrorModel(error.message ?? String(error))];
    }
  }

  async addMenuItem(restaurantId, menuItem) {
    try {
      await getRestaurantPath(this._db, restaurantId).update({
        menuCalculated: FieldValue.arrayUnion(menuItem),
      });

      return StringConstants.success;
    } catch (error) {
      return `Error: ${error}`;
    }
  }

  async removeMenuItem(restaurantId, menuItem) {
    try {
      await getRestaurantPath(this._db, restaurantId).update({
        menuCalculated: FieldValue.arrayRemove(menuItem),
      });

      return StringConstants.success;
    } catch (error) {
      return `Error: ${error}`;
    }
  }

  async updateMenuItem(restaurantId, oldItem, newItem) {
    try {
      // Preserves the original Dart implementation: read from the default DB.
      const snapshot = await getRestaurantPath(db, restaurantId).get();

      if (!snapshot.exists || snapshot.data() == null) {
        return "Restaurant not found";
      }

      const menu = [...(snapshot.data().menuCalculated ?? [])];
      const index = menu.indexOf(oldItem);

      if (index === -1) return "Item not found";

      menu[index] = newItem;

      await getRestaurantPath(this._db, restaurantId).update({
        menuCalculated: menu,
      });

      return StringConstants.success;
    } catch (error) {
      return `Error: ${error}`;
    }
  }

  addFoodInfoStrings(a, b) {
    const partsA = a.split(",");
    const partsB = b.split(",");

    const parseInteger = (value) => {
      if (!/^[+-]?\d+$/.test(value.trim())) {
        throw new Error(`Invalid integer: ${value}`);
      }
      return Number.parseInt(value, 10);
    };

    const numsA = partsA.slice(1).map(parseInteger);
    const numsB = partsB.slice(1).map(parseInteger);

    const length = Math.max(numsA.length, numsB.length);

    while (numsA.length < length) numsA.push(0);
    while (numsB.length < length) numsB.push(0);

    const summed = numsA.map((value, index) => value + numsB[index]);

    return `${partsA[0]},${summed.join(",")}`;
  }

  findStringContainingSubstring(text, list) {
    for (const item of list) {
      if (item.includes(text)) return item;
    }

    return "";
  }
}
