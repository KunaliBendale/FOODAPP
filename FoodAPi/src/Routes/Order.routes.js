import express from "express";
import { AddOrder ,GetAllOrders,DeleteOrder} from "../Controller/Order_Controller.js";

const OrderRoutes=express.Router();

OrderRoutes.post("/addorder",AddOrder);
OrderRoutes.get("/getorders",GetAllOrders);
OrderRoutes.post("/deleteorder",DeleteOrder);


export {OrderRoutes}