import express from "express";
import { AddOrder, GetAllOrders, DeleteOrder, OrdersByStatus, OrderByIdAndStatus, getTopDishes, UpdateOrderStatus, totalRevenue, fetchSortedOrders } from "../Controller/Order_Controller.js";
import { authenticate } from "../MiddleWare/Auth.js";
import { verifyRazorpay, RazorpayOrder } from "../Controller/PaymentController.js";
const OrderRoutes = express.Router();

OrderRoutes.post("/addorder", AddOrder);
OrderRoutes.get("/getorders", GetAllOrders);
OrderRoutes.post("/deleteorder", DeleteOrder);
OrderRoutes.post("/getordersbycustidstatus", OrderByIdAndStatus)
OrderRoutes.post("/updateorderstatus", UpdateOrderStatus)
OrderRoutes.post("/orderbystatus", OrdersByStatus)
OrderRoutes.get("/totalrevenue", totalRevenue)
OrderRoutes.post("/fetchsortedorders", fetchSortedOrders)
OrderRoutes.get("/gettopdishes", getTopDishes)

//payment routes
OrderRoutes.post("/RazorpayOrder", RazorpayOrder)
OrderRoutes.post("/verifyRazorpay", verifyRazorpay)




export { OrderRoutes }