import { createInstance } from "./aciosInsrance";

export const fetchDishes = async () => {
  const aInstance = createInstance();

  try {
    let fetchAllDishes = await aInstance.get("getdishes");
    return fetchAllDishes.data;
  } catch (error) {
    throw new Error(error.message)
  }
}
