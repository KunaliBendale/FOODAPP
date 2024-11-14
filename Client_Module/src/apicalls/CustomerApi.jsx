import { createInstance } from "./aciosInsrance"

export const registerCustomer = async (custReqData) => {
    let aInstance = createInstance()

    try {
        let result = await aInstance.post("register", custReqData, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })
        return result.data
    } catch (error) {
        throw new Error(error.message)
    }
}


export const loginCustomer = async (loginReqData) => {
    let aInstance = createInstance()

    try {
        let result = await aInstance.post("dologin",loginReqData )

        return result.data
    } catch (error) {
        throw new Error(error.message)
        
    }
}