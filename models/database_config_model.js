
export class DatabaseConfigModel {
  constructor({
    appData = "",
    canceledOrder = "",
    cancellationPolicy = "",
    counter = "",
    deliveryPerson = "",
    deliveryWeightConfig = "",
    district = "",
    documentId = "",
    emailAndPassword = "",
    foodIdResId = "",
    foodInfoCalculated = "",
    foodInfo = "",
    food = "",
    historyLog = "",
    imageData = "",
    imageUser = "",
    languageVersion = "",
    legal = "",
    localization = "",
    order = "",
    pricing = "",
    recommendation = "",
    restaurantLocation = "",
    restaurant = "",
    search = "",
    user = "",
    imageStorage = "",
    realTimeDatabase = "",
    realTimeDatabaseUrl = "",
    userSearchHistory = "",
  } = {}) {
    this.appData = appData;
    this.canceledOrder = canceledOrder;
    this.cancellationPolicy = cancellationPolicy;
    this.counter = counter;
    this.deliveryPerson = deliveryPerson;
    this.deliveryWeightConfig = deliveryWeightConfig;
    this.district = district;
    this.documentId = documentId;
    this.emailAndPassword = emailAndPassword;
    this.foodIdResId = foodIdResId;
    this.foodInfoCalculated = foodInfoCalculated;
    this.foodInfo = foodInfo;
    this.food = food;
    this.historyLog = historyLog;
    this.imageData = imageData;
    this.imageUser = imageUser;
    this.languageVersion = languageVersion;
    this.legal = legal;
    this.localization = localization;
    this.order = order;
    this.pricing = pricing;
    this.recommendation = recommendation;
    this.restaurantLocation = restaurantLocation;
    this.restaurant = restaurant;
    this.search = search;
    this.user = user;
    this.imageStorage = imageStorage;
    this.realTimeDatabase = realTimeDatabase;
    this.realTimeDatabaseUrl = realTimeDatabaseUrl;
    this.userSearchHistory = userSearchHistory;
  }

  copyWith(values = {}) {
    const current = this.toMap();

    return new DatabaseConfigModel({
      ...current,
      ...Object.fromEntries(
        Object.entries(values).filter(([, value]) => value != null),
      ),
    });
  }

  toMap() {
    return {
      appData: this.appData,
      canceledOrder: this.canceledOrder,
      cancellationPolicy: this.cancellationPolicy,
      counter: this.counter,
      deliveryPerson: this.deliveryPerson,
      deliveryWeightConfig: this.deliveryWeightConfig,
      district: this.district,
      documentId: this.documentId,
      emailAndPassword: this.emailAndPassword,
      foodIdResId: this.foodIdResId,
      foodInfoCalculated: this.foodInfoCalculated,
      foodInfo: this.foodInfo,
      food: this.food,
      historyLog: this.historyLog,
      imageData: this.imageData,
      imageUser: this.imageUser,
      languageVersion: this.languageVersion,
      legal: this.legal,
      localization: this.localization,
      order: this.order,
      pricing: this.pricing,
      recommendation: this.recommendation,
      restaurantLocation: this.restaurantLocation,
      restaurant: this.restaurant,
      search: this.search,
      user: this.user,
      imageStorage: this.imageStorage,
      realTimeDatabase: this.realTimeDatabase,
      realTimeDatabaseUrl: this.realTimeDatabaseUrl,
      userSearchHistory: this.userSearchHistory,
    };
  }

  static fromMap(map = {}) {
    const fields = [
      "appData",
      "canceledOrder",
      "cancellationPolicy",
      "counter",
      "deliveryPerson",
      "deliveryWeightConfig",
      "district",
      "documentId",
      "emailAndPassword",
      "foodIdResId",
      "foodInfoCalculated",
      "foodInfo",
      "food",
      "historyLog",
      "imageData",
      "imageUser",
      "languageVersion",
      "legal",
      "localization",
      "order",
      "pricing",
      "recommendation",
      "restaurantLocation",
      "restaurant",
      "search",
      "user",
      "imageStorage",
      "realTimeDatabase",
      "realTimeDatabaseUrl",
      "userSearchHistory",
    ];

    return new DatabaseConfigModel(
      Object.fromEntries(
        fields.map((field) => [field, map[field] ?? ""]),
      ),
    );
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }

  static fromJson(source) {
    return DatabaseConfigModel.fromMap(JSON.parse(source));
  }
}
