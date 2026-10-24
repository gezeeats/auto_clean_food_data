
export class RecommandationModel {
  constructor({
    topNumberOfRestaurantBasedOnLocation = 3,
    maxMenusPerRestaurant = 3,
    maxMenusFromSearchForFoodDetail = 5,
    maxMenusFromRestaurantForFoodDetail = 5,

    foodViewCountGapInSec = 1200,
    resViewCountGapInSec = 1200,
    foodFavCountGapInSec = 1200,
    resFavCountGapInSec = 1200,
    foodUnFavCountGapInSec = 1200,
    resUnFavCountGapInSec = 1200,
    cartCountGapInSec = 1200,
    unCartCountGapInSec = 1200,

    foodViewUploCount = 20,
    resViewUploCount = 20,
    foodFavUploCount = 20,
    resFavUploCount = 20,
    foodUnFavUploCount = 20,
    resUnFavUploCount = 20,
    cartUploCount = 20,
    unCartUploCount = 20,

    coefficientOfFoodCart = 2.0,
    coefficientOfFoodFav = 2.0,
    coefficientOfFoodLiked = 6.0,
    coefficientOfFoodSale = 4.0,
    coefficientOfFoodUnCart = 1.0,
    coefficientOfFoodUnFav = 1.0,
    coefficientOfFoodUnLiked = 3.0,
    coefficientOfFoodViewSub = 1.5,
    coefficientOfFoodViewUnSub = 1.0,

    coefficientOfResFav = 2.0,
    coefficientOfResUnFav = 1.0,
    coefficientOfResViewSub = 1.5,
    coefficientOfResViewUnSub = 1.0,

    premiumAbove = 400.0,
    goldAbove = 300.0,
    popularAbove = 200.0,
    standardAbove = 50.0,
    newAbove = 0.0,
  } = {}) {
    this.topNumberOfRestaurantBasedOnLocation = topNumberOfRestaurantBasedOnLocation;
    this.maxMenusPerRestaurant = maxMenusPerRestaurant;
    this.maxMenusFromSearchForFoodDetail = maxMenusFromSearchForFoodDetail;
    this.maxMenusFromRestaurantForFoodDetail = maxMenusFromRestaurantForFoodDetail;

    this.foodViewCountGapInSec = foodViewCountGapInSec;
    this.resViewCountGapInSec = resViewCountGapInSec;
    this.foodFavCountGapInSec = foodFavCountGapInSec;
    this.resFavCountGapInSec = resFavCountGapInSec;
    this.foodUnFavCountGapInSec = foodUnFavCountGapInSec;
    this.resUnFavCountGapInSec = resUnFavCountGapInSec;
    this.cartCountGapInSec = cartCountGapInSec;
    this.unCartCountGapInSec = unCartCountGapInSec;

    this.foodViewUploCount = foodViewUploCount;
    this.resViewUploCount = resViewUploCount;
    this.foodFavUploCount = foodFavUploCount;
    this.resFavUploCount = resFavUploCount;
    this.foodUnFavUploCount = foodUnFavUploCount;
    this.resUnFavUploCount = resUnFavUploCount;
    this.cartUploCount = cartUploCount;
    this.unCartUploCount = unCartUploCount;

    this.coefficientOfFoodCart = coefficientOfFoodCart;
    this.coefficientOfFoodFav = coefficientOfFoodFav;
    this.coefficientOfFoodLiked = coefficientOfFoodLiked;
    this.coefficientOfFoodSale = coefficientOfFoodSale;
    this.coefficientOfFoodUnCart = coefficientOfFoodUnCart;
    this.coefficientOfFoodUnFav = coefficientOfFoodUnFav;
    this.coefficientOfFoodUnLiked = coefficientOfFoodUnLiked;
    this.coefficientOfFoodViewSub = coefficientOfFoodViewSub;
    this.coefficientOfFoodViewUnSub = coefficientOfFoodViewUnSub;

    this.coefficientOfResFav = coefficientOfResFav;
    this.coefficientOfResUnFav = coefficientOfResUnFav;
    this.coefficientOfResViewSub = coefficientOfResViewSub;
    this.coefficientOfResViewUnSub = coefficientOfResViewUnSub;

    this.premiumAbove = premiumAbove;
    this.goldAbove = goldAbove;
    this.popularAbove = popularAbove;
    this.standardAbove = standardAbove;
    this.newAbove = newAbove;
  }

  copyWith({
    topNumberOfRestaurantBasedOnLocation,
    maxMenusPerRestaurant,
    maxMenusFromSearchForFoodDetail,
    maxMenusFromRestaurantForFoodDetail,
    foodViewCountGapInSec,
    resViewCountGapInSec,
    foodFavCountGapInSec,
    resFavCountGapInSec,
    foodUnFavCountGapInSec,
    resUnFavCountGapInSec,
    cartCountGapInSec,
    unCartCountGapInSec,
    foodViewUploCount,
    resViewUploCount,
    foodFavUploCount,
    resFavUploCount,
    foodUnFavUploCount,
    resUnFavUploCount,
    cartUploCount,
    unCartUploCount,
    coefficientOfFoodCart,
    coefficientOfFoodFav,
    coefficientOfFoodLiked,
    coefficientOfFoodSale,
    coefficientOfFoodUnCart,
    coefficientOfFoodUnFav,
    coefficientOfFoodUnLiked,
    coefficientOfFoodViewSub,
    coefficientOfFoodViewUnSub,
    coefficientOfResFav,
    coefficientOfResUnFav,
    coefficientOfResViewSub,
    coefficientOfResViewUnSub,
    premiumAbove,
    goldAbove,
    popularAbove,
    standardAbove,
    newAbove,
  } = {}) {
    return new RecommandationModel({
      topNumberOfRestaurantBasedOnLocation:
        topNumberOfRestaurantBasedOnLocation ?? this.topNumberOfRestaurantBasedOnLocation,
      maxMenusPerRestaurant:
        maxMenusPerRestaurant ?? this.maxMenusPerRestaurant,
      maxMenusFromSearchForFoodDetail:
        maxMenusFromSearchForFoodDetail ?? this.maxMenusFromSearchForFoodDetail,
      maxMenusFromRestaurantForFoodDetail:
        maxMenusFromRestaurantForFoodDetail ?? this.maxMenusFromRestaurantForFoodDetail,

      foodViewCountGapInSec: foodViewCountGapInSec ?? this.foodViewCountGapInSec,
      resViewCountGapInSec: resViewCountGapInSec ?? this.resViewCountGapInSec,
      foodFavCountGapInSec: foodFavCountGapInSec ?? this.foodFavCountGapInSec,
      resFavCountGapInSec: resFavCountGapInSec ?? this.resFavCountGapInSec,
      foodUnFavCountGapInSec: foodUnFavCountGapInSec ?? this.foodUnFavCountGapInSec,
      resUnFavCountGapInSec: resUnFavCountGapInSec ?? this.resUnFavCountGapInSec,
      cartCountGapInSec: cartCountGapInSec ?? this.cartCountGapInSec,
      unCartCountGapInSec: unCartCountGapInSec ?? this.unCartCountGapInSec,

      foodViewUploCount: foodViewUploCount ?? this.foodViewUploCount,
      resViewUploCount: resViewUploCount ?? this.resViewUploCount,
      foodFavUploCount: foodFavUploCount ?? this.foodFavUploCount,
      resFavUploCount: resFavUploCount ?? this.resFavUploCount,
      foodUnFavUploCount: foodUnFavUploCount ?? this.foodUnFavUploCount,
      resUnFavUploCount: resUnFavUploCount ?? this.resUnFavUploCount,
      cartUploCount: cartUploCount ?? this.cartUploCount,
      unCartUploCount: unCartUploCount ?? this.unCartUploCount,

      coefficientOfFoodCart: coefficientOfFoodCart ?? this.coefficientOfFoodCart,
      coefficientOfFoodFav: coefficientOfFoodFav ?? this.coefficientOfFoodFav,
      coefficientOfFoodLiked: coefficientOfFoodLiked ?? this.coefficientOfFoodLiked,
      coefficientOfFoodSale: coefficientOfFoodSale ?? this.coefficientOfFoodSale,
      coefficientOfFoodUnCart: coefficientOfFoodUnCart ?? this.coefficientOfFoodUnCart,
      coefficientOfFoodUnFav: coefficientOfFoodUnFav ?? this.coefficientOfFoodUnFav,
      coefficientOfFoodUnLiked: coefficientOfFoodUnLiked ?? this.coefficientOfFoodUnLiked,
      coefficientOfFoodViewSub: coefficientOfFoodViewSub ?? this.coefficientOfFoodViewSub,
      coefficientOfFoodViewUnSub: coefficientOfFoodViewUnSub ?? this.coefficientOfFoodViewUnSub,

      coefficientOfResFav: coefficientOfResFav ?? this.coefficientOfResFav,
      coefficientOfResUnFav: coefficientOfResUnFav ?? this.coefficientOfResUnFav,
      coefficientOfResViewSub: coefficientOfResViewSub ?? this.coefficientOfResViewSub,
      coefficientOfResViewUnSub: coefficientOfResViewUnSub ?? this.coefficientOfResViewUnSub,

      premiumAbove: premiumAbove ?? this.premiumAbove,
      goldAbove: goldAbove ?? this.goldAbove,
      popularAbove: popularAbove ?? this.popularAbove,
      standardAbove: standardAbove ?? this.standardAbove,
      newAbove: newAbove ?? this.newAbove,
    });
  }

  toMap() {
    return {
      topNumberOfRestaurantBasedOnLocation: this.topNumberOfRestaurantBasedOnLocation,
      maxMenusPerRestaurant: this.maxMenusPerRestaurant,
      maxMenusFromSearchForFoodDetail: this.maxMenusFromSearchForFoodDetail,
      maxMenusFromRestaurantForFoodDetail: this.maxMenusFromRestaurantForFoodDetail,

      foodViewCountGapInSec: this.foodViewCountGapInSec,
      resViewCountGapInSec: this.resViewCountGapInSec,
      foodFavCountGapInSec: this.foodFavCountGapInSec,
      resFavCountGapInSec: this.resFavCountGapInSec,
      foodUnFavCountGapInSec: this.foodUnFavCountGapInSec,
      resUnFavCountGapInSec: this.resUnFavCountGapInSec,
      cartCountGapInSec: this.cartCountGapInSec,
      unCartCountGapInSec: this.unCartCountGapInSec,

      foodViewUploCount: this.foodViewUploCount,
      resViewUploCount: this.resViewUploCount,
      foodFavUploCount: this.foodFavUploCount,
      resFavUploCount: this.resFavUploCount,
      foodUnFavUploCount: this.foodUnFavUploCount,
      resUnFavUploCount: this.resUnFavUploCount,
      cartUploCount: this.cartUploCount,
      unCartUploCount: this.unCartUploCount,

      coefficientOfFoodCart: this.coefficientOfFoodCart,
      coefficientOfFoodFav: this.coefficientOfFoodFav,
      coefficientOfFoodLiked: this.coefficientOfFoodLiked,
      coefficientOfFoodSale: this.coefficientOfFoodSale,
      coefficientOfFoodUnCart: this.coefficientOfFoodUnCart,
      coefficientOfFoodUnFav: this.coefficientOfFoodUnFav,
      coefficientOfFoodUnLiked: this.coefficientOfFoodUnLiked,
      coefficientOfFoodViewSub: this.coefficientOfFoodViewSub,
      coefficientOfFoodViewUnSub: this.coefficientOfFoodViewUnSub,

      coefficientOfResFav: this.coefficientOfResFav,
      coefficientOfResUnFav: this.coefficientOfResUnFav,
      coefficientOfResViewSub: this.coefficientOfResViewSub,
      coefficientOfResViewUnSub: this.coefficientOfResViewUnSub,

      premiumAbove: this.premiumAbove,
      goldAbove: this.goldAbove,
      popularAbove: this.popularAbove,
      standardAbove: this.standardAbove,
      newAbove: this.newAbove,
    };
  }

  static fromMap(map = {}) {
    const intValue = (key, fallback) => {
      const value = Number(map[key]);
      return map[key] == null || !Number.isFinite(value)
        ? fallback
        : Math.trunc(value);
    };

    const doubleValue = (key, fallback) => {
      const value = Number(map[key]);
      return map[key] == null || !Number.isFinite(value)
        ? fallback
        : value;
    };

    return new RecommandationModel({
      topNumberOfRestaurantBasedOnLocation: intValue("topNumberOfRestaurantBasedOnLocation", 3),
      maxMenusPerRestaurant: intValue("maxMenusPerRestaurant", 3),
      maxMenusFromSearchForFoodDetail: intValue("maxMenusFromSearchForFoodDetail", 5),
      maxMenusFromRestaurantForFoodDetail: intValue("maxMenusFromRestaurantForFoodDetail", 5),

      foodViewCountGapInSec: intValue("foodViewCountGapInSec", 1200),
      resViewCountGapInSec: intValue("resViewCountGapInSec", 1200),
      foodFavCountGapInSec: intValue("foodFavCountGapInSec", 1200),
      resFavCountGapInSec: intValue("resFavCountGapInSec", 1200),
      foodUnFavCountGapInSec: intValue("foodUnFavCountGapInSec", 1200),
      resUnFavCountGapInSec: intValue("resUnFavCountGapInSec", 1200),
      cartCountGapInSec: intValue("cartCountGapInSec", 1200),
      unCartCountGapInSec: intValue("unCartCountGapInSec", 1200),

      foodViewUploCount: intValue("foodViewUploCount", 20),
      resViewUploCount: intValue("resViewUploCount", 20),
      foodFavUploCount: intValue("foodFavUploCount", 20),
      resFavUploCount: intValue("resFavUploCount", 20),
      foodUnFavUploCount: intValue("foodUnFavUploCount", 20),
      resUnFavUploCount: intValue("resUnFavUploCount", 20),
      cartUploCount: intValue("cartUploCount", 20),
      unCartUploCount: intValue("unCartUploCount", 20),

      coefficientOfFoodCart: doubleValue("coefficientOfFoodCart", 2.0),
      coefficientOfFoodFav: doubleValue("coefficientOfFoodFav", 2.0),
      coefficientOfFoodLiked: doubleValue("coefficientOfFoodLiked", 6.0),
      coefficientOfFoodSale: doubleValue("coefficientOfFoodSale", 4.0),
      coefficientOfFoodUnCart: doubleValue("coefficientOfFoodUnCart", 1.0),
      coefficientOfFoodUnFav: doubleValue("coefficientOfFoodUnFav", 1.0),
      coefficientOfFoodUnLiked: doubleValue("coefficientOfFoodUnLiked", 3.0),
      coefficientOfFoodViewSub: doubleValue("coefficientOfFoodViewSub", 1.5),
      coefficientOfFoodViewUnSub: doubleValue("coefficientOfFoodViewUnSub", 1.0),

      coefficientOfResFav: doubleValue("coefficientOfResFav", 2.0),
      coefficientOfResUnFav: doubleValue("coefficientOfResUnFav", 1.5),
      coefficientOfResViewSub: doubleValue("coefficientOfResViewSub", 1.0),
      coefficientOfResViewUnSub: doubleValue("coefficientOfResViewUnSub", 1.0),

      premiumAbove: doubleValue("premiumAbove", 400.0),
      goldAbove: doubleValue("goldAbove", 300.0),
      popularAbove: doubleValue("popularAbove", 200.0),
      standardAbove: doubleValue("standardAbove", 50.0),
      newAbove: doubleValue("newAbove", 0.0),
    });
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }

  static fromJson(source) {
    return RecommandationModel.fromMap(JSON.parse(source));
  }
}
