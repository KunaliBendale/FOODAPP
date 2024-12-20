import express from "express";
import { AddOrder ,GetAllOrders,DeleteOrder,OrdersByStatus,OrderByIdAndStatus,getTopDishes, UpdateOrderStatus,totalRevenue,fetchSortedOrders} from "../Controller/Order_Controller.js";
import { authenticate } from "../MiddleWare/Auth.js";

const OrderRoutes=express.Router();

OrderRoutes.post("/addorder",authenticate,AddOrder);
OrderRoutes.get("/getorders",GetAllOrders);
OrderRoutes.post("/deleteorder",DeleteOrder);
OrderRoutes.post("/getordersbycustidstatus",authenticate,OrderByIdAndStatus)
OrderRoutes.post("/updateorderstatus",UpdateOrderStatus)
OrderRoutes.post("/orderbystatus",OrdersByStatus)
OrderRoutes.get("/totalrevenue",totalRevenue)
OrderRoutes.post("/fetchsortedorders",fetchSortedOrders)
OrderRoutes.get("/gettopdishes",getTopDishes)



export {OrderRoutes}