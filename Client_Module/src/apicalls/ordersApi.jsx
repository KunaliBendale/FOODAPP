import { createInstance } from "./aciosInsrance";

const aInstance = createInstance();
export const deletedOrder = async (OrderId) => {
   
    try {
        let result = await aInstance.post("deleteorder", {OrderId})
        return result.data;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const createOrder = async (orderReqData)=>{
    try {
        let result = await aInstance.post("addorder",orderReqData)
    } catch (error) {
        throw new Error(error.message)
    }
}

export const fetchOrdersByStatus = async (statusAndCustId) => {
    try {
        let result = await aInstance.post("orderbystatus",statusAndCustId)
        return result.data
    } catch (error) {
        throw new Error(error.message)
    }
}
