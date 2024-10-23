import express from "express";
import { AddOrder ,GetAllOrders,DeleteOrder,GetOrdersById, UpdateOrderStatus} from "../Controller/Order_Controller.js";

const OrderRoutes=express.Router();

OrderRoutes.post("/addorder",AddOrder);
OrderRoutes.get("/getorders",GetAllOrders);
OrderRoutes.post("/deleteorder",DeleteOrder);
OrderRoutes.post("/getordersbycustid",GetOrdersById)
OrderRoutes.post("/updateorderstatus",UpdateOrderStatus)


export {OrderRoutes}