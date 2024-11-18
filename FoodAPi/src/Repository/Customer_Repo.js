import { Customer } from "../Models/Customer.js";
import { uploadOnCloudinary, deletefromCloudinary } from "../MiddleWare/Cloudinary_middleware.js";
import fs from "fs/promises"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const CreateCustomer = async (params) => {
    try {
        console.log("create customer called");
        const { Photo } = params;
        const cloudinaryres = await uploadOnCloudinary(Photo)
        params.Photo = cloudinaryres.secure_url;
        params.Publicid = cloudinaryres.public_id;

        //password encryption 
        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(params.Password, salt)
        params.Password = hashedPassword

        const NewCustomer = await Customer.create(params);
        fs.unlink(Photo);
        console.log(NewCustomer);
        return NewCustomer;
    } catch (error) {
        console.log(error);
    }
}


const GetCustomer = async () => {
    try {
        const customer = await Customer.find()
        return customer;
    } catch (error) {
        console.log(error);
    }
}

const DelCustomer = async (CustId) => {
    try {

        const DeletedCustomer = await Customer.findByIdAndDelete(CustId);
        console.log(DeletedCustomer);
        const cloudinaryres = await deletefromCloudinary(DeletedCustomer.Publicid);

        return DeletedCustomer;
    } catch (error) {
        console.log(error);

    }
}


const doLogin = async ({ Email, Password }) => {
    try {
        let response;
        let custData = await Customer.findOne({ Email })

        if(!custData) return { message: "Not Register.", data: custData, success: false }

        let isCorrectPassword = await bcrypt.compare(Password, custData.Password)

        if (!isCorrectPassword) return { message: "Incorrect Password", data: null, success: false }

        let token = jwt.sign({ cid: custData._id }, "Secret Key",
            { expiresIn: 60 })

            return { message: "Login Successfull.", data: { custData, token }, success: true }

    } catch (error) {
        return error
    }
}


const UpdateProfile = async ({ CustomerId, Mobile, Address, City, State, Pincode }) => {
    try {
        const UpdatedProfile = await Customer.findOneAndUpdate(
            {
                _id: CustomerId
            },
            {
                Mobile: Mobile,
                Address: Address,
                City: City,
                State: State,
                Pincode: Pincode,
            },
            {
                new: true
            })

        return UpdatedProfile
    } catch (error) {
        return error
    }
}


export { CreateCustomer, DelCustomer, doLogin, UpdateProfile, GetCustomer }