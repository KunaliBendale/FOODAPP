import { createInstance } from "./axiosInstance";

const aInstance = createInstance();

export const fetchOrdersByStatus = async (orderStatus) => {
    try {
        let result = await aInstance.post("orderbystatus",orderStatus)
        return result.data
    } catch (error) {
        throw new Error(error.message)
    }
}


export const updateStatus = async (statusReqData)=>{
    try {
        let result = aInstance.post("updateorderstatus",statusReqData)
        return result;
    } catch (error) {
        throw new Error(error.message)
        
    }
}