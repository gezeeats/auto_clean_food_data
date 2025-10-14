import { FoodInfoServiceMethod } from "../service methods/food_info_calculated_service_method.js";
import { FoodIdResIdServiceMethod } from "../service methods/food_id_res_id_service_method.js";

const foodInfoService = new FoodInfoServiceMethod();
const foodIdResIdService = new FoodIdResIdServiceMethod();

async function runCleaner() {
  try {
    console.log("🔹 Starting automatic data cleaning...");

    const foodInfoTemp = await foodInfoService.getFoodInfoTempDetail();
    console.log("✅ FoodInfoTemp retrieved");

    const foodIdResId = await foodIdResIdService.getFoodIdResIdDetail();
    console.log("✅ FoodIdResId retrieved");

    const result = await foodInfoService.cleanAllData(foodInfoTemp, foodIdResId);
    console.log("✅ cleanAllData result:", result);

    console.log("🎉 Scheduled data cleaning completed successfully!");
  } catch (err) {
    console.error("❌ Scheduled task failed:", err);
    process.exit(1);
  }
}

runCleaner();
