import { db } from "../firebaseConfig.js";
import { FieldValue } from "firebase-admin/firestore";

import { AppDataModel } from "../models/app_data_model.js";
import { CancellationPolicyModel } from "../models/cancellation_policy_model.js";
import {
  CombinedAppModel,
  flattenCombinedAppModel,
  expandCombinedAppModel,
} from "../models/combined/combined_model.js";
import { DatabaseConfigModel } from "../models/database_config_model.js";
import { DeliveryWeightConfigModel } from "../models/delivery_weight_config_model.js";
import { LanguageVersionModel } from "../models/language_version_model.js";
import { PricingModel } from "../models/pricing_model.js";
import { RecommandationModel } from "../models/recommendation_model.js";
import { RestaurantLocationModel } from "../models/restaurant_location_model.js";
import { CollectionName } from "../key_words/collection_name.js";
import { StringConstants } from "../utils/string_constant.js";


export class FirebaseCombinedAppMethods {
  async create(combinedAppData, app) {
    let res = StringConstants.someErrorHasOccured;

    try {
      const data = flattenCombinedAppModel(combinedAppData);

      await db.collection(CollectionName.combinedAppData).doc(app).set(data);
      res = StringConstants.success;
    } catch (err) {
      res = err.toString();
    }

    return res;
  }

  async read(app) {
    try {
      const doc = await db
        .collection(CollectionName.combinedAppData)
        .doc(app)
        .get();

      if (!doc.exists || doc.data() == null) {
        throw new Error("No data found");
      }

      return expandCombinedAppModel({ ...doc.data() });
    } catch (err) {
      console.log("Something is wrong on combined app data:", err);

      return new CombinedAppModel({
        appData: new AppDataModel({
          currentVersion: "Error-invalid document for CombinedAppModel",
        }),
        language: new LanguageVersionModel(),
        pricing: new PricingModel(),
        recommandation: new RecommandationModel(),
        location: new RestaurantLocationModel({
          restaurantWithLocation: [""],
        }),
        databaseConfig: new DatabaseConfigModel(),
        cancellationPolicy: new CancellationPolicyModel(),
        deliveryWeightConfig: new DeliveryWeightConfigModel(),
      });
    }
  }

  async update(path, value, app) {
    let res = StringConstants.someErrorHasOccured;

    try {
      await db
        .collection(CollectionName.combinedAppData)
        .doc(app)
        .update({ [path]: value });
      res = StringConstants.success;
    } catch (err) {
      res = err.toString();
    }

    return res;
  }

  async updateLocation(valueToStore, valueToRemove, { app = "user" } = {}) {
    let res = StringConstants.someErrorHasOccured;

    try {
      const docRef = db
        .collection(CollectionName.combinedAppData)
        .doc(app);

      if (valueToRemove.isNotEmpty) {
        await docRef.update({
          location_restaurantWithLocation: FieldValue.arrayRemove(
            valueToRemove,
          ),
        });
      }

      if (valueToStore.isNotEmpty) {
        await docRef.update({
          location_restaurantWithLocation: FieldValue.arrayUnion(
            valueToStore,
          ),
        });
      }

      res = StringConstants.success;
    } catch (err) {
      res = err.toString();
    }

    return res;
  }
}