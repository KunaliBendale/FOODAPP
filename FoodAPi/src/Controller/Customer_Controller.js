import mongoose from "mongoose";
import { CreateCustomer, DelCustomer, doLogin, GetCustomer, UpdateProfile } from "../Repository/Customer_Repo.js";
import { Customer } from "../Models/Customer.js";

//Add Customer
const AddCustomer = async (req, res) => {
    try {
        console.log("Addcustomer is called");
        const customer = await CreateCustomer({ ...req.body, Photo: req.file.path });
        res.status(200).json(
            {
                data: customer,
                message: "Customer Added Successfully.."
            })
    } catch (error) {
        res.status(500).json(error)
    }
}

//Get All Customer
const GetAllCustomer = async (req, res) => {
    try {
        const AllCustomer = await GetCustomer();
        res.status(200).json({
            meassage: "Customers Are : ",
            data: AllCustomer
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


//Delete a Customer
const DeleteCustomer = async (req, res) => {
    try {
        const DeleteCustomer = await DelCustomer(req.body.CustId);
        res.status(200).json({
            message: "Customer Deleted Successfully..",
            data: DeleteCustomer
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const UpdateCustomerMobile = async (req, res) => {
    try {
        const UpdatedMb = await Customer.findOneAndUpdate({
            _id: req.body.CustomerId,
        }, {
            Mobile: req.body.Mobile,
        }, {
            new: true
        });

        res.status(200).json({
            message: "Customer Updated Successfully..",
            data: UpdatedMb
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateCustAddress = async (req, res) => {
    try {
        const UpdatedAd = await Customer.findOneAndUpdate({
            _id: req.body.CustomerId,
        }, {
            Address: req.body.Address,
        }, {
            new: true
        });

        res.status(200).json({
            message: "Customer Updated Successfully..",
            data: UpdatedAd
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

//Update Customer's Profile
const UpdateCustomerprofile = async (req, res) => {
    try {
        const result = await Customer.findOneAndUpdate(req.body)

        res.status(200).json({
            data: result
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


const customerLogin = async (req, res) => {
    try {
        let result = await doLogin(req.body)
        if (!result.success) return res.status(400).json(result)

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}


const UpdatePassword = async (req, res) => {
    try {


    } catch (error) {

    }
}
export { AddCustomer, customerLogin, GetAllCustomer, DeleteCustomer, updateCustAddress, UpdateCustomerprofile, UpdateCustomerMobile }
