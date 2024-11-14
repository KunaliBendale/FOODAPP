import { createInstance } from "./axiosInstance";

const aInstance = createInstance();

export const addDishData = async (reqDishData) => {
    try {
        let result = await aInstance.post("adddish", reqDishData, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })

        return result.data;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const fetchDishData = async () => {
    try {
        let result = await aInstance.get("getdishes")
        return result.data;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteOneDish = async (DishId) => {
    try {
        let result = await aInstance.post("deletedish", { DishId })
        return result.data;
    } catch (error) {
        throw new Error(error.message)
    }
}


export const updatePrice = async (priceReqData) => {
    try {
        let result = await aInstance.post("updatedishprice", priceReqData)
        return result.data;
    } catch (error) {
        throw new Error(error.message)
    }
}

