import { Customer } from "../Models/Customer.js";
import { uploadOnCloudinary ,deletefromCloudinary} from "../MiddleWare/Cloudinary_middleware.js";
import fs from "fs/promises"

const CreateCustomer = async (params) => {
    try {
        console.log("create customer called");
        const { Photo } = params;
        const cloudinaryres = await uploadOnCloudinary(Photo)
        params.Photo=cloudinaryres.secure_url;
        params.Publicid=cloudinaryres.public_id;
        
        const NewCustomer = await Customer.create(params);
        fs.unlink(Photo)
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

const UpdateMobile = async () => {
    try {
        const Updated = await Customer.findOneAndUpdate({
            _id: req.params.CustId,
        }, {
            "Mobile": req.body.Mobile,
        }, {
            new: true
        });

        return Updated;
    } catch (error) {
        console.log(error)
    }
}


export { CreateCustomer, DelCustomer, UpdateMobile, GetCustomer }