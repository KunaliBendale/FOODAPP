import mongoose from "mongoose";
import { CreateCustomer, DelCustomer, doLogin, GetCustomer, UpdateMobile } from "../Repository/Customer_Repo.js";

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

//Update Customer's Mobile Number
const UpdateCustomerMobile = async (req, res) => {
    try {
        const Updatedcustomer = await UpdateMobile(req.body);
        res.status(200).json({
            message: "Customer's Image Updated Successfully..",
            data: Updatedcustomer
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const customerLogin = async (req, res) => {
    try {
        let result = await doLogin(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export { AddCustomer, customerLogin, GetAllCustomer, DeleteCustomer, UpdateCustomerMobile }
