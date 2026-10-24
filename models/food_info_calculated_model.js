// models/food_info_calculated_model.js

export class FoodInfoCalculatedModel {
  constructor({
    restaurantInfoCalculated = "",
    restaurantIdentification = "",
    menuCalculated = [""],
  } = {}) {
    this.restaurantInfoCalculated = restaurantInfoCalculated;
    this.restaurantIdentification = restaurantIdentification;
    this.menuCalculated = menuCalculated;
  }

  copyWith({
    restaurantInfoCalculated,
    restaurantIdentification,
    menuCalculated,
  } = {}) {
    return new FoodInfoCalculatedModel({
      restaurantInfoCalculated:
        restaurantInfoCalculated ?? this.restaurantInfoCalculated,
      restaurantIdentification:
        restaurantIdentification ?? this.restaurantIdentification,
      menuCalculated: menuCalculated ?? this.menuCalculated,
    });
  }

  toMap() {
    return {
      restaurantInfoCalculated: this.restaurantInfoCalculated,
      restaurantIdentification: this.restaurantIdentification,
      menuCalculated: this.menuCalculated,
    };
  }

  static fromMap(map) {
    return new FoodInfoCalculatedModel({
      restaurantInfoCalculated:
        map?.restaurantInfoCalculated ?? "",
      restaurantIdentification:
        map?.restaurantIdentification ?? "",
      menuCalculated:
        map?.menuCalculated != null
          ? Array.from(map.menuCalculated)
          : [""],
    });
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }

  static fromJson(source) {
    return FoodInfoCalculatedModel.fromMap(JSON.parse(source));
  }

  toString() {
    return `FoodInfoCalculatedModel(restaurantInfoCalculated: ${this.restaurantInfoCalculated}, restaurantIdentification: ${this.restaurantIdentification}, menuCalculated: ${JSON.stringify(this.menuCalculated)})`;
  }
}