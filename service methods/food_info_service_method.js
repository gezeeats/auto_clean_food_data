import { FirebaseFoodInfoMethods } from "../firebase methods/firebase_food_info_methods.js";
import { FoodInfoCalculatedServiceMethod } from "./food_info_calculated_service_method.js";
import { CollectionName } from "../key words/collection_name.js";
import {
  countFoodSales,
  countFoodFavoriteOrCartOccurrences,
  countFoodOccurrencesWithTimeCondition,
} from "../utils/recommandation_method.js";

export class FoodInfoServiceMethod {
  constructor() {
    this.firebaseMethods = new FirebaseFoodInfoMethods();
    this.calculatedService = new FoodInfoCalculatedServiceMethod();
  }

  async addView(foodId, userId) {
    return await this.firebaseMethods.addView(foodId, userId);
  }

  async addRestaurantView(foodId, userId) {
    return await this.firebaseMethods.addRestaurantView(foodId, userId);
  }

  async addSale(foodId, userId, amount) {
    return await this.firebaseMethods.addSale(foodId, userId, amount);
  }

  async addFavorite(foodId, userId, isAdd) {
    return await this.firebaseMethods.addFavorite(foodId, userId, isAdd);
  }

  async addRestaurantFavorite(foodId, userId, isAdd) {
    return await this.firebaseMethods.addRestaurantFavorite(foodId, userId, isAdd);
  }

  async addCart(foodId, userId, isAdd) {
    return await this.firebaseMethods.addCart(foodId, userId, isAdd);
  }

  async getFoodInfoDetail() {
    return await this.firebaseMethods.getFoodInfoDetail();
  }

  async getFoodInfoTempDetail() {
    return await this.firebaseMethods.getFoodInfoTempDetail();
  }

  async getDocumetntIdFromID(foodInfoData, id) {
    const findMatch = (dataList) =>
      dataList.find((item) => item.includes(id)) || "";

    const foodViewFound = findMatch(foodInfoData.foodViewData);
    const foodSalesFound = findMatch(foodInfoData.foodSaleData);
    const foodFavoriteFound = findMatch(foodInfoData.foodFavoriteData);
    const foodCartFound = findMatch(foodInfoData.foodCartData);

    return [foodViewFound, foodSalesFound, foodFavoriteFound, foodCartFound];
  }

  async createDocumetntId(foodInfoData) {
    return await this.firebaseMethods.createFoodInfo(foodInfoData);
  }

  async cleanFoodCartData(foodInfoDataTemp, foodIdResId) {
    try {
      const results = countFoodFavoriteOrCartOccurrences(foodInfoDataTemp.foodCartData);
      for (const result of results) {
        await this.calculatedService.updateFoodInfo(result, foodIdResId, CollectionName.typeCart);
      }
      await this.firebaseMethods.clearCartData();
      await this.firebaseMethods.addCartBackUp(foodInfoDataTemp.foodCartData);
      return "success";
    } catch (err) {
      return err.toString();
    }
  }

  async cleanFoodViewData(foodInfoDataTemp, foodIdResId, minGapForCounting = 5) {
    try {
      const results = countFoodOccurrencesWithTimeCondition(
        foodInfoDataTemp.foodViewData,
        minGapForCounting
      );
      for (const result of results) {
        await this.calculatedService.updateFoodInfo(result, foodIdResId, CollectionName.typeFoodView);
      }
      await this.firebaseMethods.clearFoodViewData();
      await this.firebaseMethods.addViewBackUp(foodInfoDataTemp.foodViewData);
      return "success";
    } catch (err) {
      return err.toString();
    }
  }

  async cleanFoodSaleData(foodInfoDataTemp, foodIdResId) {
    try {
      const results = countFoodSales(foodInfoDataTemp.foodSaleData);
      for (const result of results) {
        await this.calculatedService.updateFoodInfo(result, foodIdResId, CollectionName.typeSale);
      }
      await this.firebaseMethods.clearSaleData();
      await this.firebaseMethods.addSaleBackUp(foodInfoDataTemp.foodSaleData);
      return "success";
    } catch (err) {
      return err.toString();
    }
  }

  async cleanFoodFavData(foodInfoDataTemp, foodIdResId) {
    try {
      const results = countFoodFavoriteOrCartOccurrences(foodInfoDataTemp.foodFavoriteData);
      for (const result of results) {
        await this.calculatedService.updateFoodInfo(result, foodIdResId, CollectionName.typeFav);
      }
      await this.firebaseMethods.clearFoodFavData();
      await this.firebaseMethods.addFavoriteBackUp(foodInfoDataTemp.foodFavoriteData);
      return "success";
    } catch (err) {
      return err.toString();
    }
  }

  async cleanResFavData(foodInfoDataTemp) {
    try {
      const results = countFoodFavoriteOrCartOccurrences(foodInfoDataTemp.restaurantFavoriteData);
      for (const result of results) {
        await this.calculatedService.updateResInfo(result, CollectionName.typeFav);
      }
      await this.firebaseMethods.clearResFavData();
      await this.firebaseMethods.addRestaurantFavoriteBackUp(foodInfoDataTemp.restaurantFavoriteData);
      return "success";
    } catch (err) {
      return err.toString();
    }
  }

  async cleanResViewData(foodInfoDataTemp, minGapForCounting = 5) {
    try {
      const results = countFoodOccurrencesWithTimeCondition(
        foodInfoDataTemp.restaurantViewData,
        minGapForCounting
      );
      for (const result of results) {
        await this.calculatedService.updateResInfo(result, CollectionName.typeResView);
      }
      await this.firebaseMethods.clearResViewData();
      await this.firebaseMethods.addRestaurantViewBackUp(foodInfoDataTemp.restaurantViewData);
      return "success";
    } catch (err) {
      return err.toString();
    }
  }

  async cleanAllData(foodInfoDataTemp, foodIdResId, minGapForCounting = 5) {
    try {
      await this.cleanFoodCartData(foodInfoDataTemp, foodIdResId);
      await this.cleanFoodViewData(foodInfoDataTemp, foodIdResId, minGapForCounting);
      await this.cleanFoodSaleData(foodInfoDataTemp, foodIdResId);
      await this.cleanFoodFavData(foodInfoDataTemp, foodIdResId);
      await this.cleanResFavData(foodInfoDataTemp);
      await this.cleanResViewData(foodInfoDataTemp, minGapForCounting);
      return "success";
    } catch (err) {
      return err.toString();
    }
  }
}
