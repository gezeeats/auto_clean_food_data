import { db } from "../firebaseConfig.js";
import admin from "firebase-admin"; // for FieldValue
import { CollectionName } from "../key words/collection_name.js";
import { FoodInfoModel } from "../models/food_info_model.js";
import { format } from "date-fns";

// const db = admin.firestore();

const getCurrentDateAndTime = () => format(new Date(), "yyyy-MM-dd HH:mm:ss");

export class FirebaseFoodInfoMethods {
  async addView(foodId, userId) {
    const date = getCurrentDateAndTime();
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoTemp)
        .update({
          foodViewData: admin.firestore.FieldValue.arrayUnion(`${foodId},${userId},${date}`),
        });
      return "success";
    } catch (err) {
      return err.message || "Some error has occurred";
    }
  }

  async addViewBackUp(viewDataList) {
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfo)
        .update({
          foodViewData: admin.firestore.FieldValue.arrayUnion(...viewDataList),
        });
      return "success";
    } catch (err) {
      return err.message || "Some error has occurred";
    }
  }

  async addRestaurantView(foodId, userId) {
    const date = getCurrentDateAndTime();
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoTemp)
        .update({
          restaurantViewData: admin.firestore.FieldValue.arrayUnion(`${foodId},${userId},${date}`),
        });
      return "success";
    } catch (err) {
      return err.message || "Some error has occurred";
    }
  }

  async addRestaurantViewBackUp(resViewDataList) {
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfo)
        .update({
          restaurantViewData: admin.firestore.FieldValue.arrayUnion(...resViewDataList),
        });
      return "success";
    } catch (err) {
      return err.message || "Some error has occurred";
    }
  }

  async addSale(foodId, userId, amount) {
    const date = getCurrentDateAndTime();
    const finalData = `${foodId},${userId},${amount},${date}`;
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoTemp)
        .update({
          foodSaleData: admin.firestore.FieldValue.arrayUnion(finalData),
        });
      return "success";
    } catch (err) {
      return err.message || "Some error has occurred";
    }
  }

  async addSaleBackUp(saleDataList) {
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfo)
        .update({
          foodSaleData: admin.firestore.FieldValue.arrayUnion(...saleDataList),
        });
      return "success";
    } catch (err) {
      return err.message || "Some error has occurred";
    }
  }

  async addFavorite(foodId, userId, isAdd) {
    const date = getCurrentDateAndTime();
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoTemp)
        .update({
          foodFavoriteData: admin.firestore.FieldValue.arrayUnion(
            `${foodId},${userId},${date},${isAdd}`
          ),
        });
      return "success";
    } catch (err) {
      return err.message || "Some error has occurred";
    }
  }

  async addFavoriteBackUp(favDataList) {
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfo)
        .update({
          foodFavoriteData: admin.firestore.FieldValue.arrayUnion(...favDataList),
        });
      return "success";
    } catch (err) {
      return err.message || "Some error has occurred";
    }
  }

  async addRestaurantFavorite(foodId, userId, isAdd) {
    const date = getCurrentDateAndTime();
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoTemp)
        .update({
          restaurantFavoriteData: admin.firestore.FieldValue.arrayUnion(
            `${foodId},${userId},${date},${isAdd}`
          ),
        });
      return "success";
    } catch (err) {
      return err.message || "Some error has occurred";
    }
  }

  async addRestaurantFavoriteBackUp(resFavDataList) {
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfo)
        .update({
          restaurantFavoriteData: admin.firestore.FieldValue.arrayUnion(...resFavDataList),
        });
      return "success";
    } catch (err) {
      return err.message || "Some error has occurred";
    }
  }

  async addCart(foodId, userId, isAdd) {
    const date = getCurrentDateAndTime();
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoTemp)
        .update({
          foodCartData: admin.firestore.FieldValue.arrayUnion(
            `${foodId},${userId},${date},${isAdd}`
          ),
        });
      return "success";
    } catch (err) {
      return err.message || "Some error has occurred";
    }
  }

  async addCartBackUp(cartDataList) {
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfo)
        .update({
          foodCartData: admin.firestore.FieldValue.arrayUnion(...cartDataList),
        });
      return "success";
    } catch (err) {
      return err.message || "Some error has occurred";
    }
  }

  async getFoodInfoDetail() {
    try {
      const snap = await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfo)
        .get();
      const data = snap.data();
      return new FoodInfoModel(data);
    } catch (err) {
      return new FoodInfoModel();
    }
  }

  async getFoodInfoTempDetail() {
    try {
      const snap = await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoTemp)
        .get();
      const data = snap.data();
      return new FoodInfoModel(data);
    } catch (err) {
      return new FoodInfoModel();
    }
  }

  async createFoodInfo(foodInfoData) {
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoTemp)
        .set(foodInfoData.toMap());
      return "success";
    } catch (err) {
      return err.message || "Some error has occurred";
    }
  }
  async createFoodInfo(foodInfoData) {
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoTemp)
        .set(foodInfoData.toMap());
      return "success";
    } catch (err) {
      return err.message || "Some error has occurred";
    }
  }

  async createFoodInfoBackUp(foodInfoData) {
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfo)
        .set(foodInfoData.toMap());
      return "success";
    } catch (err) {
      return err.message || "Some error has occurred";
    }
  }

  async clearField(docName, field) {
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(docName)
        .update({ [field]: [""] });
      return "success";
    } catch (err) {
      return err.message || "Some error has occurred";
    }
  }

  // Specific Clear Methods
  clearFoodViewData() { return this.clearField(CollectionName.foodInfoTemp, "foodViewData"); }
  clearResViewData() { return this.clearField(CollectionName.foodInfoTemp, "restaurantViewData"); }
  clearSaleData() { return this.clearField(CollectionName.foodInfoTemp, "foodSaleData"); }
  clearFoodFavData() { return this.clearField(CollectionName.foodInfoTemp, "foodFavoriteData"); }
  clearResFavData() { return this.clearField(CollectionName.foodInfoTemp, "restaurantFavoriteData"); }
  clearCartData() { return this.clearField(CollectionName.foodInfoTemp, "foodCartData"); }
}
