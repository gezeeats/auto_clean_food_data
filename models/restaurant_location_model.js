
export class RestaurantLocationModel {
  constructor({ restaurantWithLocation = [""] } = {}) {
    this.restaurantWithLocation = restaurantWithLocation;
  }

  copyWith({ restaurantWithLocation } = {}) {
    return new RestaurantLocationModel({
      restaurantWithLocation:
        restaurantWithLocation ?? this.restaurantWithLocation,
    });
  }

  toMap() {
    return {
      restaurantWithLocation: this.restaurantWithLocation,
    };
  }

  static fromMap(map = {}) {
    return new RestaurantLocationModel({
      restaurantWithLocation: Array.isArray(map.restaurantWithLocation)
        ? map.restaurantWithLocation
        : [""],
    });
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }

  static fromJson(source) {
    return RestaurantLocationModel.fromMap(JSON.parse(source));
  }

  toString() {
    return `RestaurantLocationModel(restaurantWithLocation: ${JSON.stringify(this.restaurantWithLocation)})`;
  }

  get props() {
    return [this.restaurantWithLocation];
  }
}
