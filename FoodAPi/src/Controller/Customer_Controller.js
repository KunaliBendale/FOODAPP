import mongoose from "mongoose";
import { CreateCustomer, DelCustomer, GetCustomer, UpdateMobile } from "../Repository/Customer_Repo.js";

//Add Customer
const AddCustomer = async (req, res) => {
    try {
        console.log("Addcustomer is called");
        const customer = await CreateCustomer({...req.body,Photo:req.file.path});
        res.status(200).json(
            {
               message: "Customer Added Successfully..",
               data: customer
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
            meassage:"Customers Are : ",
            data: AllCustomer})
    } catch (error) {
        res.status(500).json(error)
    }
}


//Delete a Customer
const DeleteCustomer = async (req, res) => {
    try {
        const DeleteCustomer = await DelCustomer(req.body.CustId);
        res.status(200).json({
            message:"Customer Deleted Successfully..",
            data: DeleteCustomer})
    } catch (error) {
        res.status(500).json(error)
    }
}

//Update Customer's Mobile Number
const UpdateCustomerMobile = async (req, res) => {
    try {
        const Updatedcustomer = await UpdateMobile(req.body);
        res.status(200).json({
            message:"Customer's Image Updated Successfully..", 
            data:Updatedcustomer})
    } catch (error) {
        res.status(500).json(error)
    }
}

export { AddCustomer, GetAllCustomer, DeleteCustomer, UpdateCustomerMobile }
