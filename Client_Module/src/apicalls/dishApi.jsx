import { createInstance } from "./aciosInsrance";

export const fetchDishes = async () => {
  const aInstance = createInstance();

  try {
    //let fetchAllDishes = await aInstance.get("getdishes");
    let fetchAllDishes = await aInstance.post("getdisheswithavgrating");
    return fetchAllDishes.data;
  } catch (error) {
    throw new Error(error.message)
  }
}

