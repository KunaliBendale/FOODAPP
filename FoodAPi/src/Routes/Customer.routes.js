import express from "express";
import { AddCustomer,GetAllCustomer,DeleteCustomer, customerLogin, UpdateCustomerprofile, updateCustAddress,UpdateCustomerMobile, resetPassword, sendOtp, updatePassword } from "../Controller/Customer_Controller.js";
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
CustomerRoutes.post("/resetPassword",resetPassword);
CustomerRoutes.post("/sendOtp",sendOtp);
CustomerRoutes.post("/updatePassword",updatePassword);



//attach authenticate to update mobile and address


export {CustomerRoutes}
