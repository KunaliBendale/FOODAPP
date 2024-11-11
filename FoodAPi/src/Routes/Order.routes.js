import express from "express";
import { AddOrder ,GetAllOrders,DeleteOrder,OrdersByStatus, UpdateOrderStatus} from "../Controller/Order_Controller.js";

const OrderRoutes=express.Router();

OrderRoutes.post("/addorder",AddOrder);
OrderRoutes.get("/getorders",GetAllOrders);
OrderRoutes.post("/deleteorder",DeleteOrder);
OrderRoutes.post("/getordersbycustidstatus",OrdersByStatus)
OrderRoutes.post("/updateorderstatus",UpdateOrderStatus)
OrderRoutes.post("/orderbystatus",OrdersByStatus)


export {OrderRoutes}