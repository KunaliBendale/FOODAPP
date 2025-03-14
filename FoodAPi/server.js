import express from "express";
import { ConnectDB } from "./src/DB/ConnectDB.js";
import { CustomerRoutes } from "./src/Routes/Customer.routes.js";
import bodyParser from "body-parser";
import { DishRoutes } from "./src/Routes/Dishes.routes.js";
import { OrderRoutes } from "./src/Routes/Order.routes.js";
import multer from "multer";
import cors from 'cors'
import { reviewRouter } from "./src/Routes/Reviews.routes.js";
import { counterroutes } from "./src/Routes/Dashboard.routes.js";

const app=express();
ConnectDB();

// app.use(cors({
//     origin:'http://localhost:5173',
//     credentials:true

// }))

app.use(cors());
app.use(bodyParser.json());
// const port=process.env.PORT_NO ||5000
// dotenv.config({path:"/.env"})
app.use("/uploads",express.static("uploads"));

 app.use("/api",CustomerRoutes);
 app.use("/api",DishRoutes);
 app.use("/api",OrderRoutes);
app.use("/api",reviewRouter);
app.use("/api",counterroutes)
app.listen(5000,()=>{
    console.log("Server started at 5000");
})
