
import { db } from "../firebaseConfig.js";
import { FieldValue } from "firebase-admin/firestore";
import { CollectionName } from "../key_words/collection_name.js";
import { FoodInfoModel } from "../models/food_info_model.js";
import { StringConstants } from "../utils/string_constant.js";


export class FirebaseFoodInfoMethods {
  // Add data to an array in the temporary document.
  async _addArrayData(field, finalData) {
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoTemp)
        .update({
          [field]: FieldValue.arrayUnion(...finalData),
        });


      return StringConstants.success;
    } catch (err) {
      return err.toString();
    }
  }

  // Clear an array in the temporary document.
  async _clearArrayData(field) {
    try {          
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoTemp)
        .update({
          [field]: [""],
        });
      return StringConstants.success;
    } catch (err) {
      console.log(err.toString());
      return err.toString();
    }
  }

  // Food views
  async addFoodView(finalData) {
    return await this._addArrayData("foodViewData", finalData);
  }

  async addFoodViewBackUp(viewDataList) {
    return await db
      .collection(CollectionName.foodInfo)
      .doc(CollectionName.foodInfo)
      .update({
        foodViewData: FieldValue.arrayUnion(...viewDataList),
      })
      .then(() => {

        return StringConstants.success;
      })
      .catch((err) => err.toString());
  }

  async clearFoodViewData() {
    return await this._clearArrayData("foodViewData");
  }

  // Restaurant views
  async addResView(finalData) {
    return await this._addArrayData("restaurantViewData", finalData);
  }

  async caddResViewBackUp(resViewDataList) {
    return await this._addBackupArrayData(
      "restaurantViewData",
      resViewDataList,
    );
  }

  async clearResViewData() {
    return await this._clearArrayData("restaurantViewData");
  }

  // Sales
  async addSale(finalData) {
    return await this._addArrayData("foodSaleData", finalData);
  }

  async addSaleBackUp(saleDataList) {
    return await this._addBackupArrayData("foodSaleData", saleDataList);
  }

  async clearSaleData() {
    return await this._clearArrayData("foodSaleData");
  }

  // Food liked
  async addFoodLiked(finalData) {
    return await this._addArrayData("foodLiked", finalData);
  }

  async addFoodLikedBackUp(saleDataList) {
    return await this._addBackupArrayData("foodLiked", saleDataList);
  }

  async clearFoodLikedData() {
    return await this._clearArrayData("foodLiked");
  }

  // Food unliked
  async addFoodUnliked(finalData) {
    return await this._addArrayData("foodUnliked", finalData);
  }

  async addFoodUnlikedBackUp(saleDataList) {
    return await this._addBackupArrayData("foodUnliked", saleDataList);
  }

  async clearFoodUnlikedData() {
    return await this._clearArrayData("foodUnliked");
  }

  // Food favorites
  async addFoodFav(finalData) {
    return await this._addArrayData("foodFavoriteData", finalData);
  }

  async addFoodFavBackUp(favDataList) {
    return await this._addBackupArrayData("foodFavoriteData", favDataList);
  }

  async clearFoodFavData() {
    return await this._clearArrayData("foodFavoriteData");
  }

  // Food unfavorites
  async addFoodUnFav(finalData) {
    return await this._addArrayData("foodUnFavoriteData", finalData);
  }

  async addFoodUnFavBackUp(favDataList) {
    return await this._addBackupArrayData("foodUnFavoriteData", favDataList);
  }

  async clearFoodUnFavData() {
    return await this._clearArrayData("foodUnFavoriteData");
  }

  // Restaurant favorites
  async addResFav(finalData) {
    return await this._addArrayData("restaurantFavoriteData", finalData);
  }

  async addResFavBackUp(resFavDataList) {
    return await this._addBackupArrayData(
      "restaurantFavoriteData",
      resFavDataList,
    );
  }

  async clearResFavData() {
    return await this._clearArrayData("restaurantFavoriteData");
  }

  // Restaurant unfavorites
  async addResUnFav(finalData) {
    return await this._addArrayData("restaurantUnFavoriteData", finalData);
  }

  async addResUnFavBackUp(resFavDataList) {
    return await this._addBackupArrayData(
      "restaurantUnFavoriteData",
      resFavDataList,
    );
  }

  async clearResUnFavData() {
    return await this._clearArrayData("restaurantUnFavoriteData");
  }

  // Cart
  async addCart(finalData) {
    return await this._addArrayData("foodCartData", finalData);
  }

  async addCartBackUp(cartDataList) {
    return await this._addBackupArrayData("foodCartData", cartDataList);
  }

  async clearCartData() {
    return await this._clearArrayData("foodCartData");
  }

  // Uncart
  async addUnCart(finalData) {
    return await this._addArrayData("foodUnCartData", finalData);
  }

  async addUnCartBackUp(cartDataList) {
    return await this._addBackupArrayData("foodUnCartData", cartDataList);
  }

  async clearUnCartData() {
    return await this._clearArrayData("foodUnCartData");
  }

  // Add data to the main document.
  async _addBackupArrayData(field, data) {
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfo)
        .update({
          [field]: FieldValue.arrayUnion(...data),
        });


      return StringConstants.success;
    } catch (err) {
      return err.toString();
    }
  }

  // Read main document
  async getFoodInfoDetail() {
    try {
      const snap = await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfo)
        .get();


      return snap.exists
        ? FoodInfoModel.fromMap(snap.data())
        : new FoodInfoModel();
    } catch (err) {
      console.error("getFoodInfoDetail error:", err.message ?? String(err));
      return new FoodInfoModel();
    }
  }

  // Read temporary document
  async getFoodInfoTempDetail() {
    try {
      const snap = await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoTemp)
        .get();

   

      return snap.exists
        ? FoodInfoModel.fromMap(snap.data())
        : new FoodInfoModel();
    } catch (err) {
      console.error(
        "getFoodInfoTempDetail error:",
        err.message ?? String(err),
      );
      return new FoodInfoModel();
    }
  }

  // Create temporary document
  async createFoodInfo(foodInfoData) {
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfoTemp)
        .set(foodInfoData.toMap());

      
      return StringConstants.success;
    } catch (err) {
      return err.toString();
    }
  }

  // Create main document
  async createFoodInfoBackUp(foodInfoData) {
    try {
      await db
        .collection(CollectionName.foodInfo)
        .doc(CollectionName.foodInfo)
        .set(foodInfoData.toMap());

    
      return StringConstants.success;
    } catch (err) {
      return err.toString();
    }
  }
}
