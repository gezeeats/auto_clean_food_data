import { FirebaseFoodInfoMethods } from "../firebase_methods/firebase_food_info_methods.js";

export class FoodInfoServiceMethod {
  constructor() {
    this.firebaseMethods = new FirebaseFoodInfoMethods();
  }

  async getFoodInfoDetail() {
    return await this.firebaseMethods.getFoodInfoDetail();
  }

  async getFoodInfoTempDetail() {
    return await this.firebaseMethods.getFoodInfoTempDetail();
  }

}
