import { FirebaseCombinedAppMethods } from "../../firebase_methods/firebase_combined_app_methods.js";

export class CombinedAppServiceMethods {
  async create(combinedAppData, app) {
    return await new FirebaseCombinedAppMethods().create(
      combinedAppData,
      app,
    );
  }

  async read(app) {
    return await new FirebaseCombinedAppMethods().read(app);
  }

  async update(path, value, app) {
    return await new FirebaseCombinedAppMethods().update(
      path,
      value,
      app,
    );
  }
}