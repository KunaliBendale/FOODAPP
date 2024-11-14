import { Order } from "../Models/Order.js";
import { CreateOrder, GetOrders, DelOrder, GetOrdersByCustIdStatus ,getOrdersByOrderStatus} from "../Repository/Order_Repo.js";

const AddOrder = async (req, res) => {
    try {
        const AddedOrder = await CreateOrder(req.body);
        res.status(200).json({
            message: "Order Added Successfully",
            data: AddedOrder
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


const GetAllOrders = async (req, res) => {
    try {
        const AllOrders = await GetOrders();
        res.status(200).json({
            message: "Orders Are : ",
            data: AllOrders
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


const OrdersByStatus=async(req,res)=>{
    try {
        const orders=await getOrdersByOrderStatus(req.body.OrderStatus);
        res.status(200).json({
            message: "Orders Are : ",
            data: orders
        })
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}


const DeleteOrder = async (req, res) => {
    try {
        const DeletedOrder = await DelOrder(req.body.OrderId);
        res.status(200).json({
            message: "Order Deleted Successfully..",
            data: DeletedOrder
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const OrderByIdAndStatus = async (req, res) => {
    try {
        const result = await GetOrdersByCustIdStatus(req.body)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


const UpdateOrderStatus = async (req, res) => {
    try {
        const result =  await Order.findOneAndUpdate(
            {
                _id: req.body.orderid
            },
            {
                OrderStatus: req.body.OrderStatus
            },{
                new:true
            })
            .populate("items.dishid")
        res.status(200).json({
            data: result
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


export { AddOrder, GetAllOrders, DeleteOrder, OrderByIdAndStatus,UpdateOrderStatus ,OrdersByStatus}