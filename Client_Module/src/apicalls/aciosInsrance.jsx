import axios from "axios";

export const createInstance = () => {

    let BASE_URL = "http://localhost:8080/api/"

    let mInstance = axios.create({
        baseURL: BASE_URL,
        // withCredentials: true
    })
    
    return mInstance
}