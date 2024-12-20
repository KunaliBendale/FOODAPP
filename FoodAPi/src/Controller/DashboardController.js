import { Dish } from "../Models/Dishes.js";
import { Customer } from "../Models/Customer.js"

import { Order } from "../Models/Order.js";

const CounterCollecion = async (req, res) => {
    try {
        const DishCounter= await Dish.countDocuments();
        const CustomerCounter = await Customer.countDocuments();
        const OrderCounter = await Order.countDocuments();

        const counter ={
            CustomerCounter,
            OrderCounter,
            DishCounter
        }

        res.status(200).json({data:counter})
    } catch (error) {
        res.status(500).json({error:error.message})
    }

}

export  {CounterCollecion}