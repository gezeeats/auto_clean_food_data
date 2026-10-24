import { CollectionName } from "../key_words/collection_name.js";
export class AppDataModel {
  constructor({
    currentVersion = "",
    currentAppdataVersion = 0,
    cacheMinute = 10,
    cacheMinuteLonger = 20,
    foodIdResIdCacheMinute = 10,
    searchCacheMinute = 10,
    foodInfoCalculatedCacheMinute = 10,
    foodCalculationCacheMinute = 10,
    menuScoreCacheDurationInMinutes = 3000,
    restaurantCalculationCacheMinute = 10,
    documentIdCacheMinute = 10,
    defaultLangugeIndex = 0,
    localizationCurrentVersion = "",
    annocuncemntMeassage1 = "",
    annocuncemntImage1 = "",
    annocuncemntStatus1 = false,
    annocuncemntMeassage2 = "",
    annocuncemntImage2 = "",
    annocuncemntStatus2 = false,
    androidUpdateLink = "",
    iosUpdateLink = "",
    updateMeassage = "",
    updateImage = "",
    updateStatus = false,
    userImageLink = false,
    legalInfoLink = "",
    appStatusReason = "",
    notificationUrl = "",
    botUrl = "",
    appStatus = false,
    manuplateUsingCurrentAppdataVersion = false,
    orderExpiredInMinute = 60,
    reviewExpireInMinutes = 180,
    locationUpdateTimeGapInMinute = 5,
    dbConfig = [""],
    documentIDDocumentLocations = [CollectionName.documentId],
    contact = "",
  } = {}) {
    this.currentVersion = currentVersion;
    this.currentAppdataVersion = currentAppdataVersion;
    this.cacheMinute = cacheMinute;
    this.cacheMinuteLonger = cacheMinuteLonger;
    this.foodIdResIdCacheMinute = foodIdResIdCacheMinute;
    this.searchCacheMinute = searchCacheMinute;
    this.foodInfoCalculatedCacheMinute = foodInfoCalculatedCacheMinute;
    this.foodCalculationCacheMinute = foodCalculationCacheMinute;
    this.menuScoreCacheDurationInMinutes = menuScoreCacheDurationInMinutes;
    this.restaurantCalculationCacheMinute = restaurantCalculationCacheMinute;
    this.documentIdCacheMinute = documentIdCacheMinute;
    this.defaultLangugeIndex = defaultLangugeIndex;
    this.localizationCurrentVersion = localizationCurrentVersion;
    this.annocuncemntMeassage1 = annocuncemntMeassage1;
    this.annocuncemntImage1 = annocuncemntImage1;
    this.annocuncemntStatus1 = annocuncemntStatus1;
    this.annocuncemntMeassage2 = annocuncemntMeassage2;
    this.annocuncemntImage2 = annocuncemntImage2;
    this.annocuncemntStatus2 = annocuncemntStatus2;
    this.androidUpdateLink = androidUpdateLink;
    this.iosUpdateLink = iosUpdateLink;
    this.updateMeassage = updateMeassage;
    this.updateImage = updateImage;
    this.updateStatus = updateStatus;
    this.userImageLink = userImageLink;
    this.legalInfoLink = legalInfoLink;
    this.appStatusReason = appStatusReason;
    this.notificationUrl = notificationUrl;
    this.botUrl = botUrl;
    this.appStatus = appStatus;
    this.manuplateUsingCurrentAppdataVersion =
      manuplateUsingCurrentAppdataVersion;
    this.orderExpiredInMinute = orderExpiredInMinute;
    this.reviewExpireInMinutes = reviewExpireInMinutes;
    this.locationUpdateTimeGapInMinute = locationUpdateTimeGapInMinute;
    this.dbConfig = dbConfig;
    this.documentIDDocumentLocations = documentIDDocumentLocations;
    this.contact = contact;
  }

  copyWith({
    currentVersion,
    currentAppdataVersion,
    cacheMinute,
    cacheMinuteLonger,
    foodIdResIdCacheMinute,
    searchCacheMinute,
    foodInfoCalculatedCacheMinute,
    foodCalculationCacheMinute,
    menuScoreCacheDurationInMinutes,
    restaurantCalculationCacheMinute,
    documentIdCacheMinute,
    defaultLangugeIndex,
    localizationCurrentVersion,
    annocuncemntMeassage1,
    annocuncemntImage1,
    annocuncemntStatus1,
    annocuncemntMeassage2,
    annocuncemntImage2,
    annocuncemntStatus2,
    androidUpdateLink,
    iosUpdateLink,
    updateMeassage,
    updateImage,
    updateStatus,
    userImageLink,
    legalInfoLink,
    appStatusReason,
    notificationUrl,
    botUrl,
    appStatus,
    manuplateUsingCurrentAppdataVersion,
    orderExpiredInMinute,
    reviewExpireInMinutes,
    locationUpdateTimeGapInMinute,
    dbConfig,
    documentIDDocumentLocations,
    contact,
  } = {}) {
    return new AppDataModel({
      currentVersion: currentVersion ?? this.currentVersion,
      currentAppdataVersion:
        currentAppdataVersion ?? this.currentAppdataVersion,
      cacheMinute: cacheMinute ?? this.cacheMinute,
      cacheMinuteLonger: cacheMinuteLonger ?? this.cacheMinuteLonger,
      foodIdResIdCacheMinute:
        foodIdResIdCacheMinute ?? this.foodIdResIdCacheMinute,
      searchCacheMinute: searchCacheMinute ?? this.searchCacheMinute,
      foodInfoCalculatedCacheMinute:
        foodInfoCalculatedCacheMinute ?? this.foodInfoCalculatedCacheMinute,
      foodCalculationCacheMinute:
        foodCalculationCacheMinute ?? this.foodCalculationCacheMinute,
      menuScoreCacheDurationInMinutes:
        menuScoreCacheDurationInMinutes ??
        this.menuScoreCacheDurationInMinutes,
      restaurantCalculationCacheMinute:
        restaurantCalculationCacheMinute ??
        this.restaurantCalculationCacheMinute,
      documentIdCacheMinute:
        documentIdCacheMinute ?? this.documentIdCacheMinute,
      defaultLangugeIndex: defaultLangugeIndex ?? this.defaultLangugeIndex,
      localizationCurrentVersion:
        localizationCurrentVersion ?? this.localizationCurrentVersion,
      annocuncemntMeassage1:
        annocuncemntMeassage1 ?? this.annocuncemntMeassage1,
      annocuncemntImage1:
        annocuncemntImage1 ?? this.annocuncemntImage1,
      annocuncemntStatus1:
        annocuncemntStatus1 ?? this.annocuncemntStatus1,
      annocuncemntMeassage2:
        annocuncemntMeassage2 ?? this.annocuncemntMeassage2,
      annocuncemntImage2:
        annocuncemntImage2 ?? this.annocuncemntImage2,
      annocuncemntStatus2:
        annocuncemntStatus2 ?? this.annocuncemntStatus2,
      androidUpdateLink: androidUpdateLink ?? this.androidUpdateLink,
      iosUpdateLink: iosUpdateLink ?? this.iosUpdateLink,
      updateMeassage: updateMeassage ?? this.updateMeassage,
      updateImage: updateImage ?? this.updateImage,
      updateStatus: updateStatus ?? this.updateStatus,
      userImageLink: userImageLink ?? this.userImageLink,
      legalInfoLink: legalInfoLink ?? this.legalInfoLink,
      appStatusReason: appStatusReason ?? this.appStatusReason,
      notificationUrl: notificationUrl ?? this.notificationUrl,
      botUrl: botUrl ?? this.botUrl,
      appStatus: appStatus ?? this.appStatus,
      manuplateUsingCurrentAppdataVersion:
        manuplateUsingCurrentAppdataVersion ??
        this.manuplateUsingCurrentAppdataVersion,
      orderExpiredInMinute:
        orderExpiredInMinute ?? this.orderExpiredInMinute,
      reviewExpireInMinutes:
        reviewExpireInMinutes ?? this.reviewExpireInMinutes,
      locationUpdateTimeGapInMinute:
        locationUpdateTimeGapInMinute ??
        this.locationUpdateTimeGapInMinute,
      dbConfig: dbConfig ?? this.dbConfig,
      documentIDDocumentLocations:
        documentIDDocumentLocations ?? this.documentIDDocumentLocations,
      contact: contact ?? this.contact,
    });
  }

  toMap() {
    return {
      currentVersion: this.currentVersion,
      currentAppdataVersion: this.currentAppdataVersion,
      cacheMinute: this.cacheMinute,
      cacheMinuteLonger: this.cacheMinuteLonger,
      foodIdResIdCacheMinute: this.foodIdResIdCacheMinute,
      searchCacheMinute: this.searchCacheMinute,
      foodInfoCalculatedCacheMinute: this.foodInfoCalculatedCacheMinute,
      foodCalculationCacheMinute: this.foodCalculationCacheMinute,
      menuScoreCacheDurationInMinutes: this.menuScoreCacheDurationInMinutes,
      restaurantCalculationCacheMinute: this.restaurantCalculationCacheMinute,
      documentIdCacheMinute: this.documentIdCacheMinute,
      defaultLangugeIndex: this.defaultLangugeIndex,
      localizationCurrentVersion: this.localizationCurrentVersion,
      annocuncemntMeassage1: this.annocuncemntMeassage1,
      annocuncemntImage1: this.annocuncemntImage1,
      annocuncemntStatus1: this.annocuncemntStatus1,
      annocuncemntMeassage2: this.annocuncemntMeassage2,
      annocuncemntImage2: this.annocuncemntImage2,
      annocuncemntStatus2: this.annocuncemntStatus2,
      androidUpdateLink: this.androidUpdateLink,
      iosUpdateLink: this.iosUpdateLink,
      updateMeassage: this.updateMeassage,
      updateImage: this.updateImage,
      updateStatus: this.updateStatus,
      userImageLink: this.userImageLink,
      legalInfoLink: this.legalInfoLink,
      appStatusReason: this.appStatusReason,
      notificationUrl: this.notificationUrl,
      botUrl: this.botUrl,
      appStatus: this.appStatus,
      manuplateUsingCurrentAppdataVersion:
        this.manuplateUsingCurrentAppdataVersion,
      orderExpiredInMinute: this.orderExpiredInMinute,
      reviewExpireInMinutes: this.reviewExpireInMinutes,
      locationUpdateTimeGapInMinute: this.locationUpdateTimeGapInMinute,
      dbConfig: this.dbConfig,
      documentIDDocumentLocations: this.documentIDDocumentLocations,
      contact: this.contact,
    };
  }

  static fromMap(map) {
    return new AppDataModel({
      currentVersion: map?.currentVersion ?? "",
      currentAppdataVersion: map?.currentAppdataVersion ?? 0,
      cacheMinute: map?.cacheMinute ?? 10,
      cacheMinuteLonger: map?.cacheMinuteLonger ?? 20,
      foodIdResIdCacheMinute: map?.foodIdResIdCacheMinute ?? 10,
      searchCacheMinute: map?.searchCacheMinute ?? 10,
      foodInfoCalculatedCacheMinute:
        map?.foodInfoCalculatedCacheMinute ?? 10,
      foodCalculationCacheMinute: map?.foodCalculationCacheMinute ?? 10,
      menuScoreCacheDurationInMinutes:
        map?.menuScoreCacheDurationInMinutes ?? 3000,
      restaurantCalculationCacheMinute:
        map?.restaurantCalculationCacheMinute ?? 10,
      documentIdCacheMinute: map?.documentIdCacheMinute ?? 10,
      defaultLangugeIndex: map?.defaultLangugeIndex ?? 0,
      localizationCurrentVersion: map?.localizationCurrentVersion ?? "",
      annocuncemntMeassage1: map?.annocuncemntMeassage1 ?? "",
      annocuncemntImage1: map?.annocuncemntImage1 ?? "",
      annocuncemntStatus1: map?.annocuncemntStatus1 ?? false,
      annocuncemntMeassage2: map?.annocuncemntMeassage2 ?? "",
      annocuncemntImage2: map?.annocuncemntImage2 ?? "",
      annocuncemntStatus2: map?.annocuncemntStatus2 ?? false,
      androidUpdateLink: map?.androidUpdateLink ?? "",
      iosUpdateLink: map?.iosUpdateLink ?? "",
      updateMeassage: map?.updateMeassage ?? "",
      updateImage: map?.updateImage ?? "",
      updateStatus: map?.updateStatus ?? false,
      userImageLink: map?.userImageLink ?? false,
      legalInfoLink: map?.legalInfoLink ?? "",
      appStatusReason: map?.appStatusReason ?? "",
      notificationUrl: map?.notificationUrl ?? "",
      botUrl: map?.botUrl ?? "",
      appStatus: map?.appStatus ?? false,
      manuplateUsingCurrentAppdataVersion:
        map?.manuplateUsingCurrentAppdataVersion ?? false,
      orderExpiredInMinute: map?.orderExpiredInMinute ?? 60,
      reviewExpireInMinutes: map?.reviewExpireInMinutes ?? 180,
      locationUpdateTimeGapInMinute:
        map?.locationUpdateTimeGapInMinute ?? 5,
      dbConfig: Array.isArray(map?.dbConfig)
        ? map.dbConfig
        : [""],
      documentIDDocumentLocations:
        Array.isArray(map?.documentIDDocumentLocations)
          ? map.documentIDDocumentLocations
          : [CollectionName.documentId],
      contact: map?.contact ?? "",
    });
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }

  static fromJson(source) {
    return AppDataModel.fromMap(JSON.parse(source));
  }

  toString() {
    return `AppDataModel(${JSON.stringify(this.toMap())})`;
  }
}
