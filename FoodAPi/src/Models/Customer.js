
import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema({
    Name:{
        type:String,
        required:[true,"Name is required"],
    },
    Email:{
        type:String,
        required:[true,"Email is required"],
    },
    Mobile:{
        type:String,
        required:[true,"Mobile number is required"],
    },
    Address:{
        type:String
    },
    City:{
        type:String,
        required:[true,"City is required"]
    },
    State:{
        type:String,
        required:[true,"State is required"]
    },
    Pincode:{
        type:Number,
        required:[true,"pincode is required"]
    },
    Password:{
        type:String
    },
    Photo:{
        type:String
    },
    Publicid:{
        type:String
    }
})

 export const Customer = mongoose.model("Customer",CustomerSchema);






 