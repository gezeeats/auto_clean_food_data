import { FoodInfoServiceMethod } from "./service_methods/food_info_service_method.js";
import { FoodInfoCalculatedServiceMethod } from "./service_methods/food_info_calculated_service_method.js";
import { CombinedAppServiceMethods } from "./service_methods/combined/combined_service_methods.js";
import { CollectionName } from "./key_words/collection_name.js";

const foodInfoService = new FoodInfoServiceMethod();
const foodInfoCalculatedService = new FoodInfoCalculatedServiceMethod();
const combinedAppServiceMethods = new CombinedAppServiceMethods();

async function runCleaner() {
  console.log("\n========================================");
  console.log("🚀 Starting automatic data cleaning...");
  console.log("========================================\n");

  try {
    console.log("📥 Fetching FoodInfo data...");

    const foodInfoTemp = await foodInfoService.getFoodInfoTempDetail();

    console.log("✅ FoodInfo data retrieved successfully.");
    console.log("📊 FoodInfo data:", foodInfoTemp);

    console.log("\n📥 Fetching CombinedApp data...");

    const combinedAppData = await combinedAppServiceMethods.read(
      CollectionName.user,
    );

    console.log("✅ CombinedApp data retrieved successfully.");
    // console.log("⚙️ CombinedApp data:", combinedAppData);

    console.log("\n🧹 Starting cleanAllData()...");

    const result = await foodInfoCalculatedService.cleanAllData(
      foodInfoTemp,combinedAppData
    );

    console.log("\n📋 Cleaning result:", result);

    console.log("\n========================================");
    console.log("🎉 Automatic data cleaning finished.");
    console.log("========================================\n");
  } catch (err) {
    console.error("\n❌ Automatic data cleaning failed!");
    console.error("📌 Error:", err);
    console.error("📌 Message:", err?.message);
    console.error("📌 Stack:", err?.stack);

    process.exitCode = 1;
  }
}

runCleaner();


