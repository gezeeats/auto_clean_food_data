// models/food_info_model.js

export class FoodInfoModel {
  constructor({
    foodViewData = [""],
    foodSaleData = [""],
    foodFavoriteData = [""],
    foodUnFavoriteData = [""],
    restaurantFavoriteData = [""],
    restaurantUnFavoriteData = [""],
    foodCartData = [""],
    foodUnCartData = [""],
    foodLiked = [""],
    foodUnliked = [""],
    restaurantViewData = [""],
  } = {}) {
    this.foodViewData = foodViewData;
    this.foodSaleData = foodSaleData;
    this.foodFavoriteData = foodFavoriteData;
    this.foodUnFavoriteData = foodUnFavoriteData;
    this.restaurantFavoriteData = restaurantFavoriteData;
    this.restaurantUnFavoriteData = restaurantUnFavoriteData;
    this.foodCartData = foodCartData;
    this.foodUnCartData = foodUnCartData;
    this.foodLiked = foodLiked;
    this.foodUnliked = foodUnliked;
    this.restaurantViewData = restaurantViewData;
  }

  copyWith({
    foodViewData,
    foodSaleData,
    foodFavoriteData,
    foodUnFavoriteData,
    restaurantFavoriteData,
    restaurantUnFavoriteData,
    foodCartData,
    foodUnCartData,
    foodLiked,
    foodUnliked,
    restaurantViewData,
  } = {}) {
    return new FoodInfoModel({
      foodViewData: foodViewData ?? this.foodViewData,
      foodSaleData: foodSaleData ?? this.foodSaleData,
      foodFavoriteData: foodFavoriteData ?? this.foodFavoriteData,
      foodUnFavoriteData: foodUnFavoriteData ?? this.foodUnFavoriteData,
      restaurantFavoriteData:
        restaurantFavoriteData ?? this.restaurantFavoriteData,
      restaurantUnFavoriteData:
        restaurantUnFavoriteData ?? this.restaurantUnFavoriteData,
      foodCartData: foodCartData ?? this.foodCartData,
      foodUnCartData: foodUnCartData ?? this.foodUnCartData,
      foodLiked: foodLiked ?? this.foodLiked,
      foodUnliked: foodUnliked ?? this.foodUnliked,
      restaurantViewData: restaurantViewData ?? this.restaurantViewData,
    });
  }

  toMap() {
    return {
      foodViewData: this.foodViewData,
      foodSaleData: this.foodSaleData,
      foodFavoriteData: this.foodFavoriteData,
      foodUnFavoriteData: this.foodUnFavoriteData,
      restaurantFavoriteData: this.restaurantFavoriteData,
      restaurantUnFavoriteData: this.restaurantUnFavoriteData,
      foodCartData: this.foodCartData,
      foodUnCartData: this.foodUnCartData,
      foodLiked: this.foodLiked,
      foodUnliked: this.foodUnliked,
      restaurantViewData: this.restaurantViewData,
    };
  }

  static fromMap(map) {
    return new FoodInfoModel({
      foodViewData: Array.isArray(map?.foodViewData)
        ? map.foodViewData
        : [""],
      foodSaleData: Array.isArray(map?.foodSaleData)
        ? map.foodSaleData
        : [""],
      foodFavoriteData: Array.isArray(map?.foodFavoriteData)
        ? map.foodFavoriteData
        : [""],
      foodUnFavoriteData: Array.isArray(map?.foodUnFavoriteData)
        ? map.foodUnFavoriteData
        : [""],
      restaurantFavoriteData: Array.isArray(map?.restaurantFavoriteData)
        ? map.restaurantFavoriteData
        : [""],
      restaurantUnFavoriteData: Array.isArray(map?.restaurantUnFavoriteData)
        ? map.restaurantUnFavoriteData
        : [""],
      foodCartData: Array.isArray(map?.foodCartData)
        ? map.foodCartData
        : [""],
      foodUnCartData: Array.isArray(map?.foodUnCartData)
        ? map.foodUnCartData
        : [""],
      foodLiked: Array.isArray(map?.foodLiked)
        ? map.foodLiked
        : [""],
      foodUnliked: Array.isArray(map?.foodUnliked)
        ? map.foodUnliked
        : [""],
      restaurantViewData: Array.isArray(map?.restaurantViewData)
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
      foodUnFavoriteData: ${JSON.stringify(this.foodUnFavoriteData)},
      restaurantFavoriteData: ${JSON.stringify(this.restaurantFavoriteData)},
      restaurantUnFavoriteData: ${JSON.stringify(this.restaurantUnFavoriteData)},
      foodCartData: ${JSON.stringify(this.foodCartData)},
      foodUnCartData: ${JSON.stringify(this.foodUnCartData)},
      foodLiked: ${JSON.stringify(this.foodLiked)},
      foodUnliked: ${JSON.stringify(this.foodUnliked)},
      restaurantViewData: ${JSON.stringify(this.restaurantViewData)}
    )`;
  }
}