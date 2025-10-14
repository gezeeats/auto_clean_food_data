import { FoodInfoServiceMethod } from "./service methods/food_info_service_method.js";
import { FoodIdResIdServiceMethod } from "./service methods/food_id_res_id_service_method.js";

const foodInfoService = new FoodInfoServiceMethod();
const foodIdResIdService = new FoodIdResIdServiceMethod();

async function testCleanAllData() {
  try {
    console.log("🔹 Step 1: Fetching FoodInfoTemp detail...");
    const foodInfoTemp = await foodInfoService.getFoodInfoTempDetail();
    console.log("✅ FoodInfoTemp retrieved:", foodInfoTemp);

    console.log("🔹 Step 2: Fetching FoodIdResId detail...");
    const foodIdResId = await foodIdResIdService.getFoodIdResIdDetail();
    // console.log("✅ FoodIdResId retrieved:", foodIdResId);

    console.log("🔹 Step 3: Cleaning all data...");
    const result = await foodInfoService.cleanAllData(foodInfoTemp, foodIdResId);
    console.log("✅ cleanAllData result:", result);

    console.log("🎉 All data cleaned successfully!");
  } catch (err) {
    console.error("❌ Error while cleaning all data:", err);
  }
}

testCleanAllData();

