import express from "express";
import { ConnectDB } from "./src/DB/ConnectDB.js";
import { CustomerRoutes } from "./src/Routes/Customer.routes.js";
import bodyParser from "body-parser";
import { DishRoutes } from "./src/Routes/Dishes.routes.js";
import { OrderRoutes } from "./src/Routes/Order.routes.js";
import multer from "multer";
import cors from 'cors'

const app=express();
ConnectDB();
app.use(cors())
app.use(bodyParser.json());
// const port=process.env.PORT_NO ||5000
// dotenv.config({path:"/.env"})

app.use("/uploads",express.static("uploads"));

 app.use("/api",CustomerRoutes);
 app.use("/api",DishRoutes);
 app.use("/api",OrderRoutes);

app.listen(8080,()=>{
    console.log("Server started at 8080");
})
