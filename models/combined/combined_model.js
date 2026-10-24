
import { AppDataModel } from "../../models/app_data_model.js";
import { CancellationPolicyModel } from "../../models/cancellation_policy_model.js";
import { DatabaseConfigModel } from "../../models/database_config_model.js";
import { DeliveryWeightConfigModel } from "../../models/delivery_weight_config_model.js";
import { LanguageVersionModel } from "../../models/language_version_model.js";
import { PricingModel } from "../../models/pricing_model.js";
import { RecommandationModel } from "../../models/recommendation_model.js";
import { RestaurantLocationModel } from "../../models/restaurant_location_model.js";

export class CombinedAppModel {
  constructor({
    appData,
    language,
    pricing,
    recommandation,
    location,
    databaseConfig,
    cancellationPolicy,
    deliveryWeightConfig,
  }) {
    this.appData = appData;
    this.language = language;
    this.pricing = pricing;
    this.recommandation = recommandation;
    this.location = location;
    this.databaseConfig = databaseConfig;
    this.cancellationPolicy = cancellationPolicy;
    this.deliveryWeightConfig = deliveryWeightConfig;
  }

  copyWith({
    appData,
    language,
    pricing,
    recommandation,
    location,
    databaseConfig,
    cancellationPolicy,
    deliveryWeightConfig,
  } = {}) {
    return new CombinedAppModel({
      appData: appData ?? this.appData,
      language: language ?? this.language,
      pricing: pricing ?? this.pricing,
      recommandation: recommandation ?? this.recommandation,
      location: location ?? this.location,
      databaseConfig: databaseConfig ?? this.databaseConfig,
      cancellationPolicy: cancellationPolicy ?? this.cancellationPolicy,
      deliveryWeightConfig:
        deliveryWeightConfig ?? this.deliveryWeightConfig,
    });
  }

  toMap() {
    return {
      appData: this.appData.toMap(),
      language: this.language.toMap(),
      pricing: this.pricing.toMap(),
      recommandation: this.recommandation.toMap(),
      location: this.location.toMap(),
      databaseConfig: this.databaseConfig.toMap(),
      cancellationPolicy: this.cancellationPolicy.toMap(),
      deliveryWeightConfig: this.deliveryWeightConfig.toMap(),
    };
  }

  static fromMap(map = {}) {
    return new CombinedAppModel({
      appData: AppDataModel.fromMap(map.appData ?? {}),
      language: LanguageVersionModel.fromMap(map.language ?? {}),
      pricing: PricingModel.fromMap(map.pricing ?? {}),
      recommandation: RecommandationModel.fromMap(
        map.recommandation ?? {},
      ),
      location: RestaurantLocationModel.fromMap(map.location ?? {}),
      databaseConfig: DatabaseConfigModel.fromMap(
        map.databaseConfig ?? {},
      ),
      cancellationPolicy: CancellationPolicyModel.fromMap(
        map.cancellationPolicy ?? {},
      ),
      deliveryWeightConfig: DeliveryWeightConfigModel.fromMap(
        map.deliveryWeightConfig ?? {},
      ),
    });
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }

  static fromJson(source) {
    return CombinedAppModel.fromMap(JSON.parse(source));
  }

  static combine({
    appData,
    language,
    pricing,
    recommandation,
    location,
    databaseConfig,
    cancellationPolicy,
    deliveryWeightConfig,
  }) {
    return new CombinedAppModel({
      appData,
      language,
      pricing,
      recommandation,
      location,
      databaseConfig,
      cancellationPolicy,
      deliveryWeightConfig,
    });
  }
}

// Convert CombinedAppModel -> flat map for Firestore.
export function flattenCombinedAppModel(model) {
  const flat = {};

  function flatten(prefix, map) {
    for (const [key, value] of Object.entries(map)) {
      if (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        flatten(`${prefix}_${key}`, value);
      } else {
        flat[`${prefix}_${key}`] = value;
      }
    }
  }

  flatten("appData", model.appData.toMap());
  flatten("language", model.language.toMap());
  flatten("pricing", model.pricing.toMap());
  flatten("recommandation", model.recommandation.toMap());
  flatten("location", model.location.toMap());
  flatten("databaseConfig", model.databaseConfig.toMap());
  flatten("cancellationPolicy", model.cancellationPolicy.toMap());
  flatten("deliveryWeightConfig", model.deliveryWeightConfig.toMap());

  return flat;
}

export function addAppDataPrefix(value) {
  return `appData_${value}`;
}

export function addLanguageVersionPrefix(value) {
  return `language_${value}`;
}

export function addPricingPrefix(value) {
  return `pricing_${value}`;
}

export function addRecommandationPrefix(value) {
  return `recommandation_${value}`;
}

export function addResLocationPrefix(value) {
  return `location_${value}`;
}

export function addDatabaseConfigPrefix(value) {
  return `databaseConfig_${value}`;
}

export function addCancellationPolicyPrefix(value) {
  return `cancellationPolicy_${value}`;
}

export function addDeliveryWeightConfigPrefix(value) {
  return `deliveryWeightConfig_${value}`;
}

// Convert flat Firestore map -> CombinedAppModel.
export function expandCombinedAppModel(flatMap = {}) {
  function collect(prefix) {
    const sub = {};
    const matchPrefix = `${prefix}_`;

    for (const [originalKey, value] of Object.entries(flatMap)) {
      const key = originalKey.trim();

      if (!key.startsWith(matchPrefix)) continue;

      const parts = key.slice(matchPrefix.length).split("_");
      let current = sub;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (i === parts.length - 1) {
          current[part] = value;
        } else {
          if (
            current[part] === null ||
            typeof current[part] !== "object" ||
            Array.isArray(current[part])
          ) {
            current[part] = {};
          }

          current = current[part];
        }
      }
    }

    return sub;
  }

  return new CombinedAppModel({
    appData: AppDataModel.fromMap(collect("appData")),
    language: LanguageVersionModel.fromMap(collect("language")),
    pricing: PricingModel.fromMap(collect("pricing")),
    recommandation: RecommandationModel.fromMap(
      collect("recommandation"),
    ),
    location: RestaurantLocationModel.fromMap(collect("location")),
    databaseConfig: DatabaseConfigModel.fromMap(
      collect("databaseConfig"),
    ),
    cancellationPolicy: CancellationPolicyModel.fromMap(
      collect("cancellationPolicy"),
    ),
    deliveryWeightConfig: DeliveryWeightConfigModel.fromMap(
      collect("deliveryWeightConfig"),
    ),
  });
}
