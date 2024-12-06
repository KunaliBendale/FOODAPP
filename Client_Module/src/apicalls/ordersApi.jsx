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

export const createOrder = async (orderReqData,token)=>{
    try {
        let result = await aInstance.post("addorder",orderReqData,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return result.data
    } catch (error) {
        throw new Error(error.message)
    }
}


export const fetchOrdersByStatus = async (statusAndCustId,token) => {
    try {
        let result = await aInstance.post("getordersbycustidstatus",statusAndCustId,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return result.data
    } catch (error) {
        throw new Error(error.message)
    }
}
