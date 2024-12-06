import express from "express";
import { AddOrder ,GetAllOrders,DeleteOrder,OrdersByStatus,OrderByIdAndStatus, UpdateOrderStatus} from "../Controller/Order_Controller.js";
import { authenticate } from "../MiddleWare/Auth.js";

const OrderRoutes=express.Router();

OrderRoutes.post("/addorder",authenticate,AddOrder);
OrderRoutes.get("/getorders",GetAllOrders);
OrderRoutes.post("/deleteorder",DeleteOrder);
OrderRoutes.post("/getordersbycustidstatus",authenticate,OrderByIdAndStatus)
OrderRoutes.post("/updateorderstatus",UpdateOrderStatus)
OrderRoutes.post("/orderbystatus",OrdersByStatus)


export {OrderRoutes}