import axios from "axios";

export const createInstance = ()=>{
    let BASE_URL=  "http://localhost:5000/api/"
    
    let mInstance=axios.create({
        baseURL:BASE_URL,

    })
    return mInstance;
}