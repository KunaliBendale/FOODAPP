import { cloudinary } from "../config/Cloudinary_config.js";

const uploadOnCloudinary = async(path)=>{
    const cloudinaryRes = await cloudinary.uploader.upload(path)
    console.log(cloudinaryRes);
    return cloudinaryRes;
}

const deletefromCloudinary=async(public_id)=>{
    const cloudinaryResponse=await cloudinary.uploader.destroy(public_id)
    return cloudinaryResponse;
}

export {uploadOnCloudinary,deletefromCloudinary}