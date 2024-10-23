import express from "express";
import { AddCustomer,GetAllCustomer,DeleteCustomer, customerLogin, UpdateCustomerprofile } from "../Controller/Customer_Controller.js";
import { upload } from "../MiddleWare/Multer_Middleware.js";


const CustomerRoutes=express.Router();

CustomerRoutes.post("/register",upload.single("image"),AddCustomer);
CustomerRoutes.get("/getCustomers",GetAllCustomer);
CustomerRoutes.post("/deleteCustomer",DeleteCustomer);
CustomerRoutes.post("/dologin",customerLogin);
CustomerRoutes.post("/updateprofile",UpdateCustomerprofile);


export {CustomerRoutes}