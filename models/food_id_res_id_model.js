// models/food_id_res_id_model.js

export class FoodIdResIdModel {
  constructor(foodIdResIdItem = []) {
    this.foodIdResIdItem = foodIdResIdItem;
  }

  copyWith({ foodIdResIdItem } = {}) {
    return new FoodIdResIdModel(foodIdResIdItem || this.foodIdResIdItem);
  }

  toMap() {
    return {
      foodIdResIdItem: this.foodIdResIdItem,
    };
  }

  static fromMap(map) {
    if (!map) return new FoodIdResIdModel([]);
    return new FoodIdResIdModel(map.foodIdResIdItem || []);
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }

  static fromJson(source) {
    return FoodIdResIdModel.fromMap(JSON.parse(source));
  }

  toString() {
    return `FoodIdResIdModel(foodIdResIdItem: ${JSON.stringify(this.foodIdResIdItem)})`;
  }
}
