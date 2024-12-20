import express from "express";
import { AddCustomer,GetAllCustomer,DeleteCustomer, customerLogin, UpdateCustomerprofile, updateCustAddress,UpdateCustomerMobile } from "../Controller/Customer_Controller.js";
import { upload } from "../MiddleWare/Multer_Middleware.js";
import { authenticate } from "../MiddleWare/Auth.js";


const CustomerRoutes=express.Router();

CustomerRoutes.post("/register",upload.single("image"),AddCustomer);
CustomerRoutes.get("/getCustomers",GetAllCustomer);
CustomerRoutes.post("/deleteCustomer",DeleteCustomer);
CustomerRoutes.post("/dologin",customerLogin);
CustomerRoutes.post("/updateprofile",UpdateCustomerprofile);
CustomerRoutes.post("/updatecustmobile",UpdateCustomerMobile);
CustomerRoutes.post("/updatecustaddress",updateCustAddress);

//attach authenticate to update mobile and address


export {CustomerRoutes}
