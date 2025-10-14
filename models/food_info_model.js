// models/food_info_model.js

export class FoodInfoModel {
  constructor({
    foodViewData = [""],
    foodSaleData = [""],
    foodFavoriteData = [""],
    restaurantFavoriteData = [""],
    foodCartData = [""],
    restaurantViewData = [""],
  } = {}) {
    this.foodViewData = foodViewData;
    this.foodSaleData = foodSaleData;
    this.foodFavoriteData = foodFavoriteData;
    this.restaurantFavoriteData = restaurantFavoriteData;
    this.foodCartData = foodCartData;
    this.restaurantViewData = restaurantViewData;
  }

  copyWith({
    foodViewData,
    foodSaleData,
    foodFavoriteData,
    restaurantFavoriteData,
    foodCartData,
    restaurantViewData,
  } = {}) {
    return new FoodInfoModel({
      foodViewData: foodViewData ?? this.foodViewData,
      foodSaleData: foodSaleData ?? this.foodSaleData,
      foodFavoriteData: foodFavoriteData ?? this.foodFavoriteData,
      restaurantFavoriteData:
        restaurantFavoriteData ?? this.restaurantFavoriteData,
      foodCartData: foodCartData ?? this.foodCartData,
      restaurantViewData: restaurantViewData ?? this.restaurantViewData,
    });
  }

  toMap() {
    return {
      foodViewData: this.foodViewData,
      foodSaleData: this.foodSaleData,
      foodFavoriteData: this.foodFavoriteData,
      restaurantFavoriteData: this.restaurantFavoriteData,
      foodCartData: this.foodCartData,
      restaurantViewData: this.restaurantViewData,
    };
  }

  static fromMap(map) {
    if (!map) return new FoodInfoModel();
    return new FoodInfoModel({
      foodViewData: Array.isArray(map.foodViewData)
        ? map.foodViewData
        : [""],
      foodSaleData: Array.isArray(map.foodSaleData)
        ? map.foodSaleData
        : [""],
      foodFavoriteData: Array.isArray(map.foodFavoriteData)
        ? map.foodFavoriteData
        : [""],
      restaurantFavoriteData: Array.isArray(map.restaurantFavoriteData)
        ? map.restaurantFavoriteData
        : [""],
      foodCartData: Array.isArray(map.foodCartData)
        ? map.foodCartData
        : [""],
      restaurantViewData: Array.isArray(map.restaurantViewData)
        ? map.restaurantViewData
        : [""],
    });
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }

  static fromJson(source) {
    return FoodInfoModel.fromMap(JSON.parse(source));
  }

  toString() {
    return `FoodInfoModel(
      foodViewData: ${JSON.stringify(this.foodViewData)},
      foodSaleData: ${JSON.stringify(this.foodSaleData)},
      foodFavoriteData: ${JSON.stringify(this.foodFavoriteData)},
      restaurantFavoriteData: ${JSON.stringify(this.restaurantFavoriteData)},
      foodCartData: ${JSON.stringify(this.foodCartData)},
      restaurantViewData: ${JSON.stringify(this.restaurantViewData)}
    )`;
  }
}
