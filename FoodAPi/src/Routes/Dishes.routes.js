import { AddDishes,GetAllDishes,DeleteDish, updateDishPrice } from "../Controller/Dishes_Controller.js";
import express from "express";
import { upload } from "../MiddleWare/Multer_Middleware.js";

const DishRoutes=express.Router();

DishRoutes.post("/adddish",upload.single("image"),AddDishes);
DishRoutes.get("/getdishes",GetAllDishes);
DishRoutes.post("/deletedish",DeleteDish);
DishRoutes.post("/updatedishprice",updateDishPrice);


export {DishRoutes}